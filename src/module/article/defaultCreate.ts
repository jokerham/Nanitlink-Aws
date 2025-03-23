import { generateClient } from 'aws-amplify/api';
import { createArticle } from '../../graphql/mutations'; // Ensure correct path
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Article, Post, PostStatus, PostType } from 'API';
import { getCurrentUser } from 'aws-amplify/auth';

interface ICreateEmptyPostParameter {
  title: string, 
  authorId: string
}

const createPostMinimal = /* GraphQL */ `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`;

const createArticleMinimal = /* GraphQL */ `
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`;

export async function createEmptyPost({title, authorId}: ICreateEmptyPostParameter): Promise<Post | null> {
  const client = generateClient();
  try {
    const response = (await client.graphql({
      query: createPostMinimal,
      variables: {
        input: {
          title,
          content: '',
          authorId,
          status: PostStatus.PUBLISHED,
          postType: PostType.ARTICLE
        },
      },
      authMode: 'userPool'
    })) as GraphQLResult<{ createPost: Post }>;

    return response.data?.createPost || null;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
}


interface ICreateDefaultParameter {
  id: string,
  name: string
}

// Function to create an article with the created post
export async function createDefault({id, name}: ICreateDefaultParameter): Promise<Article | null> {
  const client = generateClient();
  const author = await getCurrentUser();
  const post = await createEmptyPost({title: name, authorId: author.userId});
  if (!post) {
    console.error('Failed to create post. Aborting article creation.');
    return null;
  }

  try {
    const response = (await client.graphql({
      query: createArticleMinimal,
      variables: {
        input: {
          id,
          name,
          articlePostId: post.id,
        },
      },
      authMode: 'userPool'
    })) as GraphQLResult<{ createArticle: Article }>;

    return response.data?.createArticle || null;
  } catch (error) {
    console.error('Error creating article:', error);
    return null;
  }
}