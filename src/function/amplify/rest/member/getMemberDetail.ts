import { get } from 'aws-amplify/api';
import { CognitoUser } from './types';
import awsConfigure from '@/amplifyconfiguration.json';

// Cache to store fetched users by subId
const userCache = new Map<string, CognitoUser | null>();

// Track ongoing requests by subId
const pendingRequests = new Map<string, Promise<CognitoUser | null>>();

// API Function to Fetch Cognito Users
export const getMemberDetail = async (
  subId: string
): Promise<{ user: CognitoUser | null }> => {
  // Return cached user if available
  if (userCache.has(subId)) {
    return { user: userCache.get(subId) ?? null };
  }

  // If a request is already in progress, wait for it
  if (pendingRequests.has(subId)) {
    const user = await pendingRequests.get(subId)!;
    return { user };
  }

  // Create and store a new fetch promise
  const fetchPromise = (async (): Promise<CognitoUser | null> => {
    try {
      const apiName = 'member';
      const filters = { userPoolId: awsConfigure.aws_user_pools_id };
      const queryParams = new URLSearchParams(Object.entries(filters));
      const path = `/member/${subId}?${queryParams.toString()}`;

      const getOperation = get({ apiName, path });
      const response = await getOperation.response;
      const jsonResponse = await response.body.json();

      const user =
        jsonResponse && typeof jsonResponse === 'object'
          ? (jsonResponse as unknown as CognitoUser)
          : null;

      // Save in cache
      userCache.set(subId, user);
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    } finally {
      pendingRequests.delete(subId); // Clean up
    }
  })();

  pendingRequests.set(subId, fetchPromise);

  const user = await fetchPromise;
  return { user };
};