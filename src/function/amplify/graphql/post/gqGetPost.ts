import { generateClient } from 'aws-amplify/api';
import { gql } from "graphql-tag";
import { showToast } from 'function/showToast';

// Define the GraphQL query to fetch an article with its associated post
const GET_ARTICLE_WITH_POST = gql`
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