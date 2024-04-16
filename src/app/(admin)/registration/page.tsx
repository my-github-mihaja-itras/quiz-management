"use client";

import ConfirmModal from "@/components/modal/confirmModal";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import IconDelete from "@/components/shared/icons/iconDelete";
import IconEdit from "@/components/shared/icons/iconEdit";
import ListSection from "@/components/shared/liste-section/listSection.component";
import {
  candidateDateFilterOptionConstant,
  candidateFilterByItem,
  translateStatus,
} from "@/cores/filterConstants/candidate.constant";
import {
  DeleteCandidateById,
  getCandidatePaginated,
  getStatusCount,
} from "@/services/candidate/candidate-service";
import { getDate, getTime, isoDateStringToDate } from "@/utils/date.utils";
import { useRouter } from "next/navigation";
import { Media } from "react-data-table-component";
import { useContext, useEffect, useState } from "react";
import {
  FilterKeywords,
  ParsedType,
} from "@/components/shared/filter/filter.constant";
import { CountextType, Privileges } from "@/context/privileges.context";
import { getAllRoles } from "@/services/role/role.service";
import { CandidateType } from "@/services/candidate/candidate-models";

const CandidateList = () => {
  // State for pagination
  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);

  // State pour les données a insérer dans la table
  const [candidateData, setCandidateData] = useState<CandidateType[]>([]);
  const [allCandidateData, setAllCandidateData] = useState<CandidateType[]>([]);

  const [status, setStatus] = useState<any[]>([]);
  // const [updatedFilter, setUpdatedFilter] = useState(candidateFilterConstant);

  // context that store the privileges values
  const { privilegesContext, setPrivilegesContext }: CountextType =
    useContext(Privileges);

  ///
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [message, setMessage] = useState<{}>({});

  const router = useRouter();

  const filter = "REQUEST_ACCEPTED";

  //Filter Keywords
  const [filterKeywords, setFilterKeywords] = useState<FilterKeywords[]>([]);

  //Search Keywords
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  /**
   * Fonction qui recharge les données du server
   */
  const fetchData = async () => {
    const roleRes = await getAllRoles();
    const candidatRole = roleRes.data
      .filter((role: { name: string }) => role.name === "Candidat")
      .map((role: { _id: any }) => role._id);

    setisLoading(true);
    let filterForm: FilterKeywords[] = [
      {
        category: "",
        key: "",
        value: undefined,
        type: ParsedType.LIST,
      },
    ];

    if (filter.length > 0) {
      filterForm = [
        {
          category: "Status",
          key: "applicationStatus",
          value: filter,
          type: ParsedType.LIST,
        },
        {
          category: "Roles",
          key: "user.roles",
          value: candidatRole,
          type: ParsedType.LIST,
        },
        // updateFiltersConstant(roles, "Rôles", "roles.name", ParsedType.LIST};
      ];
    }

    const res = await getCandidatePaginated(
      currentPageNumber,
      rowPerPage,
      filter.length > 0 ? filterForm : filterKeywords,
      searchKeywords
    );

    const totalItems = res.data.data.totalItems;
    const totalPage = res.data.data.pageNumber;
    setTotalRows(totalItems);
    setTotalPage(totalPage);

    setAllCandidateData(res.data.data.items);

    const candidateData: CandidateType[] = res.data.data.items;
    setCandidateData(candidateData);
    setisLoading(false);
  };

  const loadApplicationStatus = async () => {
    const status = await getStatusCount();
    setStatus(status.data.data.items);
    setisLoading(false);
  };

  useEffect(() => {
    fetchData();
    loadApplicationStatus();
  }, [currentPageNumber, rowPerPage, filterKeywords, searchKeywords]);

  // Fonction qui attribue le numero de page
  const handleChangePage = (currentPageNumber: any) => {
    setCurrentPageNumberPage(currentPageNumber);
  };

  // Fonction qui attribue la nombre d'element par page
  const handleChangeRowPerPage = (rowPerPage: any) => {
    setRowPerPage(rowPerPage);
    if (rowPerPage === totalRows) {
      setCurrentPageNumberPage(1);
    }
  };

  const handleChangeFilter = (keywordsList: any) => {
    setFilterKeywords(keywordsList);
  };

  // Extract keywords for search
  const handleSearchKeywordsChange = (keywords: any) => {
    setSearchKeywords(keywords);
  };

  const candidateColumns = [
    {
      name: "Identifiant",
      selector: (row: CandidateType) => row?.user?.username,
      sortable: true,
      maxWidth: "80px",
    },
    {
      name: "Nom",
      selector: (row: CandidateType) => row?.user?.lastname,
      sortable: true,
      hide: Media.SM,
    },
    {
      name: "Prénom(s)",
      selector: (row: CandidateType) => row?.user?.firstname,
      sortable: true,
      hide: Media.MD || Media.SM,
    },

    {
      name: "Statut",
      selector: (row: CandidateType) => row?.applicationStatus,
      sortable: true,
      minWidth: "160px",
      style: {
        padding: "0 10px",
      },

      cell: (row: CandidateType) => {
        const status = row?.applicationStatus;
        return translateStatus(status);
      },
    },
    {
      name: "Date entrée",
      selector: (row: CandidateType) => row?.createdAt,
      sortable: true,
      hide: Media.MD || Media.SM,
      width: "150px",
      cell: (row: any) => {
        const date = getDate(row?.createdAt);
        const time = getTime(row?.createdAt);

        return (
          <div>
            {date} <span style={{ color: "#B4B4B4" }}> {time} </span>
          </div>
        );
      },
    },
    {
      name: "Date modification",
      selector: (row: CandidateType) => row?.updatedAt,
      sortable: true,
      hide: Media.MD || Media.SM,
      right: true,
      width: "150px",

      cell: (row: any) => {
        const date = getDate(row?.updatedAt);
        const time = getTime(row?.updatedAt);

        return (
          <div>
            {date} <span style={{ color: "#B4B4B4" }}> {time} </span>
          </div>
        );
      },
    },
    {
      name: "",
      button: true,
      allowOverflow: true,
      width: "5%",
      center: true,
      cell: (row: CandidateType) => {
        function handleEdit(_id: string): void {
          router.push("/registration/" + _id);
        }

        function handleDelete(_id: string): void {
          setIsOpen(true);
          setMessage({
            title: "Confirmation",
            message: "Voulez vous vraiment supprimer ce candidat",
            confirmText: "Confirmer",
            id: _id,
          });
        }

        const [openDropdownId, setOpenDropdownId] = useState(null);
        const handleToggleDropdown = (id: any) => {
          setOpenDropdownId((prevId) => (prevId === id ? null : id));
        };

        return (
          <div>
            <Dropdown
              id={row?._id}
              key={row?._id}
              isOpen={openDropdownId === row?._id}
              onToggle={handleToggleDropdown}
            >
              <button onClick={() => handleEdit(row?._id)}>
                <IconEdit /> <span style={{ color: "#0231A8" }}>Consulter</span>
              </button>

              {privilegesContext.delete_application ? (
                <button
                  onClick={() => {
                    handleDelete(row?._id);
                  }}
                >
                  <IconDelete />{" "}
                  <span style={{ color: "#D35151" }}>Supprimer</span>
                </button>
              ) : (
                <></>
              )}
            </Dropdown>
          </div>
        );
      },
    },
  ];
  const handleConfirmation = async (id: string) => {
    setisLoading(true);
    const response = await DeleteCandidateById(id);

    if (response.status === 200) {
      window.location.reload();
      setIsOpen(false);
      setisLoading(false);
    } else {
      setIsOpen(false);
      setisLoading(false);
    }
  };
  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  // fonction spécifique pour les données a formater
  const formatFunctionToExportData = (item: any): any => {
    return {
      ...item,
      createdAt: isoDateStringToDate(item.createdAt),
      updatedAt: isoDateStringToDate(item.updatedAt),
    };
  };
  return (
    <>
      {isOpen && (
        <ConfirmModal
          close={closeModal}
          message={message}
          handleConfirmation={handleConfirmation}
        />
      )}
      <ListSection
        listeTitle="Candidats Admis"
        tableColumns={candidateColumns}
        tableData={candidateData}
        tableTotalRows={totalRows}
        handlePageNumberChange={handleChangePage}
        handleRowPerPageNumberChange={handleChangeRowPerPage}
        currentPageNumber={currentPageNumber}
        totalRowPerPage={rowPerPage}
        hasAddButton={false}
        hasFilter={true}
        // choiceFilterOption={updatedFilter}
        dateFilterOption={candidateDateFilterOptionConstant}
        hasChoiceFilter={false}
        hasDateFilter={true}
        conditionalFilter={candidateFilterByItem}
        isLoading={isLoading}
        totalPageNumber={totalPage}
        allDataToExport={allCandidateData}
        handleFilterKeywordsChange={handleChangeFilter}
        handleSearchKeywordsChange={handleSearchKeywordsChange}
        exportDataFormatter={formatFunctionToExportData}
      />
    </>
  );
};

export default CandidateList;
