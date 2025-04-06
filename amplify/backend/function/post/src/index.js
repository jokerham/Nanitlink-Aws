const AWS = require('aws-sdk');
const { updateCache } = require('./updateCache');

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  const updates = {};
  const hasChanged = {};

  for (const record of event.Records) {
    const type = record.eventName;
    if (type === 'INSERT' || type === 'REMOVE') {
      const boardId = type === "REMOVE" 
        ? record.dynamodb.OldImage.moduleId.S
        : record.dynamodb.NewImage.moduleId.S;
      await updateCache(boardId);
    }
  }

  return { status: 'OK' };
};

// async function updateCache(boardId) {
//   // Step 1: Initialize totalCount
//   let totalCount = 0;
//   let key = { id: boardId };

//   // Step 2: Recalculate page tokens
//   const pageTokens = [];
//   let lastEvaluatedKey = null;
//   let page = 1;

//   do {
//     const queryParams = {
//       TableName: POSTS_TABLE,
//       IndexName: 'byModule',
//       KeyConditionExpression: '#module = :m and begins_with(#moduleId, :b)',
//       ExpressionAttributeNames: { '#module': 'module', '#moduleId': 'moduleId#postIndex' },
//       ExpressionAttributeValues: { ':m': 'board', ':b': boardId },
//       Limit: ROWS_PER_PAGE,
//       ExclusiveStartKey: lastEvaluatedKey,
//       ScanIndexForward: false
//     };

//     console.log('Query params:', JSON.stringify(queryParams, null, 2));
//     const res = await docClient.query(queryParams).promise();
//     console.log('Query result:', JSON.stringify(res, null, 2));
//     totalCount += res.Items.length;

//     if (page > 1 && lastEvaluatedKey && res.Items.length > 0) {
//       pageTokens.push({
//         page: String(page),
//         token: Buffer.from(
//           JSON.stringify({ version: 3, token: lastEvaluatedKey })
//         ).toString('base64')
//       });
//     }

//     lastEvaluatedKey = res.LastEvaluatedKey;
//     page++;
//   } while (lastEvaluatedKey);

//   // Step 3: Update the pageMap
//   const updatePageMap = {
//     TableName: BOARD_TABLE,
//     Key: key,
//     UpdateExpression: 'SET totalPosts = :count, pageTokens = :map',
//     ExpressionAttributeValues: {
//       ':count': totalCount,
//       ':map': pageTokens
//     }
//   };
  
//   // Step 4: Update the cache
//   console.log('Updating page map:', JSON.stringify(updatePageMap, null, 2));
//   await docClient.update(updatePageMap).promise();
// }