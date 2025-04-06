import { showToast } from "@/function/showToast";
import { deletePost } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";

interface IDeletePostProps {
  id: string;
}

export const gqDeletePost = async ({ id  }: IDeletePostProps) => {
  const client = generateClient();
  try {
    const response: any = await client.graphql({
      query: deletePost,
      variables: {
        input: {
          id
        }
      },
      authMode: 'userPool'
    });

    return response.data.deletePost;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach(error => {
      showToast(error.message, 'error');
      console.error(error.message);
    });
    return null;
  }
}