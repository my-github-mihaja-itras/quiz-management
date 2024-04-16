import List from "../liste/list.component";
import Filter from "../filter/filter.component";
import style from "@/components/shared/liste-section/list.section.module.css";
import DataTable, { TableColumn } from "react-data-table-component";
import react, { useEffect, useState } from "react";
import IconSearch from "../icons/iconSearch";
import IconDownload from "../icons/iconDownload";
import IconAdd from "../icons/iconAdd";
import {
  convertArrayOfObjectsToCSV,
  downloadCSV,
} from "@/cores/tableConstants/csv.export.function";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/loader";
import Pagination from "../pagination/pagination.component";
import IconFilter from "../icons/iconFilter";
import useWindowSize from "@/cores/window/window.size";
import { defaultTableStyle } from "../table/default.table.style";
import React from "react";
import { ChoiceFilterType, DateFilterType } from "../filter/filter.constant";

interface ListSectionProps<T> {
  listeTitle: string;
  tableColumns: TableColumn<T>[] | any;
  tableData: any[];
  tableTotalRows: number;
  handlePageNumberChange: any;
  handleRowPerPageNumberChange: any;
  filterFunction?: (data: any[], searchTerm: string) => any[];
  currentPageNumber: number;
  totalRowPerPage: number;
  hasAddButton: boolean;
  hasFilter: boolean;
  choiceFilterOption?: ChoiceFilterType[];
  dateFilterOption?: DateFilterType[];
  hasChoiceFilter: boolean;
  hasDateFilter: boolean;
  conditionalFilter?: (data: any[], item: string) => any;
  redirectLink?: string;
  isLoading: boolean;
  totalPageNumber: number;
  allDataToExport: any[];
  handleFilterKeywordsChange?: any;
  handleSearchKeywordsChange: any;
  exportDataFormatter?: any;
}

