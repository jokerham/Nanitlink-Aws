import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';

const LIST_CATEGORY_BY_BOARD = /* GraphQL */ `
  query ListCategoryByBoard($boardId: ID!) {
    categoriesByBoardIdAndCategoryIndexString(
      boardId: $boardId
      sortDirection: DESC
    ) {
      items {
        id
        name
        boardId
        categoryIndex
        categoryIndexString
      }
    }
  }
`;

export const gqGetCategoryByBoard = async (id: string) => {
  const client = generateClient({ authMode: 'apiKey' });

  try {
    const response: any = await client.graphql({
      query: LIST_CATEGORY_BY_BOARD,
      variables: { boardId: id }
    });
    //console.log(response);
    return response.data.categoriesByBoardIdAndCategoryIndexString.items;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.log(error.message);
    });
    return [];
  }
};
