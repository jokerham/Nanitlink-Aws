import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';
import { createPost } from '@/graphql/mutations';
import { PostStatus } from '@/API';
import { getCurrentUser } from 'aws-amplify/auth';
import { createBoardPost } from '../../rest/board';

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
  try {
    switch (module) {
      case 'board':
        const post = await createBoardPost({
          moduleId,
          title,
          content
        })
        return post;
      default:
        const client = generateClient();
        const postIndex = 1;
        const postIndexString = String(postIndex).padStart(10, '0');
        const authorId = (await getCurrentUser()).userId;
        const response: any = await client.graphql({
          query: createPost,
          variables: {
            input: {
              module, moduleId, title, content, authorId, postIndex, postIndexString,
              status: PostStatus.PUBLISHED, views: 0
            }
          },
          authMode: 'userPool'
        });
        return response.data.createPost;
    }
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.error(error.message);
    });
    return null;
  }
};