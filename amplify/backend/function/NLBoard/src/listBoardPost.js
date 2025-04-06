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
const lambda = new AWS.Lambda();
const { headers } = require('./headers');
const BOARD_TABLE = process.env.API_AWSNANITELINK_BOARDTABLE_NAME;
const POSTS_TABLE = process.env.API_AWSNANITELINK_POSTTABLE_NAME;
const USERPOOLID = process.env.AUTH_AWSNANITELINKD053666D_USERPOOLID;

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

async function listBoardPost(boardId, targetPage, rowsPerPage) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  try {
    let lastEvaluatedKey = null;
    let result;

    for (let currentPage = 1; currentPage <= targetPage; currentPage++) {
      const params = {
        TableName: POSTS_TABLE,
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
    }));

    const boardData = await docClient.get({
      TableName: BOARD_TABLE,
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