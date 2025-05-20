import { generateClient, GraphQLResult } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';
import { useAuth } from '@/component/commom/AuthContext';

interface IAddCommentProps {
  postId: string;
  content: string;
  authorId: string
}

export const gqAddComment = async({postId, content, authorId}: IAddCommentProps) => {
  const client = generateClient();

  try {
    const res = await client.graphql({
      query: /* GraphQL */ `
        query ListCommentsByPost($postId: ID!) {
          listComments(
            filter: { postId: { eq: $postId } }
            limit: 1000
          ) {
            items {
              id
              commentIndex
            }
          }
        }
      `,
      variables: { postId }
    }) as GraphQLResult<any>; // 타입 단언 추가;

    const items = res.data.listComments.items;
    console.log(items);
    const maxIndex = items.reduce((max: number, item: any) =>
      item.commentIndex > max ? item.commentIndex : max, 0
    );
    console.log(maxIndex);
    const newIndex = maxIndex + 1;
    const commentIndexString = newIndex.toString().padStart(5, '0');
    const response: any = await client.graphql({
      query:  /* GraphQL */ `
        mutation CreateComment($input: CreateCommentInput!) {
          createComment(input: $input) {
            id
          }
        }
      `,
      variables: {
        input: {
          postId,
          content,
          commentIndex: newIndex,
          commentIndexString,
          authorId
        }
      },
      authMode: 'userPool'
    });
    return response.data.createComment;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.error(error.message);
    });
    return null;
  }
} 