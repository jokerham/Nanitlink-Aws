import { Fragment, useState } from 'react'
import { Button, ButtonGroup, Divider, Link, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { TAction, TRowAction, IDataRow, ITableBuidleProps } from './types';
import { RowBox } from 'component/customMui';

export * from './types';

export const TableBuilder = (props: ITableBuidleProps) => {
  const [dataRow, setDataRow] = useState<IDataRow|null>(null)
  const { data, filters, actions, paginationOption } = props;
  const columns = Object.keys(data[0]);

  return (
    <Fragment>
      <RowBox sx={{mt: 2, mb: 1, maxHeight: '30px'}}>
        <RowBox sx={{display: 'flex', alignItems: 'center', marginRight: 'auto'}}>
          {filters?.map((filter, index) => (
            <Fragment key={index}>
              {(index > 0) && (
                <Divider orientation="vertical" flexItem />
              )}
              <Link>{ filter.name }</Link>
            </Fragment>
          ))}
        </RowBox>
        <ButtonGroup variant="contained" size="small">
          {actions?.map((action, index) => {
            const buttonProps = {
              onClick: () => {
                if (action.action.length === 1) {
                  const rowAction = action.action as TRowAction;
                  rowAction(dataRow!); // Safely pass dataRow if required
                } else {
                  const simpleAction = action.action as TAction;
                  simpleAction(); // Call without arguments if not required
                }
              },
              disabled: (action.action.length === 1) ?
              (dataRow === null) : false
            }
            return (
              <Button key={index} {...buttonProps}>{action.label}</Button>
            )
          })}
        </ButtonGroup>
      </RowBox>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RowBox sx={{mt: 2, mb: 1, height: '30px'}}>
        <RowBox sx={{mr: 'auto'}}>
          <TablePagination
            component="div"
            count={100}
            page={paginationOption.page}
            onPageChange={paginationOption.handleChangePage}
            rowsPerPage={paginationOption.rowsPerPage}
            onRowsPerPageChange={paginationOption.handleChangeRowsPerPage}
            sx={{
              "& .MuiTablePagination-toolbar": {
                minHeight: '30px !important',
                "& .MuiTablePagination-spacer": {
                  display: "none",
                }
              },
              "& .MuiToolbar-root": {
                paddingY: 0,
              },
              "& .MuiTablePagination-selectLabel": {
                marginY: 0,
              },
              "& .MuiTablePagination-displayedRows": {
                marginY: 0,
              },
              "& .MuiTablePagination-actions": {
                "&> .MuiButtonBase-root": {
                  paddingY: 0,
                },
              } 
            }}
          />
        </RowBox>
        <ButtonGroup variant="contained" size="small">
          {actions?.map((action, index) => {
            const buttonProps = {
              onClick: () => {
                if (action.action.length === 1) {
                  const rowAction = action.action as TRowAction;
                  rowAction(dataRow!); // Safely pass dataRow if required
                } else {
                  const simpleAction = action.action as TAction;
                  simpleAction(); // Call without arguments if not required
                }
              },
              disabled: (action.action.length === 1) ?
              (dataRow === null) : false
            }
            return (
              <Button key={index} {...buttonProps}>{action.label}</Button>
            )
          })}
        </ButtonGroup>
      </RowBox>
    </Fragment>
  );
}
