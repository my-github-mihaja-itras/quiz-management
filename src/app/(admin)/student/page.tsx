"use client";

import Loader from "@/components/loader/loader";
import ConfirmModal from "@/components/modal/confirmModal";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import {
  FilterKeywords,
  ParsedType,
} from "@/components/shared/filter/filter.constant";
import IconDelete from "@/components/shared/icons/iconDelete";
import IconEdit from "@/components/shared/icons/iconEdit";
import ListSection from "@/components/shared/liste-section/listSection.component";
import { CountextType, Privileges } from "@/context/privileges.context";
import {
  studentFilterByItem,
  studentFilterConstant,
} from "@/cores/filterConstants/student.constant";
import { EducationalClasses } from "@/services/educational-classes/educational-classes.models";
import { Student } from "@/services/student/student.models";
import {
  getAllStudent,
  getEducationalClassesCount,
  getStudentPaginated,
} from "@/services/student/student.service";
import { DeleteUserById } from "@/services/user/user-service";
import { isoDateStringToDate } from "@/utils/date.utils";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Media } from "react-data-table-component";

const StudentList = () => {
  // State for pagination
  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);

  // State pour les données a insérer dans la table
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [allStudentData, setAllStudentData] = useState<Student[]>([]);

  //
  const [updatedFilter, setUpdatedFilter] = useState(studentFilterConstant);

  //Filter Keywords
  const [filterKeywords, setFilterKeywords] = useState<FilterKeywords[]>([]);

  //Search Keywords
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  // EducationalClasse data
  const [educationalClassesData, setEducationalClassesData] = useState<
    EducationalClasses[]
  >([]);

  //
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<Boolean>(false);
  const [message, setMessage] = useState<{}>({});

  // context that store the privileges values
  const { privilegesContext, setPrivilegesContext }: CountextType =
    useContext(Privileges);

  /**
   * Fonction qui recharge les données du server
   */
  const fetchData = async () => {
    const res = await getStudentPaginated(
      currentPageNumber,
      rowPerPage,
      filterKeywords,
      searchKeywords
    );

    const totalItems = res.data.data.totalItems;
    const totalPage = res.data.data.pageNumber;
    setTotalRows(totalItems);
    setTotalPage(totalPage);

    const studentData: Student[] = res.data.data.items;
    setStudentData(studentData);

    const response = await getAllStudent();
    setAllStudentData(response.data.data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPageNumber, rowPerPage, filterKeywords, searchKeywords]);

  const handleChangePage = (currentPageNumber: any) => {
    setCurrentPageNumberPage(currentPageNumber);
  };

  const handleChangeRowPerPage = (rowPerPage: any) => {
    setRowPerPage(rowPerPage);
    if (rowPerPage === totalRows) {
      setCurrentPageNumberPage(1);
    }
  };

  const studentColumns = [
    {
      name: "N° matricule",
      selector: (row: Student) => row?.registrationNumber,
      sortable: true,
      hide: Media.MD,
    },
    {
      name: "Nom",
      selector: (row: Student) => row?.user?.lastname,
      sortable: true,
    },
    {
      name: "Prénom(s)",
      selector: (row: Student) => row?.user?.firstname,
      sortable: true,
      hide: Media.MD,
    },
    {
      name: "Classe",
      selector: (row: Student) => row?.educationalClasses?.name,
      sortable: true,
    },
    {
      name: "",
      button: true,
      allowOverflow: true,
      accessor: "actionColumn",
      disableSortBy: true,
      width: "5%",
      cell: (row: Student) => {
        const router = useRouter();

        function handleEdit(_id: string): void {
          router.push("/student/" + row._id);
        }

        function handleDelete(_id: string): void {
          setIsOpenModalDelete(true);
          setMessage({
            title: "Confirmation",
            message: "Voulez vous vraiment supprimer cette utilisateur",
            confirmText: "Supprimer",
            id: row.user._id,
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
              <button onClick={() => handleEdit(row._id)}>
                <IconEdit /> <span style={{ color: "#0231A8" }}>Consulter</span>
              </button>
              {privilegesContext.delete_student ? (
                <button
                  onClick={() => {
                    handleDelete(row?.user._id);
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

  const closeModalDelete = (value: boolean) => {
    setIsOpenModalDelete(value);
  };

  const handleDeleteConfirmation = async (id: string) => {
    const response = await DeleteUserById(id);

    if (response.status === 200) {
      window.location.reload();
      setIsOpenModalDelete(false);
      setIsLoading(false);
    } else {
      setIsOpenModalDelete(false);
      setIsLoading(false);
    }
  };

  // fonction spécifique pour les données a formater
  const ExportDataFormatter = (item: any): any => {
    return {
      ...item,
      createdAt: isoDateStringToDate(item.createdAt),
    };
  };

  //
  const loadEducationalClassesData = async () => {
    const response = await getEducationalClassesCount();
    if (response.status === HttpStatusCode.Ok) {
      const educationalClasses: EducationalClasses[] = response.data.data.items;
      setEducationalClassesData(educationalClasses);
    }
  };

  useEffect(() => {
    loadEducationalClassesData();
  }, []);

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
      label: item.name,
      value: item.name,
      count: item.count,
      isChecked: false,
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

  // Fonction to execute the filter on data by Keywords
  const handleChangeFilter = (keywordsList: any) => {
    setFilterKeywords(keywordsList);
  };

  useEffect(() => {
    setUpdatedFilter(studentFilterConstant);
    updateFiltersConstant(
      educationalClassesData,
      "Classe",
      "educationalClasses.name",
      ParsedType.LIST
    );
  }, [educationalClassesData]);

  return (
    <>
      {isLoading && <Loader />}
      {isOpenModalDelete && (
        <ConfirmModal
          close={closeModalDelete}
          message={message}
          handleConfirmation={handleDeleteConfirmation}
        />
      )}
      <ListSection
        listeTitle="Étudiants"
        tableColumns={studentColumns}
        tableData={studentData}
        tableTotalRows={totalRows}
        handlePageNumberChange={handleChangePage}
        handleRowPerPageNumberChange={handleChangeRowPerPage}
        currentPageNumber={currentPageNumber}
        totalRowPerPage={rowPerPage}
        hasAddButton={false}
        hasFilter={true}
        choiceFilterOption={updatedFilter}
        hasChoiceFilter={true}
        hasDateFilter={false}
        conditionalFilter={studentFilterByItem}
        isLoading={isLoading}
        totalPageNumber={totalPage}
        allDataToExport={allStudentData}
        handleFilterKeywordsChange={handleChangeFilter}
        handleSearchKeywordsChange={handleSearchKeywordsChange}
        exportDataFormatter={ExportDataFormatter}
      />
    </>
  );
};

export default StudentList;
