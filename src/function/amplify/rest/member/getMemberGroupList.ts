import { get } from 'aws-amplify/api';
import { CognitoGroup } from './types';
import awsConfigure from 'amplifyconfiguration.json'

// API Function to Fetch Cognito Users
export const getMemberGroupList = async (
  filters: Record<string, string> = {}
): Promise<{ groups: CognitoGroup[] }> => {
  try {
    const apiName = 'member';
    filters = { userPoolId: awsConfigure.aws_user_pools_id };
    const queryParams = new URLSearchParams( Object.entries(filters) );
    const path = `/memberGroup?${queryParams.toString()}`;

    const getOperation = get({apiName, path});
    const response = await getOperation.response;
    const jsonResponse = await response.body.json();
    if (jsonResponse !== null && typeof jsonResponse === 'object' && 'groups' in jsonResponse) {
      const groups = jsonResponse.groups as unknown as CognitoGroup[];
      return { groups }
    } else {
      return { groups: [] };
    }
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};