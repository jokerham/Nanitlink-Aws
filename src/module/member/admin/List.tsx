import { Section, SectionContent, SectionTitle } from 'component/Section'
import { IDataColumns, IDataRow, TableBuilder, TAction } from 'component/tableBuilder';

export default function List() {
  const columns: IDataColumns[] = [
    { id: 'id', name: 'Id', show: true, textAlign: 'left' },
    { id: 'name', name: 'Name', show: true, textAlign: 'left' },
    { id: 'email', name: 'Email', show: true, textAlign: 'left' },
    { id: 'group', name: 'Group', show: false, textAlign: 'left' },
    { id: 'approved', name: 'Approved', show: true, textAlign: 'center', dataMap: { 'true': 'Approved', 'false': 'Denied' } },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', group: 'admin', approved: true },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', group: 'guest', approved: false },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', group: 'guest', approved: true },
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
