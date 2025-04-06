import { getPost } from './../../../../graphql/queries';
import { generateClient, post } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';
import { getMemberDetail } from '../../rest/member';
import { getCurrentUser } from 'aws-amplify/auth';

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

export const gqGetPost = async (id: string, incrementView: boolean = false) => {
  const client = generateClient({ authMode: 'apiKey' });
  let userId = '';

  try {
    const currentUser = await getCurrentUser();
    userId = currentUser.userId;
  } catch (error) {
    userId = `guest-${window?.location?.hostname}`;
  }

  try {
    if (incrementView) {
      const restApiResponse = await post({
        apiName: 'post',
        path: `/post/increment`,
        options: {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            postId: id,
            userId,
          })
        }
      });
      const postResponse = await restApiResponse.response;
      const incrementResponse = await postResponse.body.json();
    };

    const response: any = await client.graphql({
      query: getPost,
      variables: { id }
    });

    const postItem = response.data.getPost;
    const user = await getMemberDetail(postItem?.authorId);
    postItem.author = user?.user?.nickName || 'guest';
    return postItem;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.log(error.message);
    });
    return null;
  }
};