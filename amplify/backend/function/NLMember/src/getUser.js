const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const { headers } = require('./headers');
const { extractUserAttributes } = require('./getUserAttributes');
const { getUsernameBySub } = require('./getUsernameBySub');

async function getUserBySubId(userPoolId, userId) {
  try {
    let Username;
    try {
      Username = await getUsernameBySub(userPoolId, userId);
    } catch (error) {
      console.error(`Error fetching username for userId ${userId}:`, error);
      return { statusCode: 404, headers, body: JSON.stringify({ error: `User with user ID ${userId} not found` }) };
    }

    // Fetch user by Username
    const user = await cognito.adminGetUser({
      UserPoolId: userPoolId,
      Username: Username
    }).promise();

    // Extract user attributes from the first matched user
    const userWithAttributes = await extractUserAttributes(userPoolId, user);

    return { statusCode: 200, headers, body: JSON.stringify(userWithAttributes) };
  } catch (error) {
    console.error("Error fetching user by sub ID:", error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
}

module.exports = { getUserBySubId };