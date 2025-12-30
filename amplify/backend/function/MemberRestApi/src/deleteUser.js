const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const { headers } = require('./headers');
const { getUsernameBySub } = require('./getUsernameBySub');

async function deleteUser(userPoolId, userId, event) {
  const authUserSub = event.requestContext.authorizer.claims.sub;
  const userGroups = event.requestContext.authorizer.claims["cognito:groups"] || "";

  // Authorization: Ensure the requester is either the user themselves or an admin
  if (authUserSub !== userId && !userGroups.includes("ADMIN")) {
    return { statusCode: 403, headers, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  try {
    let Username;
    try {
      Username = await getUsernameBySub(userPoolId, userId);
    } catch (error) {
      console.error(`Error fetching username for userId ${userId}:`, error);
      return { statusCode: 404, headers, body: JSON.stringify({ error: `User with user ID ${userId} not found` }) };
    }

    const userName = Username; // Extract username from Cognito response

    // Proceed with deleting the user using their actual Cognito username
    await cognito.adminDeleteUser({ UserPoolId: userPoolId, Username: userName }).promise();

    return { statusCode: 200, headers, body: JSON.stringify({ message: "User deleted successfully" }) };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
}

module.exports = { deleteUser };