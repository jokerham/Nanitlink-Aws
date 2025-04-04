import { getPost, listPosts, getBoard } from './../../../../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';

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

export const gqListBoardWithPost = async (boardId: string, page: number) => {
  const client = generateClient({ authMode: 'apiKey' });

  try {
    // Fetch board information
    const boardResponse: any = await client.graphql({
      query: GET_BOARD,
      variables: { id: boardId }
    });
    const board = boardResponse.data.getBoard;
    //console.log(board);
    
    // Fetch posts for the specified board and page
    const nextToken = board.pageTokens.find((t: any) => t.page === page)?.token ?? null;

    const postResponse: any = await client.graphql({
      query: GET_BOARD_POST,
      variables: { moduleId: boardId, nextToken }
    });
    //console.log(postResponse);
    const posts = postResponse.data.postsByModuleAndModuleIdAndPostIndex;
    //console.log(posts);
    board.posts = posts;

    //console.log(board);
    return board;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.log(error.message);
    });
    return null;
  }
}

export const gqGetPost = async (id: string) => {
  const client = generateClient({ authMode: 'apiKey' });

  try {
    const response: any = await client.graphql({
      query: getPost,
      variables: { id }
    });

    return response.data.getPost;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.log(error.message);
    });
    return null;
  }
}