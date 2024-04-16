"use client";

import ConfirmModal from "@/components/modal/confirmModal";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import IconDelete from "@/components/shared/icons/iconDelete";
import IconEdit from "@/components/shared/icons/iconEdit";
import ListSection from "@/components/shared/liste-section/listSection.component";
import {
  candidateDateFilterOptionConstant,
  candidateFilterByItem,
  candidateFilterConstant,
  mapStatusToLabelValue,
  translateStatus,
} from "@/cores/filterConstants/candidate.constant";
import {
  DeleteCandidateById,
  getAllCandidate,
  getCandidatePaginated,
  getStatusCount,
} from "@/services/candidate/candidate-service";

import { getDate, getTime, isoDateStringToDate } from "@/utils/date.utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Media } from "react-data-table-component";
import { useContext, useEffect, useState } from "react";
import {
  FilterKeywords,
  ParsedType,
} from "@/components/shared/filter/filter.constant";
import { CountextType, Privileges } from "@/context/privileges.context";
import { CandidateType } from "@/services/candidate/candidate-models";
import { ServerResponse } from "@/cores/constant/response.constant";
import { HttpStatusCode } from "axios";

const CandidateList = () => {
  // State for pagination
  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [isLoading, setIsLoad] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);

  // State pour les données a insérer dans la table
  const [candidateData, setCandidateData] = useState<CandidateType[]>([]);
  const [allCandidateData, setAllCandidateData] = useState<CandidateType[]>([]);

  const [status, setStatus] = useState<any[]>([]);
  const [updatedFilter, setUpdatedFilter] = useState(candidateFilterConstant);

  // context that store the privileges values
  const { privilegesContext, setPrivilegesContext }: CountextType =
    useContext(Privileges);

  ///
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [message, setMessage] = useState<{}>({});

  const router = useRouter();

  const searchParams = useSearchParams();
  const filter = searchParams.get("filter")
    ? ([searchParams.get("filter")] as string[])
    : ([] as string[]);

  //Filter Keywords
  const [filterKeywords, setFilterKeywords] = useState<FilterKeywords[]>([]);

  //Search Keywords
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  /**
   * Function that reloads server data
   */
  const fetchData = async () => {
    setIsLoad(true);
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

    const response: ServerResponse = await getAllCandidate();
    setAllCandidateData(response.data?.data);

    const candidateData: CandidateType[] = res.data.data.items;
    setCandidateData(candidateData);
    setIsLoad(false);
  };

  const loadApplicationStatus = async () => {
    const status = await getStatusCount();
    setStatus(status.data.data.items);
    setIsLoad(false);
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

  // Extract keywords for search
  const handleSearchKeywordsChange = (keywords: any) => {
    setSearchKeywords(keywords);
  };

  // Fonction qui fait mets a jour le constant du filtre si le filtre est variable
  const updateFiltersConstant = (
    dataToTransform: any,
    title: string,
    name: string,
    type: ParsedType
  ) => {
    const transformedData = dataToTransform.map((item: any) => ({
      ...mapStatusToLabelValue(item.name),
      count: item.count,
    }));
    // console.log(transformedData);

    setUpdatedFilter((prevFilters) => {
      const newFilters = [
        ...prevFilters,
        {
          title,
          name,
          type,

          element: transformedData,
        },
      ];
      // console.log("New Filter: ", newFilters);

      return newFilters;
    });
  };

  const handleChangeFilter = (keywordsList: any) => {
    setFilterKeywords(keywordsList);
  };

  useEffect(() => {
    setUpdatedFilter(candidateFilterConstant);
    updateFiltersConstant(
      status,
      "Statut",
      "applicationStatus",
      ParsedType.LIST
    );
  }, [status]);

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
          router.push("/candidate/" + _id);
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
    setIsLoad(true);
    const response: ServerResponse = await DeleteCandidateById(id);

    if (response.status === HttpStatusCode.Ok) {
      window.location.reload();
      setIsOpen(false);
      setIsLoad(false);
    } else {
      setIsOpen(false);
      setIsLoad(false);
    }
  };
  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  // fonction spécifique pour les données a formater
  const ExportDataFormatter = (item: any): any => {
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
        listeTitle="Candidats Inscrits"
        tableColumns={candidateColumns}
        tableData={candidateData}
        tableTotalRows={totalRows}
        handlePageNumberChange={handleChangePage}
        handleRowPerPageNumberChange={handleChangeRowPerPage}
        currentPageNumber={currentPageNumber}
        totalRowPerPage={rowPerPage}
        hasAddButton={false}
        hasFilter={true}
        choiceFilterOption={updatedFilter}
        dateFilterOption={candidateDateFilterOptionConstant}
        hasChoiceFilter={true}
        hasDateFilter={true}
        conditionalFilter={candidateFilterByItem}
        isLoading={isLoading}
        totalPageNumber={totalPage}
        allDataToExport={allCandidateData}
        handleFilterKeywordsChange={handleChangeFilter}
        handleSearchKeywordsChange={handleSearchKeywordsChange}
        exportDataFormatter={ExportDataFormatter}
      />
    </>
  );
};

export default CandidateList;
