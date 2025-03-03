import { del } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import awsConfigure from 'amplifyconfiguration.json'
import { showToast } from 'function/showToast';

// API Function to Fetch Cognito Users
export const deleteMember = async (
  userName: string
) => {
  try {
    const apiName = 'member';
    const filters = { userPoolId: awsConfigure.aws_user_pools_id };
    const queryParams = new URLSearchParams( Object.entries(filters) );
    const path = `/member/${userName}?${queryParams.toString()}`;
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken;
    
    // Set up API call with Authorization header
    const options = {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token
      }
    };

    const delOperation = del({apiName, path, options});
    const response = await delOperation.response;
    
    //console.log(response);
    // if (jsonResponse !== null && typeof jsonResponse === 'object') {
    //   const user = jsonResponse as unknown as CognitoUser;
    //   return { user }
    // } else {
    //   return { user: null };
    // }
    if (response.statusCode === 200) {
      showToast('User deleted successfully', 'success');
    } else {
      showToast('Failed to delete user', 'error');
    }
    return;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};