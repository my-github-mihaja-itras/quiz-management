"use client";
import ListSection from "@/components/shared/liste-section/listSection.component";
import style from "./teacher.course.details.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Student } from "@/services/student/student.models";
import {
  studentFilterByItem,
  studentFilterConstant,
} from "@/cores/filterConstants/student.constant";
import {
  FilterKeywords,
  ParsedType,
} from "@/components/shared/filter/filter.constant";
import { formatDate, isoDateStringToDate } from "@/utils/date.utils";
import { Media } from "react-data-table-component";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import IconEdit from "@/components/shared/icons/iconEdit";
import { CountextType, Privileges } from "@/context/privileges.context";
import IconDelete from "@/components/shared/icons/iconDelete";
import { EducationalClasses } from "@/services/educational-classes/educational-classes.models";
import {
  GetStudentByCourseId,
  UpdateStudentResults,
  getEducationalClassesCount,
  getStudentPaginated,
} from "@/services/student/student.service";
import { HttpStatusCode } from "axios";
import { ServerResponse } from "@/cores/constant/response.constant";
import IconAddResults from "@/components/shared/icons/iconAddResults";
import { getCourseById } from "@/services/course/course.service";
import { Session } from "@/services/session/session.model";
import {
  Course,
  RegistratedCourse,
  Result,
} from "@/services/course/course.model";
import { InputNumber } from "@/components/shared/form/input-field/input-field";
import { useForm } from "react-hook-form";
import { AddButton } from "@/components/button/add-btn";
import IconValide from "@/components/shared/icons/iconValide";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import {
  ActionName,
  ActionType,
  EntityName,
} from "@/cores/constant/constant.history";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";

