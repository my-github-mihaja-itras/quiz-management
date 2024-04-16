import DataTable, { Direction, TableColumn } from "react-data-table-component";
import style from "./eventList.module.css";
import {
  eventTableStyle,
  historyTableStyle,
} from "../table/default.table.style";
import { useState } from "react";
import { SchoolEvent } from "@/services/events/event.interface";
import IconCareDown from "../icons/iconCaretDown";
import IconActive from "../icons/iconActive";
import { formatEventType } from "./eventList.constant";
import IconArrowDown from "../icons/iconArrowDown";
import IconArrowLeft from "../icons/iconArrowLeft";
import {
  formatDateToLocal,
  getTime,
  isoDateStringToDate,
} from "@/utils/date.utils";

interface EventListProps {
  columns: TableColumn<any>[] | any[];
  fixedHeaderScrollHeight?: string;
  data: any[];
}
const EventList: React.FC<EventListProps> = ({
  columns,
  data,
  fixedHeaderScrollHeight,
}) => {
  const [currentRow, setCurrentRow] = useState(null);

  const ExpandedComponent: React.FC<any> = () => {
    const rowData: SchoolEvent = currentRow as any;
    const startDate = new Date(rowData.startDate).toISOString();
    const endDate = new Date(rowData.endDate).toISOString();

    return (
      <div className={style.expandedContainer}>
        <div className={style.expandedContent}>
          <h3 className={style.expandedTitle}>{rowData?.name.toUpperCase()}</h3>
          <div className={style.expandedType}>
            <strong>{formatEventType(rowData?.type)}</strong>{" "}
            <span>
              du {formatDateToLocal(startDate)}{" "}
              {rowData?.startDate && `a ${getTime(rowData?.startDate)}`} au{" "}
              {formatDateToLocal(endDate)}{" "}
              {rowData?.endDate && `a ${getTime(rowData?.endDate)}`}
            </span>
          </div>

          <div className={style.expandedDesc}>
            <br />
            <p>{rowData?.description} </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={style.container}>
      <div className={style.header}>Agenda</div>
      <div className={style.table}>
        <DataTable
          columns={columns}
          data={data}
          defaultSortFieldId={"2"}
          customStyles={eventTableStyle}
          responsive={true}
          fixedHeader
          persistTableHead
          noDataComponent={<NoDataComponent />}
          fixedHeaderScrollHeight={fixedHeaderScrollHeight || "75vh"}
          expandableRows
          expandableIcon={{
            collapsed: <IconArrowLeft />,
            expanded: <IconArrowDown />,
          }}
          expandableRowsComponent={ExpandedComponent}
          expandableRowsComponentProps={{ data }}
          expandableRowExpanded={(row) => row === currentRow}
          expandOnRowClicked
          onRowClicked={(row) => setCurrentRow(row)}
          onRowExpandToggled={(bool, row) => setCurrentRow(row)}
          direction={Direction.AUTO}
        />
      </div>
    </div>
  );
};

export default EventList;

export const NoDataComponent = () => {
  return (
    <div className={style.noDataStyle}>
      <span>Aucune donnée séance disponible</span>
    </div>
  );
};
