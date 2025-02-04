import { Section, SectionContent, SectionTitle } from 'component/Section'
import { IDataColumns, IDataRow, TableBuilder, TAction } from 'component/tableBuilder';
import { useNavigate } from 'react-router';

export default function List() {
  const navigate = useNavigate();

  const columns: IDataColumns[] = [
    { id: 'id', name: 'Id', show: true, textAlign: 'left' },
    { id: 'userid', name: 'User ID', show: true, textAlign: 'left' },
    { id: 'name', name: 'Name', show: true, textAlign: 'left' },
    { id: 'email', name: 'Email', show: true, textAlign: 'left' },
    { id: 'group', name: 'Group', show: true, textAlign: 'left' },
    { id: 'approved', name: 'Approved', show: true, textAlign: 'center', dataMap: { 'true': 'Approved', 'false': 'Denied' } },
  ];

  const data = [
    { id: 1, userid: 'johndoe', name: 'John Doe', email: 'john.doe@example.com', group: 'admin', approved: true },
    { id: 2, userid: 'janesmith', name: 'Jane Smith', email: 'jane.smith@example.com', group: 'guest', approved: false },
    { id: 3, userid: 'bobjohnson', name: 'Bob Johnson', email: 'bob.johnson@example.com', group: 'guest', approved: true },
  ];

  const filters = [
    { name: 'All Members', field: '', value: '' },
    { name: 'Admin', field: 'group', value: 'admin' },
    { name: 'Approved', field: 'approved', value: true },
    { name: 'Denied', field: 'approved', value: false },
  ];

  const onCreate = () => {
  }

  const onEdit = (row: IDataRow) => {
    navigate(`/admin/member/detail?userid=${row.userid}`);
  }

  const onDelete = (rows: IDataRow[]) => {
  }

  const actions: TAction[] = [
    { label: 'Create', actionType: 'none', action: onCreate },
    { label: 'Edit', actionType: 'row', action: onEdit },
    { label: 'Delete', actionType: 'rows', action: onDelete },
  ];

  const paginationOption = {
    page: 0,
    rowsPerPage: 10,
    handleChangePage: () => {},
    handleChangeRowsPerPage: () => {}
  }

  return (
    <Section defaultExpanded={true}>
      <SectionTitle>Member List</SectionTitle>
      <SectionContent>
        <TableBuilder 
          columns={columns}
          data={data} 
          filters={filters} 
          actions={actions} 
          paginationOption={paginationOption} />
      </SectionContent>
    </Section>
  )
};
