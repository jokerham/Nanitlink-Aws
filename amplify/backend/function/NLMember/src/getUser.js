const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const { headers } = require('./headers');
const { extractUserAttributes } = require('./getUserAttributes');

async function getUserByUserName(userPoolId, userName) {
  try {
    const userRes = await cognito.adminGetUser({ UserPoolId: userPoolId, Username: userName }).promise();
    const userWithAttibutes = await extractUserAttributes(userPoolId, userRes);
    return { statusCode: 200, headers, body: JSON.stringify(userWithAttibutes) };
  } catch (error) {
    console.log(error);
    return { statusCode: 404, headers, body: JSON.stringify({ error: `User ${userName} not found` }) };
  }
}

module.exports = { getUserByUserName };