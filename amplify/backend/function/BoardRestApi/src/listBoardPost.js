const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const { headers } = require('./headers');
const BOARD_TABLE_NAME = process.env.API_NANITLINKAWS_BOARDTABLE_NAME;
const POST_TABLE_NAME = process.env.API_NANITLINKAWS_POSTTABLE_NAME;
const COMMENT_TABLE_NAME = process.env.API_NANITLINKAWS_COMMENTTABLE_NAME;
const USERPOOLID = process.env.AUTH_NANITLINKAWS_USERPOOLID;

const authorCache = new Map();
const authorPromiseCache = new Map();

async function getAuthor(subId) {
  // Return cached result if available
  if (authorCache.has(subId)) {
    return authorCache.get(subId);
  }

  // If a request is in-flight, wait for it
  if (authorPromiseCache.has(subId)) {
    return authorPromiseCache.get(subId);
  }

  // Otherwise, make a new request
  const payload = {
    pathParameters: {
      proxy: subId
    },
    httpMethod: 'GET',
    queryStringParameters: {
      userPoolId: USERPOOLID
    }
  };

  const params = {
    FunctionName: process.env.FUNCTION_NLMEMBER_NAME,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(payload)
  };

  const promise = lambda.invoke(params).promise()
    .then(response => {
      const Payload = JSON.parse(response.Payload);
      const authorData = JSON.parse(Payload.body);
      const nickname = authorData?.nickName || null;
      authorCache.set(subId, nickname);
      authorPromiseCache.delete(subId);
      return nickname;
    })
    .catch(err => {
      authorPromiseCache.delete(subId);
      throw err;
    });

  authorPromiseCache.set(subId, promise);
  return promise;
}

async function listBoardPost(boardId, targetPage, rowsPerPage, category) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  try {
    let lastEvaluatedKey = null;
    let result;

    for (let currentPage = 1; currentPage <= targetPage; currentPage++) {
      const params = category ? {
        TableName: POST_TABLE_NAME,
        IndexName: 'byModuleCategory',
        KeyConditionExpression: '#module = :m and begins_with(#compositeKey, :prefix)',
        ExpressionAttributeNames: {
          '#module': 'module',
          '#compositeKey': 'moduleId#categoryIndexString#postIndexString'
        },
        ExpressionAttributeValues: {
          ':m': 'board',
          ':prefix': `${boardId}#${category}#`
        },
        Limit: rowsPerPage,
        ScanIndexForward: false,
        ExclusiveStartKey: lastEvaluatedKey
      } : {
        TableName: POST_TABLE_NAME,
        IndexName: 'byModule',
        KeyConditionExpression: '#module = :m and begins_with(#moduleId, :b)',
        ExpressionAttributeNames: {
          '#module': 'module',
          '#moduleId': 'moduleId#postIndexString'
        },
        ExpressionAttributeValues: {
          ':m': 'board',
          ':b': boardId
        },
        Limit: rowsPerPage,
        ScanIndexForward: false,
        ExclusiveStartKey: lastEvaluatedKey
      };
      console.log('Query Params:', params);
      result = await docClient.query(params).promise();
      lastEvaluatedKey = result.LastEvaluatedKey;

      if (currentPage === targetPage || !lastEvaluatedKey) {
        break;
      }
    }

    await Promise.all(result.Items.map(async (item) => {
      if (item.authorId) {
        try {
          const nickname = await getAuthor(item.authorId);
          item.author = nickname;
        } catch (err) {
          console.warn(`Failed to get author for ${item.authorId}:`, err);
          item.author = 'Guest';
        }
      }

      // Count comments to the post item
      const commentParams = {
        TableName: COMMENT_TABLE_NAME,
        IndexName: 'byPost',
        KeyConditionExpression: 'postId = :postId',
        ExpressionAttributeValues: {
          ':postId': item.id
        },
        Select: 'COUNT'
      };
      console.log('Comment Count Params:', commentParams);
      const commentResult = await docClient.query(commentParams).promise();
      item.commentCount = commentResult.Count;
    }));

    const boardData = await docClient.get({
      TableName: BOARD_TABLE_NAME,
      Key: {
        id: boardId
      }
    }).promise();

    const board = boardData.Item;

    if (!board) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Board not found' })
      };
    }

    board.posts = { items: result.Items };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(board)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
}

module.exports = {
  listBoardPost
};