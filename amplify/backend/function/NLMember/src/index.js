/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	USER_POOL_ID
Amplify Params - DO NOT EDIT */

const { listAllMembers } = require('./listUsers');
const { getUserByUserName } = require('./getUser');
const { updateUser } = require('./updateUser');
const { deleteUser } = require('./deleteUser');
const { headers } = require('./headers');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  
  try {
    const pathParameters = event.pathParameters || {};
    const userName = pathParameters.proxy;
    const httpMethod = event.httpMethod;
    const userPoolId = event.queryStringParameters?.userPoolId || null;

    if (!userPoolId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing userPoolId in query parameters" })
      };
    }

    switch (httpMethod) {
      case 'GET':
        if (userName) {
          return await getUserByUserName(userPoolId, userName);
        } else {
          return await listAllMembers(userPoolId, event.queryStringParameters);
        }
      case 'PUT':
        return await updateUser(userPoolId, userName, event);
      case 'DELETE':
        return await deleteUser(userPoolId, userName, event);
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

// const AWS = require('aws-sdk');

// const cognito = new AWS.CognitoIdentityServiceProvider();
// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "*",
//   "Access-Control-Allow-Methods": "*"
// };

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = async (event) => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);
  
//   try {
//     const userPoolId = process.env.USER_POOL_ID;
//     if (!userPoolId) {
//       throw new Error("USER_POOL_ID is missing in environment variables");
//     }

//     const pathParameters = event.pathParameters || {};
//     const userName = pathParameters.proxy;

//     if (userName) {
//       return await getUserByUserName(userPoolId, userName);
//     } else {
//       return await listAllUsers(userPoolId, event.queryStringParameters);
//     }

//   } catch (error) {
//     return {
//       statusCode: 500,
//       headers,
//       body: JSON.stringify({ error: error.message })
//     };
//   }
// };

// /**
//  * Extracts user attributes and fetches user groups
//  */
// async function extractUserAttributes(userPoolId, user) {
//   const attributes = {};

//   (user.Attributes || user.UserAttributes || []).forEach(attr => {
//     attributes[attr.Name.startsWith("custom:") ? attr.Name.substring(7) : attr.Name] = attr.Value;
//   });

//   // Fetch user groups
//   let userGroups = [];
//   try {
//     const groupRes = await cognito.adminListGroupsForUser({
//       Username: user.Username,
//       UserPoolId: userPoolId
//     }).promise();
//     userGroups = groupRes.Groups?.map(group => group.GroupName) || [];
//   } catch (error) {
//     console.warn(`Could not fetch groups for ${user.Username}: ${error.message}`);
//   }

//   // try {
//   //   // TODO: Need to switch to Plus service which requires additonal cost. Consider it before using it
//   //   // Reference : https://aws.amazon.com/ko/cognito/pricing/
//   //   const authEvents = await cognito
//   //     .adminListUserAuthEvents({
//   //       UserPoolId: userPoolId,
//   //       Username: user.Username,
//   //       MaxResults: 20
//   //     })
//   //     .promise();

//   //   console.log(authEvents);

//   //   if (authEvents.AuthEvents && authEvents.AuthEvents.length > 0) {
//   //     lastSignInDate = authEvents.AuthEvents
//   //       .filter((event => event.EventType === 'SignIn'))
//   //       .sort((a, b) => new Date(b.CreationDate) - new Date(a.CreationDate))?.[0]?.CreationDate || null;
//   //   }
//   // } catch (error) {
//   //   console.warn(`Could not fetch last sign-in for ${user.Username}: ${error.message}`);
//   // }

//   return {
//     id: attributes.sub || null,
//     name: attributes.name || null,
//     userName: user.Username,
//     email: attributes.email || null,
//     nickName: attributes.nickname || null,
//     birthday: attributes.birthdate || null,
//     mailing: attributes.mailing || null,
//     messaging: attributes.messaging || null,
//     signUpDate: user.UserCreateDate || null,
//     activeState: user.Enabled ? "Enabled" : "Disabled",
//     lastSignInDate: null,
//     userGroups
//   };
// }

// /**
//  * Fetch details of a single user
//  */
// async function getUserByUserName(userPoolId, userName) {
//   try {
//     const userRes = await cognito.adminGetUser({
//       UserPoolId: userPoolId,
//       Username: userName
//     }).promise();

//     const userAttributes = await extractUserAttributes(userPoolId, userRes);

//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify(userAttributes)
//     };

//   } catch (error) {
//     return {
//       statusCode: 404,
//       headers,
//       body: JSON.stringify({ error: `User ${userName} not found` })
//     };
//   }
// }

// /**
//  * List all users with optional filters
//  */
// async function listAllUsers(userPoolId, queryParams) {
//   try {
//     const {
//       userName,
//       nickName,
//       email,
//       signUpDate,
//       signUpDateMore,
//       signUpDateLess,
//       lastSignInDate,
//       lastSignInDateMore,
//       lastSignInDateLess,
//       birthday,
//       activeState,
//       userGroup,
//       paginationToken
//     } = queryParams || {};

//     let params = {
//       UserPoolId: userPoolId,
//       Limit: 10,
//       PaginationToken: paginationToken || undefined
//     };

//     // Apply filters
//     const filters = [];
//     if (userName) filters.push(`username ^= "${userName}"`);
//     if (nickName) filters.push(`nickname ^= "${nickName}"`);
//     if (email) filters.push(`email ^= "${email}"`);
//     if (birthday) filters.push(`birthdate ^= "${birthday}"`);
//     if (activeState) filters.push(`status ^= "${activeState}"`); // "Enabled" or "Disabled"
//     if (signUpDate) filters.push(`created_at = "${signUpDate}"`);
//     if (signUpDateMore) filters.push(`created_at > "${signUpDateMore}"`);
//     if (signUpDateLess) filters.push(`created_at < "${signUpDateLess}"`);
//     if (lastSignInDate) filters.push(`last_modified = "${lastSignInDate}"`);
//     if (lastSignInDateMore) filters.push(`last_modified > "${lastSignInDateMore}"`);
//     if (lastSignInDateLess) filters.push(`last_modified < "${lastSignInDateLess}"`);

//     if (filters.length) params.Filter = filters.join(" and ");

//     // Fetch users
//     const result = await cognito.listUsers(params).promise();

//     const users = await Promise.all(
//       result.Users.map(async (user) => await extractUserAttributes(userPoolId, user))
//     );

//     if (userGroup) {
//       users.filter(user => user.userGroups.includes(userGroup));
//     }

//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify({
//         users,
//         paginationToken: result.PaginationToken || null
//       })
//     };

//   } catch (error) {
//     return {
//       statusCode: 500,
//       headers,
//       body: JSON.stringify({ error: error.message })
//     };
//   }
// }
