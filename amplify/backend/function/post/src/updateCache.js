const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const POSTS_TABLE = process.env.API_AWSNANITELINK_POSTTABLE_NAME;
const BOARD_TABLE = process.env.API_AWSNANITELINK_BOARDTABLE_NAME;

async function updateCache(boardId) {
  // Step 1: Initialize totalCount
  let totalCount = 0;
  let key = { id: boardId };

  // Step 2: Scan page
  let lastEvaluatedKey = null;
  let page = 1;

  do {
    const queryParams = {
      TableName: POSTS_TABLE,
      IndexName: 'byModule',
      KeyConditionExpression: '#module = :m and begins_with(#moduleId, :b)',
      ExpressionAttributeNames: { '#module': 'module', '#moduleId': 'moduleId#postIndexString' },
      ExpressionAttributeValues: { ':m': 'board', ':b': boardId },
      ExclusiveStartKey: lastEvaluatedKey,
      ScanIndexForward: false
    };

    console.log('Query params:', JSON.stringify(queryParams, null, 2));
    const res = await docClient.query(queryParams).promise();
    console.log('Query result:', JSON.stringify(res, null, 2));
    totalCount += res.Items.length;

    lastEvaluatedKey = res.LastEvaluatedKey;
    page++;
  } while (lastEvaluatedKey);

  // Step 3: Update totalPosts query
  const updatePageMap = {
    TableName: BOARD_TABLE,
    Key: key,
    UpdateExpression: 'SET totalPosts = :count',
    ExpressionAttributeValues: { ':count': totalCount }
  };
  
  // Step 4: Update the totalPosts
  console.log('Updating page map:', JSON.stringify(updatePageMap, null, 2));
  await docClient.update(updatePageMap).promise();
}

module.exports = { updateCache };
