const AWS = require('aws-sdk');
const { headers } = require('./headers');

const cognito = new AWS.CognitoIdentityServiceProvider();

exports.deleteGroup = async (userPoolId, groupName, event) => {
  try {
    if (!groupName) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Group name is required" })
      };
    }

    const params = {
      GroupName: groupName,
      UserPoolId: userPoolId
    };

    await cognito.deleteGroup(params).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: `Group '${groupName}' deleted successfully` })
    };
  } catch (error) {
    console.error("Error deleting group:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};