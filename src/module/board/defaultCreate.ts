import { Board } from "@/API";
import { createBoard } from "@/graphql/mutations";
import { generateClient, GraphQLResult } from "aws-amplify/api";

interface ICreateDefaultParameter {
  id: string,
  name: string
}

export async function createDefault({id, name}: ICreateDefaultParameter): Promise<Board | null> {
  const client = generateClient();

  try {
    const response = (await client.graphql({
      query: createBoard,
      variables: {
        input: {
          id,
          name,
          totalPosts: 0,
          pageTokens: [],
        },
      },
      authMode: 'userPool'
    })) as GraphQLResult<{ createBoard: Board }>;

    return response.data?.createBoard || null;
  } catch (error) {
    console.error('Error creating board:', error);
    return null;
  }
}