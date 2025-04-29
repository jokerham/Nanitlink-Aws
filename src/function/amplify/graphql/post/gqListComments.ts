
import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';

const LIST_COMMENTS_BY_POST = /* GraphQL */ `
  query ListCommentsByPost($postId: ID!) {
    commentsByPostId(postId: $postId) {
      items {
        id
        content
        authorId
        attachments {
          items {
            id
            fileName
            path
          }
        }
      }
    }
  }
`;

export const gqListComments = async (postId: string) => {
  const client = generateClient({ authMode: 'apiKey' });

  try {
    const response: any = await client.graphql({
      query: LIST_COMMENTS_BY_POST,
      variables: { postId }
    });

    return response.data.commentsByPostId.items;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.log(error.message);
    });
    return [];
  }
};
