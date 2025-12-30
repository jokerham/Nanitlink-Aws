import { post } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';

interface ICreateBoardPostProps {
  moduleId: string;
  categoryId?: string;
  title: string;
  content: string;
}

export const createBoardPost = async (postInput: ICreateBoardPostProps) => {
  const apiName = 'PostRestApi';
  const path = `/board/${postInput.moduleId}`;
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken;
    const options = {
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(postInput) };
    const postOperation = post({apiName, path, options});
    const response = await postOperation.response;
    const jsonResponse = await response.body.json();
    return jsonResponse;
  } catch (error) {
    console.error('Error creating board post:', error);
    throw error;
  }
}
