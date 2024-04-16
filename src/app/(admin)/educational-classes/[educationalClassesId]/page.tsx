"use client";

import { useEffect, useState } from "react";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import Loader from "@/components/loader/loader";

import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import { HistoryType } from "@/components/shared/history/history.constant";

import { GetHistoryByTargetId } from "@/services/history/history.service";

import { Course } from "@/services/course/course.model";
import { FormProvider, useForm } from "react-hook-form";
import style from "./detail.module.css";
import IconActive from "@/components/shared/icons/iconActive";
import IconDisableGrey from "@/components/shared/icons/IconDisableGrey";

import UseWindowSize from "@/cores/window/window.size";
import { formatDateToLocal } from "@/utils/date.utils";
import EducationalClassesFormFields from "@/components/form/educational-classes.form.fields";
import {
  EditEducationalClassesById,
  GetEducationalClassesById,
} from "@/services/educational-classes/educational-classes-service";
import Tabs from "@/components/shared/tabs/tabs.components";
import {
  CoursSelection,
  EducationalClasses,
} from "@/services/educational-classes/educational-classes.models";
import { Session } from "@/services/session/session.model";
import { ServerResponse } from "@/cores/constant/response.constant";
import { HttpStatusCode } from "axios";
import SessionTab from "@/components/shared/sessionTab/sessionTab.component";
import StudentTab from "@/components/shared/studentTab/studentTab.component";
import { Student } from "@/services/student/student.models";
import { Media } from "react-data-table-component";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import { useRouter } from "next/navigation";
import IconEdit from "@/components/shared/icons/iconEdit";
import { getStudentByEducationalClassesId } from "@/services/student/student.service";

const EducationalClassesDetailPage = ({
  params,
}: {
  params: { educationalClassesId: string };
}) => {
  const methods = useForm<any>({
    defaultValues: {},
  });

  // Course state
  const [educationalClassesData, setEducationalClassesData] = useState<
    Course | any
  >();

  const [studentData, setStudentData] = useState<Student[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  //
  const [dataNotFound, setDataNotFound] = useState<boolean>(false);

  const [onChangeHistory, setOnChangeHistory] = useState(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [fieldsIsDisable, setFieldsIsDisable] = useState<boolean>(true);

  const [isOpenModalEdit, setIsOpenModalEdit] = useState<Boolean>(false);

  const [message, setMessage] = useState<ErrorMessage>();

  //History state
  const [historyData, setHistoryData] = useState<HistoryType[]>([]);

  const closeModalEdit = (value: boolean) => {
    setIsOpenModalEdit(value);
  };

  /**
   * Function to get Course data by Id
   */
  const getEducationalClassesData = async () => {
    const response: ServerResponse = await GetEducationalClassesById(
      params.educationalClassesId
    );

    if (response.status === HttpStatusCode.Ok) {
      setDataNotFound(false);
      setIsLoading(false);
      const course: Course = response?.data.data;
      setEducationalClassesData(course);
    } else {
      setDataNotFound(true);
      setIsLoading(false);
    }
  };

  const getStudentData = async () => {
    const response: ServerResponse = await getStudentByEducationalClassesId(
      params.educationalClassesId
    );

    if (response.status === HttpStatusCode.Ok) {
      setDataNotFound(false);
      setIsLoading(false);
      const student: Student[] = response?.data.data;

      setStudentData(student);
    } else {
      setDataNotFound(true);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  /**
   * Get History data
   */
  const getHistoryData = async () => {
    const response: ServerResponse = await GetHistoryByTargetId(
      params.educationalClassesId
    );

    if (response.status === HttpStatusCode.Ok) {
      setHistoryData(response.data.data);
    }
  };

  useEffect(() => {
    getEducationalClassesData();
    getHistoryData();
    getStudentData();
  }, [onChangeHistory]);

  const handleChangeEditableFields = () => {
    setFieldsIsDisable(!fieldsIsDisable);
  };

  const onSubmitEdit = async (data: any) => {
    const {
      courseSelection,
      schoolYearStart,
      schoolYearEnd,
      ...restOfData
    }: EducationalClasses = data;

    if (Number(schoolYearStart) >= Number(schoolYearEnd)) {
      setIsSuccess(false);
      setMessage({
        title: "Erreur",
        message: "L'année de début doit être plus petit que l'année de fin.",
      });
      setIsOpenModalEdit(true);
    } else {
      const schoolYear = `${schoolYearStart}-${schoolYearEnd}`;

      const flattedCourseSelection = courseSelection.flatMap(
        (item) => item.courses
      );

      const updatedData = {
        ...restOfData,
        courseSelection,
        schoolYear,
        flattedCourseSelection,
      };

      const response: ServerResponse = await EditEducationalClassesById(
        params.educationalClassesId,
        updatedData
      );

      if (response.status === HttpStatusCode.Ok) {
        setFieldsIsDisable(!fieldsIsDisable);
        setIsSuccess(true);
        setMessage({
          title: "Modification effectué",
          message: "Les mises à jour ont été effectuées avec succès.",
        });
        setIsOpenModalEdit(true);
      } else {
        setIsSuccess(false);
        setMessage({
          title: "Erreur",
          message: "Une erreur c'est produit lors de la modification.",
        });
        setIsOpenModalEdit(true);
      }
    }
  };

  const studentColumn = [
    {
      name: "N° matricule",
      selector: (row: Student) => row?.registrationNumber,
      sortable: true,
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
            </Dropdown>
          </div>
        );
      },
    },
  ];
  return (
    <DetailsSection>
      {isOpenModalEdit && (
        <ErrorModal
          close={closeModalEdit}
          message={message}
          color={isSuccess ? "#0fc3ed" : "#dc3545"}
        ></ErrorModal>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!dataNotFound ? (
            <>
              <div className={style.detailWrapper}>
                <Details>
                  <Tabs
                    tabsConstant={[
                      {
                        label: "Informations",
                        content: (
                          <>
                            {educationalClassesData && (
                              <FormProvider {...methods}>
                                <form
                                  onSubmit={methods.handleSubmit(onSubmitEdit)}
                                >
                                  <EducationalClassesFormFields
                                    editableData={educationalClassesData}
                                    fieldIsDisable={fieldsIsDisable}
                                  />

                                  <div className={style.action}>
                                    {fieldsIsDisable ? (
                                      <a
                                        type="button"
                                        onClick={handleChangeEditableFields}
                                        className={style.editBtn}
                                      >
                                        Modifier
                                      </a>
                                    ) : (
                                      <>
                                        <button
                                          type="submit"
                                          className={style.saveBtn}
                                        >
                                          Enregistrer
                                        </button>
                                        <button
                                          type="button"
                                          onClick={handleChangeEditableFields}
                                          className={style.editBtn}
                                        >
                                          Annuler
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </form>
                              </FormProvider>
                            )}
                          </>
                        ),
                      },
                    ]}
                  />
                </Details>
              </div>
              <StudentTab columns={studentColumn} data={studentData} />
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              Le course sélectionné n'est pas trouvé
            </div>
          )}
        </>
      )}
    </DetailsSection>
  );
};

export default EducationalClassesDetailPage;
