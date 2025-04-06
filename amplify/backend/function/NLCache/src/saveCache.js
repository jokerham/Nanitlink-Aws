const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const ttlCacheTableName = `${process.env.STORAGE_CUSTOMDATABASE_NAME}`;
// TTL duration in seconds
const TTL_DURATION = 60 * 60 * 24; // 1 day

// Save Cache
const saveCache = async (key, value) => {
  const ttl = Math.floor(Date.now() / 1000) + TTL_DURATION;

  const params = {
    TableName: ttlCacheTableName,
    Item: {
      cacheKey: key,
      value: value,
      ttl: ttl, // Time-to-live for the cache
    },
  };

  await docClient.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Cache saved successfully', key, value }),
  };
};

module.exports = {
  saveCache
}; 