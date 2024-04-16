"use client";

import { defaultTableStyle } from "./default.table.style";
import DataTable, { Media, Selector, createTheme } from "react-data-table-component";
import IconFirstPage from "../icons/iconFirstPage";
import IconPrev from "../icons/iconPrev";
import IconNext from "../icons/iconNext";
import IconLastPage from "../icons/iconLastPage";
import { CSSObject } from "@emotion/styled";

export interface ConditionalStyles<T> {
  when: (row: T) => boolean;
  style?: CSSObject | ((row: T) => CSSObject);
  classNames?: string[];
}

export type TableColumnBase = {
  allowOverflow?: boolean;
  button?: boolean;
  center?: boolean;
  compact?: boolean;
  reorder?: boolean;
  grow?: number;
  hide?: number | ((value: number) => CSSObject) | Media;
  id?: string | number;
  ignoreRowClick?: boolean;
  maxWidth?: string;
  minWidth?: string;
  name?: string | number | React.ReactNode;
  omit?: boolean;
  right?: boolean;
  sortable?: boolean;
  style?: CSSObject;
  width?: string;
  wrap?: boolean;
};
export interface TableColumn<T> extends TableColumnBase {
  name?: string | number | React.ReactNode;
  sortField?: string;
  cell?: (
    row: T,
    rowIndex: number,
    column: TableColumn<T>,
    id: string | number
  ) => React.ReactNode;
  conditionalCellStyles?: ConditionalStyles<T>[];
  format?: any | undefined;
  selector?: Selector<T>;
  sortFunction?: any;
}

export interface Add {
  formUrl: string;
}
export interface TableProps<T> {
  title?: string;
  columns: TableColumn<T>[];
  isLoading?: boolean;
  data: any[];
  detailLink?: string;
  filterFunction?: (data: any[], searchTerm: string) => any[];
  addButton?: Add | null;
  handleOpenForm?: ((isOpen: boolean) => void) | undefined;
  totalRows: number;
  onChangePage: any;
  onChangeRowPerPage: any;
}

const TableComponent: React.FC<TableProps<any>> = ({
  title,
  columns,
  isLoading,
  data,
  filterFunction,
  addButton,
  handleOpenForm,
  totalRows,
  onChangePage,
  onChangeRowPerPage,
}) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      theme="custom"
      selectableRows
      fixedHeader
      highlightOnHover
      customStyles={defaultTableStyle}
      pagination
      paginationTotalRows={totalRows}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowPerPage}
      paginationIconFirstPage={<IconFirstPage />}
      paginationIconPrevious={<IconPrev />}
      paginationIconNext={<IconNext />}
      responsive={true}
      paginationIconLastPage={<IconLastPage />}
      paginationComponent={CustomPagination}
    />
  );
};

export default TableComponent;

const CustomPagination = ({
  rowsPerPage,
  rowCount,
  currentPage,
  onChangePage,
}: any) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);

  return (
    <div>
      {`Page ${currentPage} sur ${totalPages}`}
      <button
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      <button
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};
