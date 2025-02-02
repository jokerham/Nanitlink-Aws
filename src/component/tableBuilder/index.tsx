import { Fragment, useEffect, useState } from 'react'
import { Button, ButtonGroup, Divider, Link, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { IDataRow, ITableBuidleProps, TAction } from './types';
import { RowBox } from 'component/customMui';

export * from './types';

interface ITableButtonGroupProps {
  actions?: TAction[], 
  dataRow: TSelected
}

type TSelected = IDataRow[] | IDataRow | null

const TableButtonGroup = ({actions, dataRow}: ITableButtonGroupProps) => {
  const onClickHandler = (action: TAction) => {
    switch (action.actionType) {
      case 'none':
        return action.action();
      case 'row':
        return action.action(dataRow as IDataRow);
      case 'rows':
        if (Array.isArray(dataRow)) {
          return action.action(dataRow as IDataRow[]);
        } else {
          return action.action([dataRow as IDataRow]);
        }
      default:
    }
  }

  const disabled = (action: TAction) => {
    switch (action.actionType) {
      case 'none':
        return dataRow !== null;
      case 'row':
        return dataRow === null || Array.isArray(dataRow);
      case 'rows':
        return dataRow === null;
      default:
        return true;
    }
  }

  return (
    <ButtonGroup variant="contained" size="small">
      {actions?.map((action, index) => {
        const buttonProps: { onClick: () => void; disabled: boolean } = {
          onClick: () => {onClickHandler(action)},
          disabled: disabled(action)
        }
        return (
          <Button key={index} {...buttonProps}>{action.label}</Button>
        )
      })}
    </ButtonGroup>
  )
}

export const TableBuilder = ({ data, filters, actions, paginationOption }: ITableBuidleProps) => {
  const [dataRow, setDataRow] = useState<TSelected>(null)
  const columns = Object.keys(data[0]);

  const onSelectedHandler = (row: IDataRow) => {
    if (dataRow === null) {
      setDataRow(row)
    } else {
      if (Array.isArray(dataRow)) {
        const dataRows = dataRow as IDataRow[]
        if (dataRows.some(dataRow => dataRow.id === row.id)) {
          const excludeRows = dataRows.filter(dataRow => dataRow !== row)
          if (excludeRows.length <= 1) {
            setDataRow(excludeRows[0] ?? null)
          } else {
            setDataRow(excludeRows)
          }
        } else {
          setDataRow([...dataRows, row])
        }
      } else {
        if (dataRow.id === row.id) {
          setDataRow(null)
        } else {
          setDataRow([dataRow, row])
        }
      }
    }
  }

  const isSelected = (row: IDataRow) => {
    if (dataRow === null) {
      return false
    } else {
      if (Array.isArray(dataRow)) {
        const dataRows = dataRow as IDataRow[]
        return dataRows.some(dataRow => dataRow.id === row.id)
      } else {
        return dataRow.id === row.id
      }
    }
  }

  useEffect(() => {
    console.log({dataRow});
  }, [dataRow])

  return (
    <Fragment>
      <RowBox sx={{mt: 2, mb: 1, maxHeight: '30px'}}>
        <RowBox sx={{display: 'flex', alignItems: 'center', marginRight: 'auto'}}>
          {filters?.map((filter, index) => (
            <Fragment key={index}>
              {(index > 0) && (
                <Divider variant="middle" orientation="vertical" flexItem />
              )}
              <Link>
                <Typography variant='h5'>
                  { filter.name }
                </Typography>
              </Link>
            </Fragment>
          ))}
        </RowBox>
        <TableButtonGroup actions={actions} dataRow={dataRow} />
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
              <TableRow 
                key={index} 
                onClick={() => onSelectedHandler(row)} 
                selected={isSelected(row)}>
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
        <TableButtonGroup actions={actions} dataRow={dataRow} />
      </RowBox>
    </Fragment>
  );
}
