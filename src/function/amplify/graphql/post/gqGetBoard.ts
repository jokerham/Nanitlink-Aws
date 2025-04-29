import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';
import { getBoard } from '@/graphql/queries';

export const gqGetBoard = async (id: string) => {
  const client = generateClient({ authMode: 'apiKey' });
  
  try {
    const response: any = await client.graphql({
      query: getBoard,
      variables: { id }
    });

    const boardItem = response.data.getBoard;
    return boardItem;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.log(error.message);
    });
    return null;
  }
};