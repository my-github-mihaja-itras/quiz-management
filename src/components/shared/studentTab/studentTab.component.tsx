import DataTable, { TableColumn } from "react-data-table-component";
import style from "./studentTab.module.css";
import { historyTableStyle } from "../table/default.table.style";
import UseWindowSize from "@/cores/window/window.size";

interface StudentTabProps {
  columns: TableColumn<any>[] | any;
  data: any[];
}
const StudentTab: React.FC<StudentTabProps> = ({ columns, data }) => {
  return (
    <div className={style.container}>
      <div className={style.header}>Étudiants</div>
      <div className={style.table}>
        <DataTable
          columns={columns}
          data={data}
          defaultSortFieldId={"1"}
          customStyles={historyTableStyle}
          responsive={true}
          fixedHeader
          dense
          striped
          persistTableHead
          noDataComponent={<NoDataComponent />}
          fixedHeaderScrollHeight="75vh"
        />
      </div>
      <div className={style.footer}>Total: {data.length}</div>
    </div>
  );
};

export default StudentTab;

export const NoDataComponent = () => {
  return (
    <div className={style.noDataStyle}>
      <span>Aucune étudiants inscrits</span>
    </div>
  );
};
