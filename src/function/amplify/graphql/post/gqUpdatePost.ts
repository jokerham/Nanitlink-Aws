import { generateClient } from 'aws-amplify/api';
import { gql } from "graphql-tag";
import { showToast } from '@/function/showToast';

// Define the GraphQL mutation to update a post
const UPDATE_POST = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      id
      title
      content
    }
  }
`;

interface UpdatePostProps {
  id: string;
  title: string;
  content: string;
}

export const gqUpdatePost = async ({ id, title, content }: UpdatePostProps) => {
  const client = generateClient({ authMode: 'apiKey' });

  try {
    const response: any = await client.graphql({
      query: UPDATE_POST,
      variables: {
        input: { id, title, content }
      },
      authMode: 'userPool'
    });

    return response.data.updatePost;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.error(error.message);
    });
    return null;
  }
};
