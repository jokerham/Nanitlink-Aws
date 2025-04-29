export interface IDataColumns {
  id: string,
  name: string,
  show?: boolean,
  textAlign?: 'left' | 'center' | 'right',
  width?: number
  dataMap?: { [key: string]: string },
}

export interface IDataRow {
  [key: string]: string|number|boolean|undefined;
}

export interface ITableFilter {
  name: string,
  field: string,
  value: any,
}

export type TNoneAction = () => void;
export type TRowAction = (row: IDataRow) => void
export type TRowsAction = (rows: IDataRow[]) => void

export type TAction =
  | { label: string; actionType: 'none'; action: TNoneAction }
  | { label: string; actionType: 'row'; action: TRowAction }
  | { label: string; actionType: 'rows'; action: TRowsAction };

export type TPaginationOption = {
  enable?: boolean
  page: number,
  rowsPerPage: number,
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void
  handleChangeRowsPerPage: () => void
}

export interface ITableBuidleProps {
  columns?: IDataColumns[]
  loading: boolean
  data: IDataRow[]
  filters?: ITableFilter[]
  actions?: TAction[]
  paginationOption: TPaginationOption
}
