import { get } from 'aws-amplify/api';
import { CognitoUser } from './types';
import awsConfigure from '@/amplifyconfiguration.json'

// API Function to Fetch Cognito Users
export const getMemberList = async (
  filters: Record<string, string> = {}
): Promise<{ users: CognitoUser[] }> => {
  try {
    const apiName = 'MemberRestApi';
    const path = '/member';

    const getOperation = get({apiName, path});
    const response = await getOperation.response;
    const jsonResponse = await response.body.json();
    if (jsonResponse !== null && typeof jsonResponse === 'object' && 'users' in jsonResponse) {
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