export interface IDataRow {
  [key: string]: string|number;
}

export interface ITableFilter {
  name: string,
  field: string,
  value: string,
}

export type TNoneAction = () => void;
export type TRowAction = (row: IDataRow) => void
export type TRowsAction = (rows: IDataRow[]) => void

export type TAction =
  | { label: string; actionType: 'none'; action: TNoneAction }
  | { label: string; actionType: 'row'; action: TRowAction }
  | { label: string; actionType: 'rows'; action: TRowsAction };

export interface ITableBuidleProps {
  data: IDataRow[]
  filters?: ITableFilter[]
  actions?: TAction[]
  paginationOption: {
    page: number,
    rowsPerPage: number,
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void
    handleChangeRowsPerPage: () => void
  }
}
