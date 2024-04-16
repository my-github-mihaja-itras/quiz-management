import DataTable, { TableColumn } from "react-data-table-component";
import style from "./courseTab.module.css";
import { defaultTableStyle } from "../table/default.table.style";
import UseWindowSize from "@/cores/window/window.size";

interface CourseProps {
  columns: TableColumn<any>[] | any;
  data: any[];
  isExamResult?:boolean
}
const CourseTab: React.FC<CourseProps> = ({ columns, data,isExamResult }) => {
  const screenSize = UseWindowSize();

  return (
    <div className={style.container} style={isExamResult ? {height:"87vh"} : {height:"40vh"}}>
      <div className={style.header}>{isExamResult ? "Résultat": "Cours"}</div>
      <div className={style.table}>
        <DataTable
          columns={columns}
          data={data}
          defaultSortFieldId={"1"}
          customStyles={defaultTableStyle}
          // customStyles={customTableStyle}
          striped
          responsive={true}
          // noTableHead={screenSize.width < 736 ? true : false}
          fixedHeader
          persistTableHead
          noDataComponent={<NoDataComponent />}
          fixedHeaderScrollHeight={isExamResult ? "87vh": "30vh"}
        />
      </div>
    </div>
  );
};

export default CourseTab;

export const NoDataComponent = () => {
  return (
    <div className={style.noDataStyle}>
      <span>Aucune donnée cours disponible</span>
    </div>
  );
};
