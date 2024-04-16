import DataTable, { TableColumn } from "react-data-table-component";
import style from "./history.module.css";

import { historyTableStyle } from "../table/default.table.style";
import { api } from "@/cores/constant/constant.resource.api";
import UseWindowSize from "@/cores/window/window.size";
import Image from "next/image";

interface HistoryProps {
  columns: TableColumn<any>[] | any[];
  data: any[];
  minHeight: string;
}
const History: React.FC<HistoryProps> = ({ columns, data, minHeight }) => {
  const screenSize = UseWindowSize();

  return (
    <div className={style.container}>
      <div className={style.header}>Historique</div>
      <div className={style.table}>
        <DataTable
          columns={columns}
          data={data}
          customStyles={historyTableStyle}
          responsive={true}
          noTableHead={screenSize.width < 736 ? true : false}
          fixedHeader
          persistTableHead
          noDataComponent={<NoDataComponent />}
          fixedHeaderScrollHeight={minHeight}
        />
      </div>
    </div>
  );
};

export default History;

interface HistoryUserProps {
  photo: string;
  name: string;
}

export const HistoryUser: React.FC<HistoryUserProps> = ({ photo, name }) => {
  return (
    <div className={style.userProfile}>
      <Image
        src={`${api.image.profile}/${photo}`}
        alt="Photo de profile"
        unoptimized
        className={style.userPhoto}
        width={24}
        height={24}
        objectFit="cover"
      />
      <div className={style.name}> {name}</div>
    </div>
  );
};

export const NoDataComponent = () => {
  return (
    <div className={style.noDataStyle}>
      <span>Aucune donnée historique disponible</span>
    </div>
  );
};
