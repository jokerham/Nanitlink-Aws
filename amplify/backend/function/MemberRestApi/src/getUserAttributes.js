const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

/**
 * Extracts user attributes and fetches user groups
 */
async function extractUserAttributes(userPoolId, user) {
  const attributes = {};

  (user.Attributes || user.UserAttributes || []).forEach(attr => {
    attributes[attr.Name.startsWith("custom:") ? attr.Name.substring(7) : attr.Name] = attr.Value;
  });

  // Fetch user groups
  let userGroups = [];
  try {
    const groupRes = await cognito.adminListGroupsForUser({
      Username: user.Username,
      UserPoolId: userPoolId
    }).promise();
    userGroups = groupRes.Groups?.map(group => group.GroupName) || [];
  } catch (error) {
    console.warn(`Could not fetch groups for ${user.Username}: ${error.message}`);
  }

  // try {
  //   // TODO: Need to switch to Plus service which requires additonal cost. Consider it before using it
  //   // Reference : https://aws.amazon.com/ko/cognito/pricing/
  //   const authEvents = await cognito
  //     .adminListUserAuthEvents({
  //       UserPoolId: userPoolId,
  //       Username: user.Username,
  //       MaxResults: 20
  //     })
  //     .promise();

  //   console.log(authEvents);

  //   if (authEvents.AuthEvents && authEvents.AuthEvents.length > 0) {
  //     lastSignInDate = authEvents.AuthEvents
  //       .filter((event => event.EventType === 'SignIn'))
  //       .sort((a, b) => new Date(b.CreationDate) - new Date(a.CreationDate))?.[0]?.CreationDate || null;
  //   }
  // } catch (error) {
  //   console.warn(`Could not fetch last sign-in for ${user.Username}: ${error.message}`);
  // }

  return {
    id: attributes.sub || null,
    name: attributes.name || null,
    userName: user.Username,
    email: attributes.email || null,
    nickName: attributes.nickname || null,
    birthday: attributes.birthdate || null,
    mailing: attributes.mailing || null,
    messaging: attributes.messaging || null,
    signUpDate: user.UserCreateDate || null,
    activeState: user.Enabled ? "Enabled" : "Disabled",
    lastSignInDate: null,
    userGroups
  };
}

module.exports = { extractUserAttributes };
// Reference : https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ListUsers.html