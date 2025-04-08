/* Amplify Params - DO NOT EDIT
	API_AWSNANITELINK_BOARDTABLE_ARN
	API_AWSNANITELINK_BOARDTABLE_NAME
	API_AWSNANITELINK_CATEGORYTABLE_ARN
	API_AWSNANITELINK_CATEGORYTABLE_NAME
	API_AWSNANITELINK_COMMENTTABLE_ARN
	API_AWSNANITELINK_COMMENTTABLE_NAME
	API_AWSNANITELINK_GRAPHQLAPIENDPOINTOUTPUT
	API_AWSNANITELINK_GRAPHQLAPIIDOUTPUT
	API_AWSNANITELINK_GRAPHQLAPIKEYOUTPUT
	API_AWSNANITELINK_MEDIATABLE_ARN
	API_AWSNANITELINK_MEDIATABLE_NAME
	API_AWSNANITELINK_POSTTABLE_ARN
	API_AWSNANITELINK_POSTTABLE_NAME
	API_AWSNANITELINK_TAGTABLE_ARN
	API_AWSNANITELINK_TAGTABLE_NAME
	AUTH_AWSNANITELINKD053666D_USERPOOLID
	ENV
	FUNCTION_NLMEMBER_NAME
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const docClient = new AWS.DynamoDB.DocumentClient();
const BOARD_TABLE_NAME = process.env.API_AWSNANITELINK_BOARDTABLE_NAME;
const POST_TABLE_NAME = process.env.API_AWSNANITELINK_POSTTABLE_NAME;
const { headers } = require('./headers');
const { create } = require('domain');

const createPostQuery = /* graphql */ `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      module
      moduleId
      title
      content
      authorId
      status
      postIndex
      postIndexString
      views
    }
  }
`;

const createBoardPost = async (event) => {
  const id = event.pathParameters.boardId;
  const authorId = event.requestContext?.authorizer?.claims?.sub;
  const raw = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = typeof raw === 'string' ? JSON.parse(raw) : raw;
  const { title, content } = body;

  if (!authorId) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized: Missing Cognito user identity.' }),
    };
  }

  try {
    // 1. Get Board using DynamoDB
    const boardData = await docClient.get({
      TableName: BOARD_TABLE_NAME,
      Key: { id },
      ProjectionExpression: 'id, lastPostIndex',
    }).promise();
    console.log('Board Data:', boardData);

    if (!boardData.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Board not found' }),
      };
    }

    const lastPostIndex = boardData.Item.lastPostIndex || 0;
    const postIndex = lastPostIndex + 1;
    const postIndexString = postIndex.toString().padStart(10, '0');

    // 2. Create Post using DynamoDB
    const postItem = {
      id: uuidv4(),
      module: 'board',
      moduleId: id,
      title,
      content,
      authorId,
      status: 'PUBLISHED',
      postIndex,
      postIndexString,
      'moduleId#postIndexString': `${id}#${postIndexString}`,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __typename: 'Post',
    };
    console.log('Input:', postItem);

    await docClient.put({
      TableName: POST_TABLE_NAME,
      Item: postItem,
    }).promise();

    console.log('Post created in DynamoDB:', postItem);

    // 3. Count Posts using DynamoDB
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
          ':moduleIdPrefix': `${id}#`,
        },
        Select: 'COUNT',
        ExclusiveStartKey,
      }).promise();
      console.log('Count Result:', countResult);
    
      totalCount += countResult.Count || 0;
      ExclusiveStartKey = countResult.LastEvaluatedKey;
    } while (ExclusiveStartKey);

    // 4. Update Board using DynamoDB
    const boardUpdateResult = await docClient.update({
      TableName: BOARD_TABLE_NAME,
      Key: { id },
      UpdateExpression: 'SET lastPostIndex = :last, totalPosts = :count',
      ExpressionAttributeValues: {
        ':last': postIndex,
        ':count': totalCount,
      },
    }).promise();
    console.log('Board Updated', boardUpdateResult);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Post created and board updated.',
        post: postItem,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Unknown error' }),
    };
  }
}

module.exports = {
  createBoardPost,
};