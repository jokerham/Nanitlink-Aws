import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';

const UPDATE_BOARD = /* GraphQL */ `
  mutation UpdateBoard($input: UpdateBoardInput!) {
    updateBoard(input: $input) {
      id
      name
      description
      rowsPerPage
      headerText
      footerText
    }
  }
`;

interface IUpdateBoardProps {
  id: string;
  name: string;
  description?: string;
  rowsPerPage: number;
  headerText?: string;
  footerText?: string;
}

export const gqUpdateBoard = async ({ id, name, description, rowsPerPage, headerText, footerText }: IUpdateBoardProps) => {
  const client = generateClient({ authMode: 'apiKey' });

  try {
    const response: any = await client.graphql({
      query: UPDATE_BOARD,
      variables: {
        input: { id, name, description, rowsPerPage, headerText, footerText }
      },
      authMode: 'userPool'
    });

    return response.data.updateBoard;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.error(error.message);
    });
    return null;
  }
};
