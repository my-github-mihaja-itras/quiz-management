import DataTable, { TableColumn } from "react-data-table-component";
import style from "./seanceTab.module.css";

import { historyTableStyle } from "../table/default.table.style";
import UseWindowSize from "@/cores/window/window.size";

interface HistoryProps {
  columns: TableColumn<any>[] | any[];
  data: any[];
}
const SeanceTab: React.FC<HistoryProps> = ({ columns, data }) => {
  const screenSize = UseWindowSize();

  return (
    <div className={style.container}>
      <div className={style.header}>Cours Obligatoires</div>
      <div className={style.table}>
        <DataTable
          columns={columns}
          data={data}
          defaultSortFieldId={"1"}
          customStyles={historyTableStyle}
          responsive={true}
          striped
          // noTableHead={screenSize.width < 736 ? true : false}
          fixedHeader
          persistTableHead
          noDataComponent={<NoDataComponent />}
          fixedHeaderScrollHeight="75vh"
        />
      </div>
    </div>
  );
};

export default SeanceTab;

export const NoDataComponent = () => {
  return (
    <div className={style.noDataStyle}>
      <span>Aucune donnée séance disponible</span>
    </div>
  );
};
