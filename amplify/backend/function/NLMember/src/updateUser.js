const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const { headers } = require('./headers');

async function updateUser(userPoolId, userName, event) {
  const body = JSON.parse(event.body || "{}");
  const authUser = event.requestContext.authorizer.claims["cognito:username"];
  const userGroups = event.requestContext.authorizer.claims["cognito:groups"] || "";

  if (authUser !== userName && !userGroups.includes("ADMIN")) {
    return { statusCode: 403, headers, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  const attributes = Object.keys(body).map(key => ({ Name: key, Value: body[key] }));

  try {
    await cognito.adminUpdateUserAttributes({
      UserPoolId: userPoolId,
      Username: userName,
      UserAttributes: attributes
    }).promise();

    return { statusCode: 200, headers, body: JSON.stringify({ message: "User updated successfully" }) };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
}

module.exports = { updateUser };