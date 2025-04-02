import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';
import { createPost, updateBoard } from '@/graphql/mutations';
import { PostStatus } from '@/API';
import { getCurrentUser } from 'aws-amplify/auth';
import { getBoard } from '@/graphql/queries';

// Define the GraphQL mutation to update a post
const UPDATE_POST = /* GraphQL */ `
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      id
      title
      content
    }
  }
`;

interface IUpdatePostProps {
  id: string;
  title: string;
  content: string;
  attachments?: {
    fileName: string;
    path: string;
  }[];
}

export const gqUpdatePost = async ({ id, title, content }: IUpdatePostProps) => {
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

interface ICreatePostProps {
  module: string;
  moduleId: string;
  title: string;
  content: string;
  attachments: any[];
}

export const gqCreatePost = async ({ module, moduleId, title, content, attachments }: ICreatePostProps) => {
  const client = generateClient();
  const authorId = (await getCurrentUser()).username;
  let postIndex = 1;
  switch (module) {
    case 'board':
      const board = await client.graphql({
        query: getBoard,
        variables: {
          id: moduleId
        },
        authMode: 'apiKey'
      });
      if (board.data.getBoard) {
        postIndex = board.data.getBoard.lastPostIndex + 1;
      }

      const boardUpdate = await client.graphql({
        query: updateBoard,
        variables: {
          input: {
            id: moduleId,
            lastPostIndex: postIndex
          }
        },
        authMode: 'userPool'
      });
      break;
    default:
      break;
  }

  try {
    const response: any = await client.graphql({
      query: createPost,
      variables: {
        input: {
          module, moduleId, title, content, authorId, postIndex,
          status: PostStatus.PUBLISHED, views: 0
        }
      },
      authMode: 'userPool'
    });

    return response.data.createPost;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.error(error.message);
    });
    return null;
  }
};