export interface IDataRow {
  [key: string]: string|number;
}

export interface ITableFilter {
  name: string,
  field: string,
  value: string,
}

export type TRowAction = (row: IDataRow) => void
export type TAction = () => void;

export interface IAction {
  label: string,
  action: TAction | TRowAction
}

export interface ITableBuidleProps {
  data: IDataRow[]
  filters?: ITableFilter[]
  actions?: IAction[]
  paginationOption: {
    page: number,
    rowsPerPage: number,
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void
    handleChangeRowsPerPage: () => void
  }
}
