"use client";

import ListSection from "@/components/shared/liste-section/listSection.component";
import { useContext, useEffect, useState } from "react";
import { userFilterConstant } from "@/cores/filterConstants/user.constant";
import Loader from "@/components/loader/loader";

import { educationalClassFilterByItem } from "@/cores/filterConstants/educationalClass.constant";
import {
  DeleteEducationalClassesById,
  getPaginatedEducationalClasses,
} from "@/services/educational-classes/educational-classes-service";
import { CursusType } from "@/services/cursus/cursus.models";
import { getAllCursus } from "@/services/cursus/cursus.service";
import ConfirmModal from "@/components/modal/confirmModal";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import IconDelete from "@/components/shared/icons/iconDelete";
import IconEdit from "@/components/shared/icons/iconEdit";
import { getDate, getTime, isoDateStringToDate } from "@/utils/date.utils";
import { useRouter } from "next/navigation";
import { ParsedType } from "@/components/shared/filter/filter.constant";
import { CountextType, Privileges } from "@/context/privileges.context";
import { EducationalClasses } from "@/services/educational-classes/educational-classes.models";
import { ServerResponse } from "@/cores/constant/response.constant";
import { HttpStatusCode } from "axios";

const EducationalClassList = () => {
  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [message, setMessage] = useState<{}>({});
  const router = useRouter();

  // State pour les données a insérer dans la table
  const [educationalClassData, setEducationalClassData] = useState<
    EducationalClasses[]
  >([]);

  // State pour les filtre non constante
  const [cursus, setCursus] = useState<CursusType[]>([]);
  const [updatedFilter, setUpdatedFilter] = useState(userFilterConstant);
  // const [groups, setGroups] = useState<Group[]>([]);

  // context that store the privileges values
  const { privilegesContext, setPrivilegesContext }: CountextType =
    useContext(Privileges);

  //Search Keywords
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  /**
   * Fonction qui recharge les données du server
   */
  const fetchData = async () => {
    const res = await getPaginatedEducationalClasses(
      currentPageNumber,
      rowPerPage,
      searchKeywords
    );
    const totalItems = res.data.totalItems;
    const totalPage = res.data.pageNumber;
    setTotalRows(totalItems);
    setTotalPage(totalPage);

    const educationalClassData: EducationalClasses[] = res.data.items;
    setEducationalClassData(educationalClassData);

    setisLoading(false);
  };

  //
  const loadCursus = async () => {
    const cursusRes = await getAllCursus();
    // const groupsRes = await getAllGroups();
    const cursus = cursusRes.data;
    setCursus(cursus);
    // const groups = groupsRes.data;
    // setGroups(groups);
    setisLoading(false);
  };

  // Extract keywords for search
  const handleSearchKeywordsChange = (keywords: any) => {
    setSearchKeywords(keywords);
  };

  // Rechargement de la page apres chaque load
  useEffect(() => {
    fetchData();
    loadCursus();
  }, [currentPageNumber, rowPerPage, searchKeywords]);

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

  // Fonction qui fait mets a jour le constant du filtre si le filtre est variable
  const updateFiltersConstant = (
    dataToTransform: any,
    title: string,
    name: string,
    type: ParsedType
  ) => {
    const transformedData = dataToTransform.map((item: any) => ({
      label: item.name,
      value: item.name,
      count: 20,
    }));

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
      return newFilters;
    });
  };

  useEffect(() => {
    setUpdatedFilter(userFilterConstant);
    updateFiltersConstant(cursus, "Filière", "", ParsedType.LIST);
    // updateFiltersConstant(roles, "Rôles");
  }, [cursus]);

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const educationalClassColumns = [
    {
      name: "Nom",
      selector: (row: EducationalClasses) => row?.name,
      sortable: true,
    },
    {
      name: "Filière",
      selector: (row: EducationalClasses) => row?.cursus?.name,

      sortable: true,
    },
    {
      name: "Année universitaire",
      selector: (row: EducationalClasses) => row?.schoolYear,
      sortable: true,
    },
    {
      name: "Date de creation",
      selector: (row: EducationalClasses) => row?.createdAt,
      sortable: true,
      cell: (row: EducationalClasses) => {
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
      name: "",
      button: true,
      allowOverflow: true,
      accessor: "actionColumn",
      disableSortBy: true,
      width: "5%",
      cell: (row: EducationalClasses) => {
        function handleEdit(_id: string): void {
          router.push("/educational-classes/" + _id);
        }

        function handleDelete(_id: string): void {
          setIsOpen(true);

          setMessage({
            title: "Confirmation",
            message: "Voulez vous vraiment supprimer cette classe ?",
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
              key={row?._id}
              id={row?._id}
              isOpen={openDropdownId === row?._id}
              onToggle={handleToggleDropdown}
            >
              <button onClick={() => handleEdit(row?._id as string)}>
                <IconEdit /> <span style={{ color: "#0231A8" }}>Consulter</span>
              </button>
              {privilegesContext.delete_educational_class ? (
                <button
                  onClick={() => {
                    handleDelete(row?._id as string);
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
    const response: ServerResponse = await DeleteEducationalClassesById(id);

    if (response.status === HttpStatusCode.Ok) {
      window.location.reload();
      setIsOpen(false);
      setisLoading(false);
    } else {
      setIsOpen(false);
      setisLoading(false);
    }
  };

  // fonction spécifique pour les données a formater
  const formatFunctionToExportData = (item: any): any => {
    return {
      ...item,
      createdAt: isoDateStringToDate(item.createdAt),
    };
  };
  return (
    <>
      {isLoading && <Loader />}
      {isOpen && (
        <ConfirmModal
          close={closeModal}
          message={message}
          handleConfirmation={handleConfirmation}
        />
      )}
      <ListSection
        listeTitle="Gestion des classes"
        tableColumns={educationalClassColumns}
        tableData={educationalClassData}
        tableTotalRows={totalRows}
        handlePageNumberChange={handleChangePage}
        handleRowPerPageNumberChange={handleChangeRowPerPage}
        totalRowPerPage={rowPerPage}
        hasAddButton={true}
        hasFilter={false}
        hasChoiceFilter={false}
        hasDateFilter={false}
        conditionalFilter={educationalClassFilterByItem}
        isLoading={isLoading}
        currentPageNumber={currentPageNumber}
        totalPageNumber={totalPage}
        allDataToExport={educationalClassData}
        exportDataFormatter={formatFunctionToExportData}
        handleSearchKeywordsChange={handleSearchKeywordsChange}
        redirectLink={"/educational-classes/add"}
      />
    </>
  );
};

export default EducationalClassList;
