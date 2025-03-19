import { generateClient } from 'aws-amplify/api';
import { showToast } from 'function/showToast';
import { gql } from "graphql-tag"; // Import gql for defining GraphQL queries

// Define the custom GraphQL query
const LIST_MENUS_BY_PARENT = gql`
  query ListMenusByParent($filter: ModelMenuFilterInput) {
    listMenus(filter: $filter) {
      items {
        id
        name
        module
        moduleId
        link
        sortOrder
      }
    }
  }
`;

export const gqListMenuByParendId = async (parentId: string | null) => {
  const client = generateClient({authMode: 'apiKey'});

  try {
    const filter = parentId
    ? { parentId: { eq: parentId } } // Pass the ID directly
    : { parentId: { attributeExists: false } }; // Handle root menus (no parent)

    const response: any = await client.graphql({
      query: LIST_MENUS_BY_PARENT,
      variables: { filter }
    });
    return response.data.listMenus.items;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    if (typedError.errors) {
      typedError.errors.forEach((err) => {
        showToast(err.message, 'error');
      });
    } else {
      showToast(String(error), 'error');
    }
    return [];
  }
};

export const gqListMenuTree = async (level: number, parentId: string | null) => {
  const menu = await gqListMenuByParendId(parentId);

  if (level !== 0) {
    await Promise.all(
      menu.map(async (item: any) => {
        item.children = await gqListMenuTree(level - 1, item.id);
      })
    );
  }

  return menu;
};