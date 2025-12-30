/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_CACHESTORAGE_ARN
	STORAGE_CACHESTORAGE_NAME
	STORAGE_CACHESTORAGE_STREAMARN
Amplify Params - DO NOT EDIT */
const { getCache } = require('./getCache');
const { saveCache } = require('./saveCache');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { operation, key, value } = event;

  try {
    if (!operation || !key) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request. Operation and key are required.' }),
      };
    }

    switch (operation) {
    case 'getCache':
      return await getCache(key);
    case 'saveCache':
      if (!value) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Value is required for saveCache operation.' }),
        };
      }
      return await saveCache(key, value);
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid operation.' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: error.message }),
    };
  }
};
