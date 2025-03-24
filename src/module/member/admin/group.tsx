import MemberGroupDialog from "@/component/dialog/memberGroupDialog";
import { Section, SectionContent, SectionTitle } from "@/component/Section";
import { IDataColumns, IDataRow, TableBuilder, TAction } from "@/component/tableBuilder";
import { getMemberGroupList, deleteMemberGroup } from "@/function/amplify/rest/member";
import { Fragment, useEffect, useState } from "react";

const Group = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IDataRow[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');

  const columns: IDataColumns[] = [
    { id: 'id', name: 'Id', show: false },
    { id: 'name', name: 'Group', show: true, textAlign: 'left' },
  ];

  const fetchData = async () => {
    getMemberGroupList().then((result) => {
      const mappedData = result.groups.map(group => ({
        id: group.GroupName,
        name: group.GroupName,
      }));
      setData(mappedData);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onCreate = () => {
    setGroupName('');
    setOpen(true);
  }

  const onEdit = (row: IDataRow) => {
    setGroupName(row.name as string);
    setOpen(true);
  }

  const onDelete = async (rows: IDataRow[]) => {
    await Promise.all(rows.map(row => deleteMemberGroup(row.id as string)));
    fetchData();
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

  const onClose = () => {
    setOpen(false);
  }

  const onCreated = () => {
    fetchData();
    onClose();
  }

  return (
    <Fragment>
      <Section defaultExpanded={true}>
        <SectionTitle expandable={false}>Member Group List</SectionTitle>
        <SectionContent>
          <TableBuilder 
            columns={columns}
            loading={loading}
            data={data} 
            actions={actions} 
            paginationOption={paginationOption} />
        </SectionContent>
      </Section>
      <MemberGroupDialog 
        open={open} 
        groupName={groupName} 
        onClose={onClose}
        onCreated={onCreated} />
    </Fragment>
  )
}

export default Group;
