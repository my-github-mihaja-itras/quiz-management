import DataTable, { TableColumn } from "react-data-table-component";
import style from "./sessionTab.module.css";
import { historyTableStyle } from "../table/default.table.style";
import { api } from "@/cores/constant/constant.resource.api";
import UseWindowSize from "@/cores/window/window.size";
import { AddButton } from "@/components/button/add-btn";
import IconAdd from "../icons/iconAdd";
import Loader from "@/components/loader/loader";

interface HistoryProps {
  columns: TableColumn<any>[] | any[];
  fixedHeaderScrollHeight?: string;
  data: any[];
  onAddButtonChange?: any;
  noDataMessage?: string;
  hasSortDate?: boolean;
  title?: string;
  isLoading?: boolean;
}
const SessionTab: React.FC<HistoryProps> = ({
  columns,
  data,
  fixedHeaderScrollHeight,
  onAddButtonChange,
  noDataMessage,
  hasSortDate = true,
  isLoading,
  title,
}) => {
  const screenSize = UseWindowSize();
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>{title ? title : "Séances"} </div>
        <div className={style.addButton}>
          {onAddButtonChange && (
            <button type="button" onClick={onAddButtonChange}>
              <IconAdd /> {screenSize.width < 736 ? "" : "Ajouter"}
            </button>
          )}
        </div>
      </div>
      <div className={style.table}>
        <DataTable
          columns={columns}
          data={data}
          defaultSortAsc={false}
          defaultSortFieldId={"1"}
          customStyles={historyTableStyle}
          responsive={true}
          striped
          fixedHeader
          persistTableHead
          progressPending={isLoading}
          progressComponent={<Loader />}
          noDataComponent={
            <NoDataComponent
              message={
                noDataMessage
                  ? noDataMessage
                  : "Aucune donnée séance disponible"
              }
            />
          }
          fixedHeaderScrollHeight={fixedHeaderScrollHeight || "75vh"}
        />
      </div>
    </div>
  );
};

export default SessionTab;

export interface NoDataComponentProps {
  message?: string;
}

export const NoDataComponent: React.FC<NoDataComponentProps> = ({
  message,
}) => {
  return (
    <div className={style.noDataStyle}>
      <span>{message}</span>
    </div>
  );
};
