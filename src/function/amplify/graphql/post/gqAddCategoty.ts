import { generateClient, GraphQLResult } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';
import { createCategory } from '@/graphql/mutations';
import { getCurrentUser } from 'aws-amplify/auth';

interface IAddCateogryProps {
  name: string;
  boardId: string;
}

export const gqAddCateogry = async({name, boardId}: IAddCateogryProps) => {
  const client = generateClient();

  try {
    const res = await client.graphql({
      query: /* GraphQL */ `
        query ListCategoriesByBoard($boardId: ID!) {
          listCategories(
            filter: { boardId: { eq: $boardId } }
            limit: 1000
          ) {
            items {
              id
              categoryIndex
            }
          }
        }
      `,
      variables: { boardId }
    }) as GraphQLResult<any>; // 타입 단언 추가;

    const items = res.data.listCategories.items;
    console.log(items);
    const maxIndex = items.reduce((max: number, item: any) =>
      item.categoryIndex > max ? item.categoryIndex : max, 0
    );
    console.log(maxIndex);

    const newIndex = maxIndex + 1;
    const categoryIndexString = newIndex.toString().padStart(5, '0');

    const response: any = await client.graphql({
      query:  /* GraphQL */ `
        mutation CreateCategory($input: CreateCategoryInput!) {
          createCategory(input: $input) {
            id
          }
        }
      `,
      variables: {
        input: {
          name,
          boardId,
          categoryIndex: newIndex,
          categoryIndexString
        }
      },
      authMode: 'userPool'
    });
    return response.data.createCategory.id;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.error(error.message);
    });
    return null;
  }
}