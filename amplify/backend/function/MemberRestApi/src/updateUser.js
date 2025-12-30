const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const { headers } = require('./headers');
const { getUsernameBySub } = require('./getUsernameBySub');

// List of allowed attributes (update with your actual schema)
const allowedAttributes = new Set([
  "address", "birthdate", "email", "family_name", "gender",
  "given_name", "locale", "middle_name", "name", "nickname",
  "phone_number", "picture", "preferred_username", "profile",
  "zoneinfo", "updated_at", "website",
  "custom:mailing", "custom:messaging" // Add only existing custom attributes
]);

async function updateUser(userPoolId, userId, event) {
  const body = JSON.parse(event.body || {});
  const authUserSub = event.requestContext.authorizer.claims.sub;
  const userGroups = event.requestContext.authorizer.claims["cognito:groups"] || "";

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

    // Confirm if password change is necessary
    if (body["password"]) {
      try {
        await cognito.adminSetUserPassword({
          UserPoolId: userPoolId,
          Username: Username,
          Password: body["password"],
          Permanent: true // Set true if this is a permanent password change
        }).promise();
        console.log(`Password updated for user ${Username}`);
      } catch (error) {
        console.error(`Error updating password for user ${Username}:`, error);
        return { 
          statusCode: 500, 
          headers, 
          body: JSON.stringify({ error: "Failed to update password." }) 
        };
      }
    }

    // Filter attributes to send only allowed attributes
    const attributes = Object.entries(body)
      .filter(([key]) => allowedAttributes.has(key)) // Keep only valid attributes
      .map(([key, value]) => ({ Name: key, Value: value }));

    await cognito.adminUpdateUserAttributes({
      UserPoolId: userPoolId,
      Username: Username,
      UserAttributes: attributes
    }).promise();

    // Confirm if group assignment is necessary
    if (body["group"] && Array.isArray(body["group"])) {
      try {
        // Get the user's current groups
        const existingGroupsRes = await cognito.adminListGroupsForUser({
          UserPoolId: userPoolId,
          Username: Username
        }).promise();

        const existingGroups = existingGroupsRes.Groups.map(group => group.GroupName);
        const requestedGroups = body["group"];

        // Remove user from groups they should no longer be in
        for (const group of existingGroups) {
          if (!requestedGroups.includes(group)) {
            await cognito.adminRemoveUserFromGroup({
              UserPoolId: userPoolId,
              Username: Username,
              GroupName: group
            }).promise();
            console.log(`Removed user ${Username} from group ${group}`);
          }
        }

        // Add user to new groups
        for (const group of requestedGroups) {
          if (!existingGroups.includes(group)) {
            await cognito.adminAddUserToGroup({
              UserPoolId: userPoolId,
              Username: Username,
              GroupName: group
            }).promise();
            console.log(`Added user ${Username} to group ${group}`);
          }
        }
      } catch (error) {
        console.error(`Error updating groups for user ${Username}:`, error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: "Failed to update user groups." })
        };
      }

      // Remove groups from body since it's not a user attribute
      delete body["custom:group"];
    }

    return { statusCode: 200, headers, body: JSON.stringify({ message: "User updated successfully" }) };
  } catch (error) {
    console.error("Error updating user:", error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
}

module.exports = { updateUser };