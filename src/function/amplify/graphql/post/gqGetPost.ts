import { getPost, listPosts, getBoard } from './../../../../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';
import { getMemberDetail } from '../../rest/member';

// Define the GraphQL query to fetch an article with its associated post
const GET_ARTICLE_WITH_POST =  /* GraphQL */ `
  query GetArticleWithPost($id: ID!) {
    getArticle(id: $id) {
      id
      name
      post {
        id
        title
        content
        authorId
        comments {
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
        attachments {
          items {
            id
            fileName
            path
          }
        }
        status
        tags {
          items {
            tag {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const GET_BOARD =  /* GraphQL */ `
  query GetBoard($id: ID!) {
    getBoard(id: $id) {
      id
      name
      totalPosts
      lastPostIndex
      pageTokens {
        page
        token
      }
    }
  }
`;

const GET_BOARD_POST = /* GraphQL */ `
  query GetBoardPosts($moduleId: String = "", $nextToken: String) {
    postsByModuleAndModuleIdAndPostIndex(
      module: "board"
      moduleIdPostIndex: { beginsWith: { moduleId: $moduleId } }
      limit: 10
      nextToken: $nextToken
      sortDirection: DESC
    ) {
      items {
        id
        postIndex
        title
        content
        authorId
        createdAt
        views
        comments {
          items {
            id
          }
        }
        attachments {
          items {
            id
          }
        }
      }
      nextToken
    }
  }
`;

export const gqGetArticleWithPost = async (articleId: string) => {
  const client = generateClient({ authMode: 'apiKey' });

  try {
    const response: any = await client.graphql({
      query: GET_ARTICLE_WITH_POST,
      variables: { id: articleId }
    });

    return response.data.getArticle;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.log(error.message);
    });
    return null;
  }
};

export const gqGetPost = async (id: string) => {
  const client = generateClient({ authMode: 'apiKey' });

  try {
    const response: any = await client.graphql({
      query: getPost,
      variables: { id }
    });

    const post = response.data.getPost;
    const user = await getMemberDetail(post?.authorId);
    post.author = user?.user?.nickName || 'guest';
    console.log('post', post);

    return post;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.log(error.message);
    });
    return null;
  }
}