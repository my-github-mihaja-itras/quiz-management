"use client";
import ConfirmModal from "@/components/modal/confirmModal";
import { BadgeCell, StyledCell } from "@/components/shared/dropdown/cell.style";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import { ParsedType } from "@/components/shared/filter/filter.constant";
import IconDelete from "@/components/shared/icons/iconDelete";
import IconEdit from "@/components/shared/icons/iconEdit";
import ListSection from "@/components/shared/liste-section/listSection.component";
import { CountextType, Privileges } from "@/context/privileges.context";
import { ServerResponse } from "@/cores/constant/response.constant";
import { courseFilterOptionConstant } from "@/cores/filterConstants/course.constant";
import { Course } from "@/services/course/course.model";
import {
  getAllCourse,
  getCoursePaginated,
} from "@/services/course/course.service";
import { generateColors, getRandomColor } from "@/utils/color.utils";
import { isoDateStringToDate } from "@/utils/date.utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Media } from "react-data-table-component";

const CourseList = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [message, setMessage] = useState<{}>({});

  const [updatedFilter, setUpdatedFilter] = useState([]);

  // State for pagination
  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [courseData, setCourseData] = useState<Course[]>([]);
  const [allCourseData, setAllCourseData] = useState<Course[]>([]);

  const router = useRouter();

  //Search Keywords
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  // Extract keywords for search
  const handleSearchKeywordsChange = (keywords: any) => {
    setSearchKeywords(keywords);
  };

  const handleConfirmation = () => {};

  useContext(Privileges);
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

  // fonction spécifique pour les données a formater
  const formatFunctionToExportData = (item: any): any => {
    return {
      ...item,
      createdAt: isoDateStringToDate(item.createdAt),
      updatedAt: isoDateStringToDate(item.updatedAt),
    };
  };
  /**
   * Fonction qui recharge les données du server
   */
  const fetchData = async () => {
    setisLoading(true);
    const res = await getCoursePaginated(
      currentPageNumber,
      rowPerPage,
      [],
      searchKeywords
    );

    const totalPage = res.data.data.pageNumber;
    const totalItems = res.data.data.totalItems;
    setTotalRows(totalItems);
    setTotalPage(totalPage);
    const response: ServerResponse = await getAllCourse();

    const courseData: Course[] = res.data.data.items;
    setAllCourseData(courseData);

    setCourseData(courseData);
    setisLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPageNumber, rowPerPage, searchKeywords]);

  const coursColumns = [
    {
      name: "Nom",
      selector: (row: Course) => row?.name,
      sortable: true,
      hide: Media.MD || Media.SM,
    },
    {
      name: "Code",
      selector: (row: Course) => row?.code,
      sortable: true,
      cell: (row: Course) => {
        return <StyledCell width="100px">{row?.code}</StyledCell>;
      },
    },
    {
      name: "Enseignant",
      selector: (row: Course) => row?.teacher?.user?.firstname,
      sortable: true,
      hide: Media.MD || Media.SM,
    },
    {
      name: "",
      button: true,
      allowOverflow: true,
      width: "5%",
      center: true,
      cell: (row: Course) => {
        function handleEdit(_id: string): void {
          router.push("/course/" + _id);
        }
        const [openDropdownId, setOpenDropdownId] = useState(null);
        const handleToggleDropdown = (id: any) => {
          setOpenDropdownId((prevId) => (prevId === id ? null : id));
        };
        return (
          <div>
            <Dropdown
              id={row?._id as any}
              key={row?._id as any}
              isOpen={openDropdownId === row?._id}
              onToggle={handleToggleDropdown}
            >
              <button onClick={() => handleEdit(row?._id as any)}>
                <IconEdit /> <span style={{ color: "#0231A8" }}>Consulter</span>
              </button>
            </Dropdown>
          </div>
        );
      },
    },
  ];
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
        listeTitle="Cours"
        tableColumns={coursColumns}
        tableData={courseData}
        tableTotalRows={totalRows}
        handlePageNumberChange={handleChangePage}
        handleRowPerPageNumberChange={handleChangeRowPerPage}
        currentPageNumber={currentPageNumber}
        totalRowPerPage={rowPerPage}
        hasAddButton={true}
        hasFilter={false}
        choiceFilterOption={updatedFilter}
        dateFilterOption={courseFilterOptionConstant}
        hasChoiceFilter={true}
        hasDateFilter={true}
        isLoading={isLoading}
        totalPageNumber={totalPage}
        allDataToExport={allCourseData}
        handleSearchKeywordsChange={handleSearchKeywordsChange}
        exportDataFormatter={formatFunctionToExportData}
        redirectLink="course/add"
      />
    </>
  );
};
export default CourseList;
