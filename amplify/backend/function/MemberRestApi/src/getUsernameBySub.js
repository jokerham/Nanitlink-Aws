const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

const cache = new Map(); // In-memory cache for quick lookups

async function getUsernameBySub(userPoolId, sub) {
  if (cache.has(sub)) {
    return cache.get(sub);
  }

  const userRes = await cognito.listUsers({
    UserPoolId: userPoolId,
    Filter: `sub = "${sub}"`
  }).promise();

  if (!userRes.Users || userRes.Users.length === 0) {
    throw new Error(`User with sub ID ${sub} not found`);
  }

  const Username = userRes.Users[0].Username;
  cache.set(sub, Username); // Store for future use
  return Username;
}

module.exports = { getUsernameBySub };