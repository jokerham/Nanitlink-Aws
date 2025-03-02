const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const { headers } = require('./headers');

async function deleteUser(userPoolId, userName, event) {
  const authUser = event.requestContext.authorizer.claims["cognito:username"];
  const userGroups = event.requestContext.authorizer.claims["cognito:groups"] || "";

  if (authUser !== userName && !userGroups.includes("ADMIN")) {
    return { statusCode: 403, headers, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  try {
    await cognito.adminDeleteUser({ UserPoolId: userPoolId, Username: userName }).promise();
    return { statusCode: 200, headers, body: JSON.stringify({ message: "User deleted successfully" }) };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
}

module.exports = { deleteUser };