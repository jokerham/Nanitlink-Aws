import { IDataColumns, IDataRow, TableBuilder, TAction, TPaginationOption } from '@/component/tableBuilder';
import { gqGetCategoryByBoard } from '@/function/amplify/graphql/post/gqGetCategory';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface ICategoriesProps {
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

const Categories = ({id}: ICategoriesProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IDataRow[]>([]);

  const addCategory = () => {
    navigate(`/board/configure/${id}/category/add`)
  }

  const deleteCategory = (category: IDataRow) => {

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
    <Box>
      <TableBuilder 
        loading={false} 
        columns={columns}
        actions={actions}
        data={data} 
        paginationOption={paginationOption}/>
    </Box>
  )
}

export default Categories;
