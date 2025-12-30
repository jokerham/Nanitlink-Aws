/* Amplify Params - DO NOT EDIT
	AUTH_NANITLINKAWSD5EDFAB0_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { headers } = require('./headers');
const { getUserBySubId } = require('./getUser');
const { listAllMembers } = require('./listUsers');
const { updateUser } = require('./updateUser');
const { deleteUser } = require('./deleteUser');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    const pathParameters = event.pathParameters || {};
    const userId = pathParameters.proxy;
    const httpMethod = event.httpMethod;
    const userPoolId = process.env.AUTH_NANITLINKAWSD5EDFAB0_USERPOOLID; //event.queryStringParameters?.userPoolId || null;

    if (!userPoolId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing userPoolId in query parameters" })
      };
    }

    switch (httpMethod) {
      case 'GET':
        if (userId) {
          return await getUserBySubId(userPoolId, userId);
        } else {
          return await listAllMembers(userPoolId, event.queryStringParameters);
        }
      case 'PUT':
        return await updateUser(userPoolId, userId, event);
      case 'DELETE':
        return await deleteUser(userPoolId, userId, event);
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
};
