import style from "@/components/shared/pagination/pagination.module.css";
import IconFirstPage from "../icons/iconFirstPage";
import IconPrev from "../icons/iconPrev";
import IconNext from "../icons/iconNext";
import IconLastPage from "../icons/iconLastPage";
const Pagination = ({
  paginationProps: {
    currentPage,
    onChangePage,
    tableTotalRows,
    onChangeRowsPerPage,
    totalPages,
    totalRowPerPage,
  },
}: any) => {
  const handleRowsPerPageChange = (e: any) => {
    onChangeRowsPerPage(parseInt(e.target.value, 10));
    if (totalRowPerPage === parseInt(e.target.value, 10)) {
      onChangePage(1);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.compteur}>{tableTotalRows} résultats</div>
      <div className={style.pagination}>
        <div className={style.paginationNumber}>
          <span>Page:</span>
          <span className={style.active}>{currentPage}</span>sur{" "}
          <span className={style.all}>{totalPages}</span>
        </div>
        <div className={style.paginationButton}>
          <button
            onClick={() => onChangePage(1)}
            disabled={currentPage === 1}
            // style={{ paddingLeft: "10px" }}
          >
            <IconFirstPage />
          </button>
          <button
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={style.paginationButtonCenter}
          >
            <IconPrev />
          </button>
          <button
            onClick={() => onChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={style.paginationButtonCenter}
          >
            <IconNext />
          </button>
          <button
            onClick={() => onChangePage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <IconLastPage />
          </button>
        </div>
        <div className={style.paginationDropdown}>
          <select value={totalRowPerPage} onChange={handleRowsPerPageChange}>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={tableTotalRows}>Tous</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
