import { generateClient } from "aws-amplify/api";
import { showToast } from "@/function/showToast";

const DELETE_COMMENT = /* GraphQL */ `
  mutation DeleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
      postId
    }
  }
`;

export const gqDeleteComment = async (id: string) => {
  const client = generateClient({ authMode: "userPool" });

  try {
    const response: any = await client.graphql({
      query: DELETE_COMMENT,
      variables: { id },
    });
    return response.data.deleteComment;
  } catch (error) {
    const typedError = error as { errors?: { message: string }[] };
    typedError.errors?.forEach((error) => {
      showToast(error.message, "error");
      console.log(error.message);
    });
    return null;
  }
};