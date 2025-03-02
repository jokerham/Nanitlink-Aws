import { get } from 'aws-amplify/api';
import { CognitoUser } from './types';
import awsConfigure from 'amplifyconfiguration.json'

// API Function to Fetch Cognito Users
export const getMemberList = async (
  filters: Record<string, string> = {}
): Promise<{ users: CognitoUser[] }> => {
  try {
    const apiName = 'member';
    filters = { ...filters, userPoolId: awsConfigure.aws_user_pools_id };
    const queryParams = new URLSearchParams( Object.entries(filters) );
    const path = `/member?${queryParams.toString()}`;

    const getOperation = get({apiName, path});
    const response = await getOperation.response;
    const jsonResponse = await response.body.json();
    if (jsonResponse !== null && typeof jsonResponse === 'object' && 'users' in jsonResponse) {
      console.log(jsonResponse.users);
      const users = jsonResponse.users as unknown as CognitoUser[];
      return { users }
    } else {
      return { users: [] };
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};