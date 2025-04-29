import { useEffect, useState } from 'react';
import { IDataColumns, IDataRow, TableBuilder, TAction, TPaginationOption } from '@/component/tableBuilder';
import { gqGetCategoryByBoard } from '@/function/amplify/graphql/post/gqGetCategory';
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from 'react-router';
import theme from '../theme';
import { gqDeleteCategory } from '@/function/amplify/graphql/post/gqDeleteCategory';

interface List {
  id: string
}

const columns: IDataColumns[] = [
  {id: 'id', name: 'ID', textAlign: 'left', show: false},
  {id: 'name', name: 'Name', textAlign: 'left', width: 170}
];

const paginationOption: TPaginationOption = {
  enable: false,
  page: 0,
  rowsPerPage: 0,
  handleChangePage: (event, page) => {},
  handleChangeRowsPerPage: () => {}
}

const List = ({id}: List) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IDataRow[]>([]);

  const addCategory = () => {
    navigate(`/board/configure/${id}/category/add`)
  }

  const deleteCategory = async (category: IDataRow) => {
    try {
      if (typeof category.id === 'string') {
        await gqDeleteCategory(category.id);
        const catrgories = await gqGetCategoryByBoard(id);
        setData(catrgories);
      } else {
        console.error('Invalid category ID:', category.id);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }

  const actions: TAction[] = [
    {label: 'Add', actionType: 'none', action: addCategory},
    {label: 'Delete', actionType: 'row', action: deleteCategory}
  ]

  useEffect(() => {
    gqGetCategoryByBoard(id).then((categories) => {
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
