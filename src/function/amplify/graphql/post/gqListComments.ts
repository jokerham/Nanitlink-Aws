
import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';

const LIST_COMMENTS_BY_POST = /* GraphQL */ `
  query commentsByPostId($postId: ID!) {
    commentsByPostIdAndCommentIndexString(postId: $postId, sortDirection: DESC) {
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
        createdAt
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

    console.log(response);

    return response.data.commentsByPostIdAndCommentIndexString.items;
  } catch (error) {
    console.error(error);
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.log(error.message);
    });
    return [];
  }
};
