import { get } from 'aws-amplify/api';
import { CognitoUser } from './types';
import awsConfigure from 'amplifyconfiguration.json'

// API Function to Fetch Cognito Users
export const getMemberDetail = async (
  userName: string
): Promise<{ user: CognitoUser | null }> => {
  try {
    const apiName = 'member';
    const filters = { userPoolId: awsConfigure.aws_user_pools_id };
    const queryParams = new URLSearchParams( Object.entries(filters) );
    const path = `/member/${userName}?${queryParams.toString()}`;

    const getOperation = get({apiName, path});
    const response = await getOperation.response;
    const jsonResponse = await response.body.json();
    
    if (jsonResponse !== null && typeof jsonResponse === 'object') {
      const user = jsonResponse as unknown as CognitoUser;
      return { user }
    } else {
      return { user: null };
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};