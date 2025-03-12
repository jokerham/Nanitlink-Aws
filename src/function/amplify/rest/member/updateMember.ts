import { put } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import awsConfigure from 'amplifyconfiguration.json';
import { showToast } from 'function/showToast';

// AWS Cognito default attributes
const nonCustomAttributes = new Set([
  "id", "password", "approved", "group", 
  "address", "birthdate", "email", "family_name", "gender",
  "given_name", "locale", "middle_name", "name", "nickname",
  "phone_number", "picture", "preferred_username", "profile",
  "zoneinfo", "updated_at", "website"
]);

// API Function to Update Cognito User
export const updateMember = async (updatedAttributes: Record<string, string>) => {
  try {
    // Ensure "userName" is present in updatedAttributes
    if (!updatedAttributes.id) {
      throw new Error('Missing user ID');
    }

    const userId = updatedAttributes.id; // Extract userName
    delete updatedAttributes.username; // Remove userName from updatedAttributes
    const apiName = 'member';
    const filters = { userPoolId: awsConfigure.aws_user_pools_id };
    const queryParams = new URLSearchParams(Object.entries(filters));
    const path = `/member/${userId}?${queryParams.toString()}`;
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken;

    // Ensure custom attributes are prefixed with "custom:"
    const formattedAttributes: Record<string, string> = {};
    Object.entries(updatedAttributes).forEach(([key, value]) => {
      const attributeName = nonCustomAttributes.has(key) ? key : `custom:${key}`;
      formattedAttributes[attributeName] = value;
    });

    // Set up API call with Authorization header
    const options = {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token
        'Content-Type': 'application/json'
      },
      body: formattedAttributes
    };
    
    const putOperation = put({ apiName, path, options });
    const response = await putOperation.response;

    if (response.statusCode === 200) {
      showToast('User updated successfully', 'success');
    } else {
      showToast('Failed to update user', 'error');
    }
    return;
  } catch (error) {
    console.error('Error updating user:', error);
    showToast(error, 'error');
    throw error;
  }
};