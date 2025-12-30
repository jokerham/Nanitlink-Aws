const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const BOARD_TABLE_NAME = process.env.API_NANITLINKAWS_BOARDTABLE_NAME;
const POST_TABLE_NAME = process.env.API_NANITLINKAWS_POSTTABLE_NAME;
const { headers } = require('./headers');

const deleteBoardPost = async (event) => {
  const boardId = event.pathParameters.boardId;
  const postId = event.queryStringParameters.postId;
  const userId = event.requestContext?.authorizer?.claims?.sub;
  const groups = event.requestContext?.authorizer?.claims['cognito:groups'] || [];

  if (!userId) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized: Missing user identity.' }),
    };
  }

  // 0. Fetch the post to check ownership
  const postResult = await docClient.get({
    TableName: POST_TABLE_NAME,
    Key: { id: postId },
  }).promise();

  const postItem = postResult.Item;
  if (!postItem) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Post not found.' }),
    };
  }

  const isAuthor = postItem.authorId === userId;
  const isAdmin = Array.isArray(groups) ? groups.includes('Admin') : groups === 'Admin';

  if (!isAuthor && !isAdmin) {
    return {
      statusCode: 403,
      headers,
      body: JSON.stringify({ error: 'Forbidden: You are not allowed to delete this post.' }),
    };
  }

  try {
    // 1. Delete post
    await docClient.delete({
      TableName: POST_TABLE_NAME,
      Key: { id: postId },
    }).promise();
    console.log(`Deleted post ${postId}`);

    // 2. Re-count total posts
    let totalCount = 0;
    let ExclusiveStartKey = undefined;

    do {
      const countResult = await docClient.query({
        TableName: POST_TABLE_NAME,
        IndexName: 'byModule',
        KeyConditionExpression: '#module = :module AND begins_with(#moduleIdPostIndexString, :moduleIdPrefix)',
        ExpressionAttributeNames: {
          '#module': 'module',
          '#moduleIdPostIndexString': 'moduleId#postIndexString',
        },
        ExpressionAttributeValues: {
          ':module': 'board',
          ':moduleIdPrefix': `${boardId}#`,
        },
        Select: 'COUNT',
        ExclusiveStartKey,
      }).promise();

      totalCount += countResult.Count || 0;
      ExclusiveStartKey = countResult.LastEvaluatedKey;
    } while (ExclusiveStartKey);

    // 3. Update board post count
    await docClient.update({
      TableName: BOARD_TABLE_NAME,
      Key: { id: boardId },
      UpdateExpression: 'SET totalPosts = :count',
      ExpressionAttributeValues: {
        ':count': totalCount,
      },
    }).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: `Post ${postId} deleted and board updated.` }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Unknown error' }),
    };
  }
};

module.exports = {
  deleteBoardPost,
};
