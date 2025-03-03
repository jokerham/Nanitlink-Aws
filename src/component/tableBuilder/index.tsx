import { Fragment, useEffect, useState } from 'react'
import { Button, ButtonGroup, Divider, Link, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { IDataRow, ITableBuidleProps, ITableFilter, TAction } from './types';
import { RowBox } from 'component/customMui';
import { isString } from 'formik';

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

export const TableBuilder = ({ columns: columnSettings, data: initialData, filters, actions, paginationOption }: ITableBuidleProps) => {
  const [data, setData] = useState<IDataRow[]>(initialData)
  const [dataRow, setDataRow] = useState<TSelected>(null)
  const [currentFilter, setCurrentFilter] = useState<ITableFilter | null>(null)
  const columns = columnSettings ?? Object.keys(initialData[0]);

  const onFilterSelectedHandler = (filter: ITableFilter) => {
    setCurrentFilter(filter);
  }

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

  useEffect (() => {
    if (currentFilter === null || currentFilter.field === '') {
      setData(initialData)
    } else {
      setData(initialData.filter(row => {
        const fieldValue = row[currentFilter.field]; // Get the field value
        return (typeof fieldValue === "string" && typeof currentFilter.value === "string")
          ? fieldValue.includes(currentFilter.value) // Use includes() for strings
          : fieldValue === currentFilter.value; // Fallback to strict equality for other types
      }));
    }
  }, [currentFilter, initialData]);

  return (
    <Fragment>
      <RowBox sx={{mt: 2, mb: 1, maxHeight: '30px'}}>
        <RowBox sx={{display: 'flex', alignItems: 'center', marginRight: 'auto'}}>
          {filters?.map((filter, index) => (
            <Fragment key={index}>
              {(index > 0) && (
                <Divider variant="middle" orientation="vertical" flexItem />
              )}
              <Link onClick={() => onFilterSelectedHandler(filter)}>
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
                ( isString(column) ?
                  <TableCell
                    key={column}>
                    {column}
                  </TableCell> :
                  ( (column.show ?? true ) &&
                    <TableCell 
                      key={column.id} 
                      align={column.textAlign ?? 'left'}
                      width={column.width}>
                      {column.name}
                    </TableCell>
                  )
                )
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
                    ( isString(column) ?
                      <TableCell key={column}>
                        {
                          (typeof row[column] === 'boolean') ? 
                            (row[column]) ? 'Yes' : 'No' :
                            row[column]
                        }
                      </TableCell> :
                      ( (column.show ?? true ) &&
                        <TableCell 
                          key={column.id} 
                          align={column.textAlign}>
                          {
                            (typeof row[column.id] === 'boolean') ? 
                              column.dataMap?.[row[column.id]?.toString() ?? ''] ?? row[column.id]?.toString() :
                              row[column.id]
                          }
                        </TableCell>
                      )
                    )
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
