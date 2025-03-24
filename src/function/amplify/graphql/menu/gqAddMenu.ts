import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';
import { createMenu } from '@/graphql/mutations';
import '@/amplifyConfigure';
import { gqListMenuByParendId } from './gqListMenu';

export interface IAddMenuInput {
  name: string;
  module: string;
  moduleId: string;
  parentId?: string;
  link?: string;
}

export const gqAddMenu = async (input: any) => {
  const client = generateClient();

  try {
    let maxSortOrder = 0;

    // 1️⃣ Fetch existing menus under the same parentId to find max sortOrder
    const menus = await gqListMenuByParendId(input.parentId);

    if (menus.length > 0) {
      // Get the max sortOrder
      maxSortOrder = Math.max(...menus.map((menu: { sortOrder: any; }) => menu.sortOrder));
    }

    // 2️⃣ Increment sortOrder for the new menu
    const newSortOrder = maxSortOrder + 1;

    // 3️⃣ Prepare input for new menu
    if (!input.parentId) { delete input.parentId; }
    if (!input.link) { input.link = `/${input.module}/${input.moduleId}` }
    input.sortOrder = newSortOrder;
    
    const response: any = await client.graphql({
      query: createMenu,
      variables: { input },
      authMode: 'userPool'
    });

    showToast('Menu added successfully', 'success');
    return response.data.createMenu;
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