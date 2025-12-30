/* Amplify Params - DO NOT EDIT
	AUTH_NANITLINKAWSD5EDFAB0_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { listGroups } = require('./listGroups');
const { createGroup } = require('./createGroup');
const { deleteGroup } = require('./deleteGroup');
const { headers } = require('./headers');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  
  try {
    const pathParameters = event.pathParameters || {};
    const group = decodeURIComponent(pathParameters.proxy);
    const httpMethod = event.httpMethod;
    const userPoolId = process.env.AUTH_NANITLINKAWSD5EDFAB0_USERPOOLID;

    if (!userPoolId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing userPoolId in query parameters" })
      };
    }

    switch (httpMethod) {
      case 'GET':
        return await listGroups(userPoolId, event.queryStringParameters);
      case 'POST':
        return await createGroup(userPoolId, group, event);
      case 'DELETE':
        return await deleteGroup(userPoolId, group, event);
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
}
