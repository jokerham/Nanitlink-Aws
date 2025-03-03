const AWS = require('aws-sdk');
const { headers } = require('./headers');

const cognito = new AWS.CognitoIdentityServiceProvider();

exports.updateGroup = async (userPoolId, groupName, event) => {
  try {
    if (!groupName) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Group name is required" })
      };
    }

    const requestBody = JSON.parse(event.body);

    const params = {
      GroupName: groupName,
      UserPoolId: userPoolId,
      Description: requestBody.description || undefined,
      Precedence: requestBody.precedence || undefined,
      RoleArn: requestBody.roleArn || undefined
    };

    const response = await cognito.updateGroup(params).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error("Error updating group:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};