const ListSection: React.FC<ListSectionProps<any>> = ({
  listeTitle,
  tableColumns,
  tableData,
  tableTotalRows,
  handlePageNumberChange: handleChangePageNumber,
  handleRowPerPageNumberChange: handleChangeRowPerPageNumber,
  currentPageNumber,
  totalRowPerPage,
  hasAddButton: haveAddButton = false,
  hasFilter: haveFilter,
  choiceFilterOption,
  dateFilterOption,
  hasChoiceFilter: haveChoiceFilter,
  hasDateFilter: haveDateFilter,
  conditionalFilter,
  redirectLink,
  isLoading: isLoading,
  totalPageNumber: totalPage,
  allDataToExport,
  handleFilterKeywordsChange,
  handleSearchKeywordsChange,
  exportDataFormatter,
}) => {
  const [keywords, setKeyword] = useState<string>("");

  const [selectedData, setSelectedData] = useState<any[] | []>([]);

  const [filterIsShowing, setFilterIsShowing] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    handleSearchKeywordsChange(keyword);
    setKeyword(keyword);
  };

  const handleSearchWithButton = () => {
    handleSearchKeywordsChange(keywords);
  };

  const handleSelectedRows = ({ selectedRows }: any) => {
    setSelectedData(selectedRows);
  };

  const formatData = <T extends Record<string, any>>(data: T[]): T[] => {
    console.log("BEFORE=", data);

    const processItem = (item: any): any => {
      if (Array.isArray(item)) {
        // Si l'élément est un tableau, traiter chaque élément récursivement
        return item.map((element) => processItem(element));
      } else if (typeof item === "object" && item !== null) {
        // Si l'élément est un objet, traiter ses propriétés récursivement
        const formattedObject: Record<string, any> = {};

        Object.entries(item).forEach(([key, value]) => {
          // Si la valeur est un tableau d'objets, traiter chaque objet du tableau récursivement
          if (
            Array.isArray(value) &&
            value.length > 0 &&
            typeof value[0] === "object"
          ) {
            formattedObject[key] = value.map((obj: any) => processItem(obj));
          } else {
            // Si la valeur est un objet ou une autre valeur, traiter récursivement
            formattedObject[key] = processItem(value);
          }
        });

        return formattedObject;
      }

      // Si l'élément n'est ni un tableau ni un objet, le retourner tel quel
      return item;
    };

    const processedData = data.map((item) => processItem(item)) as T[];

    if (exportDataFormatter) {
      return processedData.map((item) => exportDataFormatter(item));
    }

    return processedData;
  };

  const handleExport = () => {
    const transformedDataSelected = formatData(selectedData);
    const transformedAllData = formatData(allDataToExport);

    if (selectedData?.length > 0) {
      const csv = convertArrayOfObjectsToCSV(
        transformedDataSelected,
        tableColumns
      );

      downloadCSV(csv);
    } else {
      const csv = convertArrayOfObjectsToCSV(transformedAllData, tableColumns);
      downloadCSV(csv);
    }
  };

  const handleFilter = () => {
    setFilterIsShowing(!filterIsShowing);
  };

  const handleClose = (res: any) => {
    setFilterIsShowing(res);
  };
  return (
    <section className={style.container}>
      <List title={listeTitle}>
        <div className={style.content}>
          <div className={style.header}>
            <HeaderList
              handleSearch={handleSearch}
              handleSearchWithButton={handleSearchWithButton}
              handleExport={handleExport}
              handleFilter={handleFilter}
              haveAddButton={haveAddButton}
              noDataToExport={selectedData.length === 0 ? true : false}
              redirectLink={redirectLink}
              haveFilter={haveFilter}
            />
          </div>
          <div className={style.table}>
            <DataTable
              columns={tableColumns}
              data={tableData}
              selectableRows
              fixedHeader
              persistTableHead
              noDataComponent={"Aucune Donnée... "}
              fixedHeaderScrollHeight="auto"
              highlightOnHover
              onSelectedRowsChange={handleSelectedRows}
              customStyles={defaultTableStyle}
              // pagination
              paginationServer
              responsive={true}
              progressPending={isLoading}
              progressComponent={<Loader />}
            />
            <Pagination
              paginationProps={{
                currentPage: currentPageNumber,
                onChangePage: handleChangePageNumber,
                tableTotalRows,
                onChangeRowsPerPage: handleChangeRowPerPageNumber,
                totalPages: totalPage,
                totalRowPerPage: totalRowPerPage,
              }}
            />
          </div>
        </div>
      </List>
      {filterIsShowing && (
        <Filter
          choiceFilterOption={choiceFilterOption || []}
          dateFilterOption={dateFilterOption || []}
          onChangeFilter={handleFilterKeywordsChange}
          haveChoiceFilter={haveChoiceFilter}
          haveDateFilter={haveDateFilter}
          handleClose={handleClose}
        />
      )}
    </section>
  );
};

export default ListSection;

interface HeaderListProps {
  handleSearch: any;
  handleSearchWithButton: any;
  handleExport: any;
  handleFilter: any;
  haveAddButton: boolean;
  haveFilter: boolean;
  noDataToExport: boolean;
  redirectLink?: string;
}
export const HeaderList: React.FC<HeaderListProps> = ({
  handleSearch,
  handleSearchWithButton,
  handleExport,
  handleFilter,
  haveAddButton = true,
  haveFilter = true,
  noDataToExport = true,
  redirectLink = "",
}) => {
  const router = useRouter();
  const handleAdd = () => {
    router.push(redirectLink);
  };

  const screenSize = useWindowSize();

  return (
    <>
      <div className={style.tableHeaderLeft}>
        <div className={style.tableSearch}>
          <input type="text" onChange={handleSearch} placeholder="Rechercher" />
          {screenSize.width < 736 ? (
            ""
          ) : (
            <div
              className={style.tableSearchBtn}
              onClick={handleSearchWithButton}
            >
              <IconSearch />
            </div>
          )}
        </div>
      </div>
      <div className={style.tableHeaderRight}>
        {haveFilter && (
          <div className={style.tableFilter}>
            <button onClick={handleFilter} disabled={false} type="button">
              <IconFilter /> {screenSize.width < 736 ? "" : "Filtrer"}
            </button>
          </div>
        )}
        <div className={style.tableExport}>
          <button onClick={handleExport} disabled={false} type="button">
            <IconDownload />
            {screenSize.width < 736 ? "" : "Exporter"}
          </button>
        </div>
        {haveAddButton && (
          <div className={style.tableAdd}>
            <button type="button" onClick={() => handleAdd()}>
              <IconAdd /> {screenSize.width < 736 ? "" : "Ajouter"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
