import { useEffect, useState } from 'react';
import { IDataColumns, IDataRow, TableBuilder, TAction, TPaginationOption } from '@/component/tableBuilder';
import { gqGetCategoryByBoard } from '@/function/amplify/graphql/post/gqGetCategory';
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from 'react-router';
import theme from '../theme';
import { gqDeleteCategory } from '@/function/amplify/graphql/post/gqDeleteCategory';

interface IListProps {
  id: string
}

const columns: IDataColumns[] = [
  {id: 'id', name: 'ID', textAlign: 'left', show: false},
  {id: 'no', name: 'No.', textAlign: 'left', width: 50},
  {id: 'name', name: 'Column Name', textAlign: 'left', width: 170},
  {id: 'type', name: 'Column Type', textAlign: 'left', width: 170},
  {id: 'default', name: 'Default Value', textAlign: 'left', width: 170},
  {id: 'required', name: 'Required Field', textAlign: 'left', width: 170}
];

const paginationOption: TPaginationOption = {
  enable: false,
  page: 0,
  rowsPerPage: 0,
  handleChangePage: (event, page) => {},
  handleChangeRowsPerPage: () => {}
}

const List = ({id}: IListProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IDataRow[]>([]);

  const addUserDefinedField = () => {
    navigate(`/board/configure/${id}/userDefined/add`)
  }

  const deleteUserDefinedField = async (category: IDataRow) => {
    try {
      if (typeof category.id === 'string') {
        await gqDeleteCategory(category.id); //TODO: Change to gqDeleteUserDefinedField
        const catrgories = await gqGetCategoryByBoard(id); //TODO: Change to gqGetUserDefinedFieldsByBoard
        setData(catrgories);
      } else {
        console.error('Invalid category ID:', category.id);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }

  const actions: TAction[] = [
    {label: 'Add', actionType: 'none', action: addUserDefinedField},
    {label: 'Delete', actionType: 'row', action: deleteUserDefinedField}
  ]

  useEffect(() => {
    gqGetCategoryByBoard(id).then((categories) => { //TODO: Change to gqGetUserDefinedFieldsByBoard
      categories.forEach((category: IDataRow, index: number) => {
        category.no = index + 1;
        category.type = category.type || 'text'; // Default to 'text' if type is not defined
        category.default = category.default || ''; // Default to empty string if default is not defined
        category.required = category.required ? 'Yes' : 'No'; // Convert boolean to string
      });
      setData(categories);
      setLoading(false);
    })
  }, [id])

  return (
    <ThemeProvider theme={theme}>
      <TableBuilder 
        loading={false} 
        columns={columns}
        actions={actions}
        data={data} 
        paginationOption={paginationOption}/>
    </ThemeProvider>
  )
}

export default List;
