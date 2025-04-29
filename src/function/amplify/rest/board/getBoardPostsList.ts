import { get } from 'aws-amplify/api';
import { Board } from '@/API';

// API Function to Fetch Cognito Users
export const getBoardPostsList = async (
  board: string, 
  page: number = 1, 
  rowsPerPage: number = 10,
  filters: Record<string, string> = {}
): Promise<Board> => {
  try {
    const apiName = 'post';
    filters = { ...filters, page: page.toString(), rowsPerPage: rowsPerPage.toString() };
    const queryParams = new URLSearchParams( Object.entries(filters) );
    const path = `/board/${board}?${queryParams.toString()}`;

    const getOperation = get({apiName, path});
    const response = await getOperation.response;
    const jsonResponse = await response.body.json();
    //console.log(jsonResponse);
    if (jsonResponse !== null && typeof jsonResponse === 'object') {
      const board = jsonResponse as unknown as Board;
      //console.log(board);
      return board
    } else {
      return {} as Board;
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};