const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const ROWS_PER_PAGE = 10;

const POSTS_TABLE = process.env.API_AWSNANITELINK_POSTTABLE_NAME; // e.g. Post-table
const CACHE_TABLE = process.env.API_AWSNANITELINK_BOARDCACHETABLE_NAME; // e.g. PaginationCache-table

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  const updates = {};
  const hasChanged = {};

  for (const record of event.Records) {
    const type = record.eventName;
    const boardId = record.dynamodb.NewImage.postBoardId.S;
    if (boardId && (type === 'INSERT' || type === 'REMOVE')) {
      await updateCache(boardId);
    }
  }

  return { status: 'OK' };
};

async function updateCache(boardId) {
  // Step 1: Initialize totalCount
  let totalCount = 0;
  const cacheKey = { id: boardId };

  // Step 2: Recalculate page tokens
  const pageTokens = [];
  let lastEvaluatedKey = null;
  let page = 1;

  do {
    const queryParams = {
      TableName: POSTS_TABLE,
      IndexName: 'byBoard',
      KeyConditionExpression: 'postBoardId = :b',
      ExpressionAttributeValues: { ':b': boardId },
      Limit: ROWS_PER_PAGE,
      ExclusiveStartKey: lastEvaluatedKey,
      ScanIndexForward: false
    };

    console.log('Query params:', JSON.stringify(queryParams, null, 2));
    const res = await docClient.query(queryParams).promise();
    console.log('Query result:', JSON.stringify(res, null, 2));
    totalCount += res.Items.length;

    if (page > 1 && lastEvaluatedKey && res.Items.length > 0) {
      pageTokens.push({
        page: String(page),
        token: lastEvaluatedKey
      });
    }

    lastEvaluatedKey = res.LastEvaluatedKey;
    page++;
  } while (lastEvaluatedKey);

  // Step 3: Update the pageMap
  const updatePageMap = {
    TableName: CACHE_TABLE,
    Key: cacheKey,
    UpdateExpression: 'SET totalPosts = :count, pageTokens = :map',
    ExpressionAttributeValues: {
      ':count': totalCount,
      ':map': pageTokens
    }
  };
  
  // Step 4: Update the cache
  console.log('Updating page map:', JSON.stringify(updatePageMap, null, 2));
  await docClient.update(updatePageMap).promise();
}