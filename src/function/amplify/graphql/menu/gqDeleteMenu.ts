import { generateClient } from "aws-amplify/api";
import { gql } from "graphql-tag";
import { gqListMenuByParendId } from "./gqListMenu";
import { showToast } from "function/showToast";

const LIST_CHILD_MENUS = gql`
  query ListChildMenus($parentId: ID!) {
    listMenus(filter: { parentId: { eq: $parentId } }) {
      items {
        id
      }
    }
  }
`;

const DELETE_MENU = gql`
  mutation DeleteMenu($id: ID!) {
    deleteMenu(input: { id: $id }) {
      id
    }
  }
`;

export const gqDeleteMenu = async (menuId: string) => {
  const client = generateClient();

  try {
    // 1️⃣ Fetch child menus of this menuId
    const response: any = await client.graphql({
      query: LIST_CHILD_MENUS,
      variables: { parentId: menuId },
    });

    const childMenus = response.data.listMenus.items;

    // 2️⃣ Recursively delete child menus first
    for (const child of childMenus) {
      await gqDeleteMenu(child.id);
    }

    // 3️⃣ Delete the current menu after its children are gone
    const deleteResponse: any = await client.graphql({
      query: DELETE_MENU,
      variables: { id: menuId },
      authMode: 'userPool'
    });

    showToast(`Menu deleted successfully`, 'success');
    return deleteResponse.data.deleteMenu;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    if (typedError.errors) {
      typedError.errors.forEach((err) => {
        showToast(err.message, 'error');
        console.log(err.message);
      });
    } else {
      showToast(String(error), 'error');
    }
    return null;
  }
};