const TeacherCourseDetailsPage = ({
  params,
}: {
  params: { courseId: string };
}) => {
  // State for pagination
  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);

  // Filter State
  const [updatedFilter, setUpdatedFilter] = useState(studentFilterConstant);

  // Student data filtered by courseId
  const [studentDataByCourseId, setStudentDataByCourseId] = useState<Student[]>(
    []
  );
  const [allStudentDataByCourseId, setAllStudentDataByCourseId] = useState<
    Student[]
  >([]);

  const token = getLocalStorageItem("loginAccessToken") || "";
  const tokenInfo: any = extractTokenInfo(token);

  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const {
    register,
    watch,
    setValue,
    getValues,
    setError,
    control,
    resetField,
    formState: { errors, disabled },
  } = useForm<Student>();

  // EducationalClasse data
  const [educationalClassesData, setEducationalClassesData] = useState<
    EducationalClasses[]
  >([]);

  const [examSessionData, setExamSessionData] = useState<Session[]>([]);

  const btnRef = useRef(null);

  const fetchData = async () => {
    const registrationCourseFilterKeyword = {
      category: "",
      key: "registratedCourse.course",
      value: params.courseId,
      type: "list",
    };

    const filterKeywordsUpdated: any = [
      ...filterKeywords,
      registrationCourseFilterKeyword,
    ];
    setIsLoading(true);
    const res: ServerResponse = await getStudentPaginated(
      currentPageNumber,
      rowPerPage,
      filterKeywordsUpdated,
      searchKeywords
    );
    if (res.status === HttpStatusCode.Ok) {
      const totalItems = res.data.data.totalItems;
      const totalPage = res.data.data.pageNumber;
      setTotalRows(totalItems);
      setTotalPage(totalPage);

      const studentData: Student[] = res.data.data.items;

      setStudentDataByCourseId(studentData);

      setAllStudentDataByCourseId(studentData);

      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const getExamSessionData = async () => {
    const response: ServerResponse = await getCourseById(params.courseId);
    if (response.status === HttpStatusCode.Ok) {
      const courseData: Course = response.data.data;
      const sessions = courseData.session;
      const filteredSession = sessions.filter((session) => session.isExam);
      setExamSessionData(filteredSession);
    }
  };
  //Filter Keywords
  const [filterKeywords, setFilterKeywords] = useState<FilterKeywords[]>([]);

  //Search Keywords
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  // context that store the privileges values
  const { privilegesContext, setPrivilegesContext }: CountextType =
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

  //  Handle filter on Change selection
  const handleChangeFilter = (keywordsList: any) => {
    setFilterKeywords(keywordsList);
  };

  // Extract keywords for search
  const handleSearchKeywordsChange = (keywords: any) => {
    setSearchKeywords(keywords);
  };

  // fonction spécifique pour les données a formater
  const ExportDataFormatter = (item: Student): any => {
    return {
      ...item,
    };
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

  //
  const loadEducationalClassesData = async () => {
    const response = await getEducationalClassesCount();
    if (response.status === HttpStatusCode.Ok) {
      const educationalClasses: EducationalClasses[] = response.data.data.items;
      setEducationalClassesData(educationalClasses);
    }
  };

  // update column to insert dynamic fields
  const updateStudentsColumnConstant = (
    constantToUpdate: any,
    dataToTransform: Session[]
  ) => {
    const getAverage = (row: Student) => {
      const average = row?.registratedCourse.find(
        (registratedCoures) =>
          registratedCoures?.course?.toString() === params.courseId.toString()
      )?.average;
      return average || 0;
    };
    const transformedColumn: any[] = dataToTransform.map((item, index) => ({
      name: `note du ${new Date(item.date).toLocaleDateString()}`,
      selector: (row: Student) => {
        const courseId = params.courseId;

        const registratedCourseById = row?.registratedCourse.find(
          (registratedCoures) =>
            registratedCoures?.course?.toString() === courseId.toString()
        );
        const filteredResult = registratedCourseById?.result.find(
          (result) => result.examDate === item.date
        );

        return filteredResult?.note || 0;
      },
      sortable: true,
      cell: (row: Student, rowIndex: number) => {
        const field = row?.registratedCourse?.find(
          (course) => course.course === params.courseId
        );

        const results: Result[] = field?.result || [];
        const exam = results.find((items) => items.examDate === item.date);
        const note = exam?.note ? exam?.note : 0;

        return (
          <div className={style.input}>
            <input
              className={style.inputNote}
              type="number"
              {...register(
                `${row?.registrationNumber}.result.${rowIndex}.note.${index}` as any,
                {
                  value: note,
                  max: 20,
                }
              )}
              max={20}
            />
            {errors && <p>{errors.registrationNumber?.message?.toString()}</p>}
          </div>
        );
      },
    }));
    const [matricule, noms, classes, action] = constantToUpdate;
    const average = {
      name: "Moyenne",
      selector: (row: Student) => {
        const average = getAverage(row);
        return average;
      },
      sortable: true,
      maxWidth: "50px",
      center: true,
      cell: (row: Student) => {
        const field = row?.registratedCourse?.find(
          (course) => course.course === params.courseId
        );

        const average = field?.average || 0;

        return <div style={{ fontWeight: "bold" }}>{average.toString()}</div>;
      },
    };

    const noExamSession = {
      name: "Session",
      selector: (row: Student) => row?._id,
      sortable: true,
      center: true,
      cell: (row: Student) => {
        return (
          <div style={{ fontWeight: "400" }}>Aucune examen disponible</div>
        );
      },
    };

    setTransformedConstatantColumn([
      matricule,
      noms,
      classes,
      ...transformedColumn,
      examSessionData.length > 0 ? average : noExamSession,
      examSessionData.length > 0 && action,
    ]);
  };

  const studentsColumn = [
    {
      name: "N° matricule",
      selector: (row: Student) => row?.registrationNumber,
      sortable: true,
      hide: Media.MD,
    },
    {
      name: "Nom et Prénom(s)",
      selector: (row: Student) => row?.user?.lastname,
      sortable: true,
      cell: (row: Student) => {
        return (
          <>
            {row?.user?.lastname.toUpperCase()} {row?.user?.firstname}{" "}
          </>
        );
      },
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
      width: "5%",
      cell: (row: Student, rowIndex: number) => {
        async function handleValidate() {
          const studentId = row?._id;
          const courseId = params.courseId;
          const userId = tokenInfo._id;
          let average = 0;
          const historyData = {
            action: { name: ActionType.UPDATE_STUDENT_RESULT },
            user: userId,
            targetId: studentId,
            entity: EntityName.STUDENT,
          };
          let sommesValue = 0;
          let resultsData = [];
          const indexOfRegistratedCourse = row?.registratedCourse?.findIndex(
            (course) => course.course === params.courseId
          );
          for (let index = 0; index < examSessionData.length; index++) {
            const value = getValues(
              `${row?.registrationNumber}.result.${rowIndex}.note.${index}` as any
            );
            if (value > 20) {
              setError(
                `${row?.registrationNumber}.result.${rowIndex}.note.${index}` as any,
                {
                  type: "max",
                  message: `La valeur ne doit pas dépasser ${20} pour l'étudiant ${
                    row.registrationNumber
                  }`,
                }
              );
              setMessage({
                title: "Oups",
                message: `La valeur ne doit pas dépasser ${20} pour l'étudiant ${
                  row.registrationNumber
                }`,
              });
              setIsOpen(true);
            } else {
              resultsData.push({
                examDate: examSessionData[index].date,
                note: parseFloat(value),
              });
              sommesValue += parseFloat(value);
            }
          }
          if (Object.keys(errors).length === 0) {
            average = sommesValue / examSessionData.length;
            for (let i = 0; i < examSessionData.length; i++) {}
            const studentResultsData = { courseId, average, resultsData };
            const response: ServerResponse = await UpdateStudentResults(
              studentId,
              studentResultsData,
              historyData
            );
            if (response.status === HttpStatusCode.Ok) {
              fetchData();
            }
            getExamSessionData();
          }
        }
        return (
          <AddButton
            ref={btnRef}
            // disabled={true}
            colors="#0FC3ED"
            height={"25px"}
            width={"50px"}
            fontSize={"14px"}
            uppercase={false}
            onClick={handleValidate}
          >
            <IconValide />
          </AddButton>
        );
      },
    },
  ];

  const [transformedColumnConstant, setTransformedConstatantColumn] =
    useState<any>(studentsColumn);

  useEffect(() => {
    fetchData();
  }, [currentPageNumber, rowPerPage, filterKeywords, searchKeywords]);

  useEffect(() => {
    setUpdatedFilter(studentFilterConstant);
    updateFiltersConstant(
      educationalClassesData,
      "Classe",
      "educationalClasses.name",
      ParsedType.LIST
    );
  }, [educationalClassesData]);

  useEffect(() => {
    loadEducationalClassesData();
    getExamSessionData();
  }, []);

  useEffect(() => {
    if (examSessionData) {
      updateStudentsColumnConstant(studentsColumn, examSessionData);
    }
  }, [examSessionData]);

  return (
    <div className={style.container}>
      {isOpen && (
        <ErrorModal
          close={closeModal}
          message={message}
          color={"#0FC3ED"}
        ></ErrorModal>
      )}
      <ListSection
        listeTitle="Étudiants Inscrits"
        tableColumns={transformedColumnConstant}
        tableData={studentDataByCourseId}
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
        allDataToExport={allStudentDataByCourseId}
        handleFilterKeywordsChange={handleChangeFilter}
        handleSearchKeywordsChange={handleSearchKeywordsChange}
        exportDataFormatter={ExportDataFormatter}
      />
    </div>
  );
};

export default TeacherCourseDetailsPage;
