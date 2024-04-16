import style from "./competition.form.field.module.css";
import DataTable, { Media } from "react-data-table-component";
import Loader from "../loader/loader";
import Pagination from "../shared/pagination/pagination.component";
import { useState } from "react";
import { competitionResultTableStyle } from "../shared/table/default.table.style";
import { BadgeCell } from "../shared/dropdown/cell.style";

interface CompetitionFieldsProps {
  fieldsIsDisabled: boolean;
  competitionResultData: CompetitionForm;
}
export interface CompetitionForm {
  _id: string;
  TaskDetails: [];
  finishedTasksNumber: number;
  totalTasksNumber: number;
}

export const CompetitionFormFields: React.FC<CompetitionFieldsProps> = ({
  fieldsIsDisabled,
  competitionResultData,
}) => {
  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<any[] | []>([]);

  const competitionColumn = [
    {
      name: "Nom",
      selector: (row: any) => row?.name,
      sortable: true,
      cell: (row: any, index: number) => {
        return (
          <span>
            {index}-{row?.name}
          </span>
        );
      },
    },
    {
      name: "Catégorie",
      selector: (row: any) => row?.category,
      sortable: true,
      hide: Media.MD || Media.SM,
    },
    {
      name: "Nombre d’essais",
      selector: (row: any) => row?.tryNumber,
      sortable: true,
      center: true,
      hide: Media.MD || Media.SM,
    },
    {
      name: "Statut",
      selector: (row: any) => row?.status,
      sortable: true,
      center: true,
      hide: Media.SM,
      cell: (row: any) => {
        const status = row?.status;
        switch (status) {
          case "FINISHED":
            return (
              <BadgeCell bg="#2ba449" color="#fff">
                Terminé
              </BadgeCell>
            );
          case "IN_PROCESS":
            return (
              <BadgeCell bg="#d6f2ff" color="#0fc3ed">
                En cours
              </BadgeCell>
            );
          case "NOT_FINISHED":
            return (
              <BadgeCell bg="#FFD1D9" color="#D35151">
                Non terminé
              </BadgeCell>
            );
          default:
            return (
              <BadgeCell bg="#ddd" color="#808080">
                En traitement
              </BadgeCell>
            );
        }
      },
    },
    {
      name: "Date d’entrée",
      selector: (row: any) => row?.date,
      sortable: true,
      right: true,
      hide: Media.MD || Media.SM,
    },
  ];

  const data = [
    {
      id: "id1",
      name: "L’instruction if",
      category: "Structures conditionnelles",
      tryNumber: 2,
      status: "FINISHED",
      date: "2023-10-30",
    },
    {
      id: "id2",
      name: "L’instruction if-else",
      category: "Structures conditionnelles",
      tryNumber: 2,
      status: "FINISHED",
      date: "2023-10-30",
    },
    {
      id: "id3",
      name: "L’instruction if-elsif-else",
      category: "Structures conditionnelles",
      tryNumber: 4,
      status: "NOT_FINISHED",
      date: "2023-10-30",
    },
    {
      id: "id4",
      name: "Vérification d’égalité",
      category: "Structures conditionnelles",
      tryNumber: 2,
      status: "FINISHED",
      date: "2023-10-30",
    },
    {
      id: "id5",
      name: "Catégorie d’âge",
      category: "Structures conditionnelles",
      tryNumber: 2,
      status: "FINISHED",
      date: "2023-10-30",
    },
    {
      id: "id6",
      name: "Bagages",
      category: "Structures conditionnelles",
      tryNumber: 3,
      status: "IN_PROCESS",
      date: "2023-10-30",
    },
    {
      id: "id7",
      name: "Vérification de la valeur",
      category: "Structures conditionnelles",
      tryNumber: 1,
      status: "FINISHED",
      date: "2023-10-30",
    },
  ];

  const handleChangePage = (currentPageNumber: any) => {
    setCurrentPageNumberPage(currentPageNumber);
  };

  // Fonction qui attribue la nombre d'element par page
  const handleChangeRowPerPage = (rowPerPage: any) => {
    setRowPerPage(rowPerPage);
  };

  const handleSelectedRows = ({ selectedRows }: any) => {
    setSelectedData(selectedRows);
  };

  return (
    <div className={style.formContainer}>
      <div className={style.table}>
        <DataTable
          columns={competitionColumn}
          data={data}
          fixedHeader
          persistTableHead
          noDataComponent={"Aucune Donnée... "}
          fixedHeaderScrollHeight="auto"
          highlightOnHover
          onSelectedRowsChange={handleSelectedRows}
          customStyles={competitionResultTableStyle}
          pagination
          paginationServer
          responsive={true}
          progressComponent={<Loader />}
          paginationComponent={() => (
            <Pagination
              paginationProps={{
                currentPage: currentPageNumber,
                onChangePage: handleChangePage,
                tableTotalRows: totalRows,
                onChangeRowsPerPage: handleChangeRowPerPage,
                totalPages: totalPage,
                totalRowPerPage: rowPerPage,
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default CompetitionFormFields;
