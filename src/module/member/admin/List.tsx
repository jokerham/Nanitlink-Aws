import { Section, SectionContent, SectionTitle } from 'component/Section'
import { IDataColumns, IDataRow, TableBuilder, TAction } from 'component/tableBuilder';
import { deleteMember, getMemberList } from 'function/amplify/rest/member';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function List() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IDataRow[]>([]);

  const columns: IDataColumns[] = [
    { id: 'id', name: 'Id', show: false },
    { id: 'userid', name: 'User ID', show: true, textAlign: 'left' },
    { id: 'name', name: 'Name', show: true, textAlign: 'left' },
    { id: 'email', name: 'Email', show: true, textAlign: 'left' },
    { id: 'group', name: 'Group', show: true, textAlign: 'left' },
    { id: 'approved', name: 'Approved', show: true, textAlign: 'center' },
  ];

  useEffect(() => {
    getMemberList().then((result) => {
      const mappedData = result.users.map(user => ({
        id: user.id,
        userid: user.email,
        name: user.name,
        email: user.email,
        group: user.userGroups.join(', '),
        approved: user.activeState,
      }));
      setData(mappedData);
      setLoading(false);
    });
  }, []);

  const filters = [
    { name: 'All Members', field: '', value: '' },
    { name: 'Admin', field: 'group', value: 'ADMIN' },
    { name: 'Approved', field: 'approved', value: 'Enabled' },
    { name: 'Denied', field: 'approved', value: 'Disabled' },
  ];

  const onCreate = () => {
  }

  const onEdit = (row: IDataRow) => {
    navigate(`/admin/member/detail?userid=${row.userid}`);
  }

  const onDelete = (rows: IDataRow[]) => {
    rows.map(row => {
      deleteMember(row.userid as string);
    })
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
      <SectionTitle expandable={false}>Member List</SectionTitle>
      <SectionContent>
        <TableBuilder 
          columns={columns}
          loading={loading}
          data={data} 
          filters={filters} 
          actions={actions} 
          paginationOption={paginationOption} />
      </SectionContent>
    </Section>
  )
};
