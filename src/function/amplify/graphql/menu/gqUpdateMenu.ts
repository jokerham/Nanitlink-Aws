import { generateClient } from 'aws-amplify/api';
import { showToast } from '@/function/showToast';
import { updateMenu } from '@/graphql/mutations';
import '@/amplifyConfigure';

export interface IUpdateMenuInput {
  id: string;
  name?: string;
  module?: string;
  moduleId?: string;
  parentId?: string;
  link?: string;
  sortOrder?: number;
}

export const gqUpdateMenu = async (input: IUpdateMenuInput) => {
  const client = generateClient();

  try {
    // Ensure only defined values are sent in the mutation
    const updateInput: any = { ...input };

    if (!updateInput.parentId) {
      delete updateInput.parentId;
    }
    
    if (!updateInput.link && updateInput.module && updateInput.moduleId) {
      updateInput.link = `/${updateInput.module}/${updateInput.moduleId}`;
    }

    const response: any = await client.graphql({
      query: updateMenu,
      variables: { input: updateInput },
      authMode: 'userPool'
    });

    showToast('Menu updated successfully', 'success');
    return response.data.updateMenu;
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