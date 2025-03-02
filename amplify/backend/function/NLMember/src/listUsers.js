const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const { headers } = require('./headers');
const { extractUserAttributes } = require('./getUserAttributes');

async function listAllMembers(userPoolId, queryParams) {
  try {
    const {
      userName,
      nickName,
      email,
      signUpDate,
      signUpDateMore,
      signUpDateLess,
      lastSignInDate,
      lastSignInDateMore,
      lastSignInDateLess,
      birthday,
      activeState,
      userGroup,
      paginationToken
    } = queryParams || {};

    let params = {
      UserPoolId: userPoolId,
      Limit: 10,
      PaginationToken: paginationToken || undefined
    };

    // Apply filters
    const filters = [];
    if (userName) filters.push(`username ^= "${userName}"`);
    if (nickName) filters.push(`nickname ^= "${nickName}"`);
    if (email) filters.push(`email ^= "${email}"`);
    if (birthday) filters.push(`birthdate ^= "${birthday}"`);
    if (activeState) filters.push(`status ^= "${activeState}"`); // "Enabled" or "Disabled"
    if (signUpDate) filters.push(`created_at = "${signUpDate}"`);
    if (signUpDateMore) filters.push(`created_at > "${signUpDateMore}"`);
    if (signUpDateLess) filters.push(`created_at < "${signUpDateLess}"`);
    if (lastSignInDate) filters.push(`last_modified = "${lastSignInDate}"`);
    if (lastSignInDateMore) filters.push(`last_modified > "${lastSignInDateMore}"`);
    if (lastSignInDateLess) filters.push(`last_modified < "${lastSignInDateLess}"`);

    if (filters.length) params.Filter = filters.join(" and ");

    const result = await cognito.listUsers(params).promise();

    const users = await Promise.all(
      result.Users.map(async (user) => await extractUserAttributes(userPoolId, user))
    );

    if (userGroup) {
      users.filter(user => user.userGroups.includes(userGroup));
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ users, paginationToken: result.PaginationToken || null })
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
}

module.exports = { listAllMembers };