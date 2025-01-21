import { TableBody } from '@mui/material'
import { Section, SectionContent, SectionTitle } from 'component/Section'
import { IDataRow, TableBuilder } from 'component/tableBuilder';
import React from 'react'

export default function List() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  ];

  const filters = [
    { name: 'All', field: '', value: '' },
    { name: 'Name', field: 'name', value: 'John' },
    { name: 'Email', field: 'email', value: 'example.com' },
  ];

  const actions = [
    { label: 'Create', action: () => console.log('Create') },
    { label: 'Edit', action: (row: IDataRow) => console.log('Edit', row) },
    { label: 'Delete', action: (row: IDataRow) => console.log('Delete', row) },
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
        <TableBuilder data={data} filters={filters} actions={actions} paginationOption={paginationOption} />
      </SectionContent>
    </Section>
  )
};
