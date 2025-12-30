/* Amplify Params - DO NOT EDIT
	API_NANITLINKAWS_GRAPHQLAPIIDOUTPUT
	API_NANITLINKAWS_POSTTABLE_ARN
	API_NANITLINKAWS_POSTTABLE_NAME
	AUTH_NANITLINKAWSD5EDFAB0_USERPOOLID
	ENV
	FUNCTION_CACHERESTAPI_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const { headers } = require('./headers');
const lambda = new AWS.Lambda();
const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    const raw = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const body = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const { postId, userId } = body;

    if (!postId || !userId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'postId and userId are required' }),
      };
    }

    const keyObj = { postId, userId };
    const key = Buffer.from(JSON.stringify(keyObj)).toString('base64');
    console.log(key);

    // Check cache
    const getCacheResponse = await lambda.invoke({
      FunctionName: process.env.FUNCTION_CACHERESTAPI_NAME,
      Payload: JSON.stringify({
        operation: 'getCache',
        key,
      }),
    }).promise();

    const cacheResult = JSON.parse(getCacheResponse.Payload);
    console.log('Cache result:', cacheResult);

    if (cacheResult?.statusCode === 200) {
      // Cache exists
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'View already counted.' }),
      };
    }

    // Increment view count
    await docClient.update({
      TableName: process.env.API_NANITLINKAWS_POSTTABLE_NAME,
      Key: { id: postId },
      UpdateExpression: 'SET #views = if_not_exists(#views, :zero) + :incr',
      ExpressionAttributeNames: {
        '#views': 'views',
      },
      ExpressionAttributeValues: {
        ':incr': 1,
        ':zero': 0,
      },
    }).promise();
    console.log('View incremented');

    // Save cache
    await lambda.invoke({
      FunctionName: process.env.FUNCTION_CACHERESTAPI_NAME,
      Payload: JSON.stringify({
        operation: 'saveCache',
        key,
        value: '1',
      }),
    }).promise();
    console.log('Cache saved');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'View incremented.' }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error', error: error.message }),
    };
  }
};
