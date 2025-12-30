import { del } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';

interface IDeleteBoardPostProps {
  boardId: string;
  postId: string;
}

export const deleteBoardPost = async (postDelete: IDeleteBoardPostProps) => {
  const apiName = 'PostRestApi';
  const path = `/board/${postDelete.boardId}?postId=${postDelete.postId}`;
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken;
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const delOperation = del({apiName, path, options});
    const response = await delOperation.response;
    return response;
  } catch (error) {
    console.error('Error creating board post:', error);
    throw error;
  }
}
