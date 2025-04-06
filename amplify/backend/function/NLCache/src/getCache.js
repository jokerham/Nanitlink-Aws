const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const ttlCacheTableName = `${process.env.STORAGE_CUSTOMDATABASE_NAME}`;

// Get Cache
const getCache = async (key) => {
  const params = {
    TableName: ttlCacheTableName,
    Key: {
      cacheKey: key,
    },
  };

  const result = await docClient.get(params).promise();

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Cache not found' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Cache retrieved successfully', value: result.Item.value }),
  };
};

module.exports = {
  getCache,
}; 