const AWS = require('aws-sdk');
const { headers } = require('./headers');

const cognito = new AWS.CognitoIdentityServiceProvider();

exports.listGroups = async (userPoolId) => {
  try {
    let params = {
      UserPoolId: userPoolId,
      Limit: 60, // Cognito's max limit per request
    };

    let allGroups = [];
    let response;

    do {
      response = await cognito.listGroups(params).promise();
      allGroups = allGroups.concat(response.Groups);
      params.NextToken = response.NextToken;
    } while (response.NextToken);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ groups: allGroups }),
    };
  } catch (error) {
    console.error("Error listing groups:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};