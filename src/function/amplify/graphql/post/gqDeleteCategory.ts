import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';
import { fetchAuthSession } from 'aws-amplify/auth';

const DELETE_CATEGORY = /* GraphQL */ `
  mutation DeleteCategory($id: ID!) {
    deleteCategory(input: { id: $id }) {
      id
      name
    }
  }
`;

export const gqDeleteCategory = async (id: string) => {
  const client = generateClient({ authMode: 'userPool' });

  try {
    const session = await fetchAuthSession();
    if (!session.userSub) {
      showToast('User not authenticated.', 'error');
      return null;
    }

    const response: any = await client.graphql({
      query: DELETE_CATEGORY,
      variables: { id }
    });
    return response.data.deleteCategory;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.log(error.message);
    });
    return null;
  }
};
