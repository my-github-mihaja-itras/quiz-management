"use client";

import { useContext, useEffect, useState } from "react";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import Loader from "@/components/loader/loader";

import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import Processing from "@/components/shared/processing/processing.component";
import { HistoryType } from "@/components/shared/history/history.constant";
import { Media } from "react-data-table-component";
import SessionTab from "@/components/shared/sessionTab/sessionTab.component";

import { GetHistoryByTargetId } from "@/services/history/history.service";

import {
  editCourseById,
  getCourseById,
} from "@/services/course/course.service";
import { Course } from "@/services/course/course.model";
import CourseFormFields from "@/components/form/course.form.fields";
import { FormProvider, useForm } from "react-hook-form";
import style from "./detail.module.css";
import { Teacher } from "@/services/teacher/teacher.models";
import { getAllTeacher } from "@/services/teacher/teacher.service";
import IconActive from "@/components/shared/icons/iconActive";
import IconDisableGrey from "@/components/shared/icons/IconDisableGrey";
import { SessionForm } from "@/components/shared/addSession/addSession";

import UseWindowSize from "@/cores/window/window.size";
import { formatDateToLocal, getTime } from "@/utils/date.utils";
import { EditSessionType, Session } from "@/services/session/session.model";
import History, {
  HistoryUser,
} from "@/components/shared/history/history.component";
import {
  ActionType,
  EntityName,
  translateActionName,
  translateEntityName,
} from "@/cores/constant/constant.history";
import extractTokenInfo from "@/utils/extract.token";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import { CourseUpdateDto } from "@/services/user/course.dto";
import { HttpStatusCode } from "axios";
import Timetable from "@/components/timetable/timetable";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import IconEdit from "@/components/shared/icons/iconEdit";
import { CountextType, Privileges } from "@/context/privileges.context";
import IconDelete from "@/components/shared/icons/iconDelete";
import ConfirmModal from "@/components/modal/confirmModal";
import { deleteSessionById } from "@/services/session/session.service";
import { BeansCell } from "@/components/shared/dropdown/cell.style";
import { ServerResponse } from "@/cores/constant/response.constant";

const CourseDetailPage = ({ params }: { params: { courseId: string } }) => {
  const methods = useForm<any>({
    defaultValues: {},
  });

  const { privilegesContext, setPrivilegesContext }: CountextType =
    useContext(Privileges);

  // Course state
  const [courseData, setCourseData] = useState<Course | any>();
  const [sessionData, setSessionData] = useState<Session | any>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  //
  const [dataNotFound, setDataNotFound] = useState<boolean>(false);

  const [onChangeHistory, setOnChangeHistory] = useState(false);
  const [onChangeSession, setOnChangeSession] = useState(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [isSuccessAdd, setIsSuccessAdd] = useState<boolean>(false);

  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(true);

  const [isOpenModalAdd, setIsOpenModalAdd] = useState<Boolean>(false);

  const [isOpenModalEdit, setIsOpenModalEdit] = useState<Boolean>(false);

  const [message, setMessage] = useState<ErrorMessage | any>();

  const token = getLocalStorageItem("loginAccessToken") || "";
  const tokenInfo: any = extractTokenInfo(token);

  // Teacher Option [State
  const [teacherOption, setTeacherOption] = useState<any>();

  //History state
  const [historyData, setHistoryData] = useState<HistoryType[]>([]);

  //show schedule
  const [showTimetable, setShowTimetable] = useState<boolean>(false);

  const [editSessionData, setEditSessionData] = useState<EditSessionType>();

  const [isOpenModalDelete, setIsOpenModalDelete] = useState<Boolean>(false);

  const closeModalAdd = (value: boolean) => {
    setIsOpenModalAdd(value);
  };

  const closeModalEdit = (value: boolean) => {
    setIsOpenModalEdit(value);
  };

  /**
   * Function to get Course data by Id
   */
  const getCourseData = async () => {
    const response: ServerResponse = await getCourseById(params.courseId);

    if (response.status === HttpStatusCode.Ok) {
      setDataNotFound(false);
      setIsLoading(false);
      const course: Course = response?.data.data;

      setCourseData(course);
      setSessionData(
        course.session.filter((session) => {
          const sessionEndDate = new Date(session.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return sessionEndDate >= today;
        })
      );
    } else {
      setDataNotFound(true);
      setIsLoading(false);
    }
  };

  /**
   * Get History data
   */
  const getHistoryData = async () => {
    const response: ServerResponse = await GetHistoryByTargetId(
      params.courseId
    );

    if (response.status === HttpStatusCode.Ok) {
      setHistoryData(response.data.data);
    }
  };

  const onAddSession = (response: any) => {
    setIsOpenModalAdd(true);
    setIsSuccessAdd(response.success);
    setOnChangeSession(!onChangeSession);
    setMessage({
      title: response.message.title,
      message: response.message.message,
    });
  };

  useEffect(() => {
    getCourseData();
  }, [onChangeSession]);

  useEffect(() => {
    getHistoryData();
  }, [onChangeHistory, onChangeSession]);

  const columnStyles = {
    width: "auto",
    minWidth: "100px",
  };

  /* Médias queries pour ajuster la largeur des colonnes en fonction de la largeur de l'écran */
  const responsiveColumnStyles = {
    "@media only screen and (max-width: 767px)": {
      width: "100%",
      padding: "0",
    },
    "@media only screen and (min-width: 768px) and (max-width: 991px)": {
      width: "50%",
    },
    "@media only screen and (min-width: 992px) and (max-width: 1199px)": {
      width: "33%",
    },
    "@media only screen and (min-width: 1200px)": {
      width: "25%",
    },
  };
  const screenSize = UseWindowSize();

  const SessionColumn = [
    {
      name: "Date",
      selector: (row: Session) => row?.date,
      sortable: true,
      mawWidth: screenSize.width < 736 ? "150px" : "auto",
      cell: (row: Session) => {
        const date = row?.date?.toString();
        return <div>{formatDateToLocal(date)}</div>;
      },
      sortFunction: (a: Session, b: Session) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB.getTime() - dateA.getTime();
      },
    },
    {
      name: "Heures",
      selector: (row: Session) => row?.start,
      maxWidth: screenSize.width < 1000 ? "110px" : "250px",
      sortable: true,
      cell: (row: Session) => {
        const startTime = row?.start;
        const endTime = row?.end;

        return (
          <>
            {screenSize.width < 1000 ? (
              <div>
                <div>{startTime}</div>
                <div>{endTime}</div>
              </div>
            ) : (
              <div>{`${startTime} - ${endTime}`}</div>
            )}
          </>
        );
      },
    },
    {
      name: "Classe",
      selector: (row: Session) => row?.occupiedClasses,
      maxWidth: screenSize.width < 1000 ? "80px" : "250px",
      sortable: true,
      // hide: Media.SM,
      cell: (row: Session) => {
        const occupiedClasses = row?.occupiedClasses;

        return (
          <div className={style.rowCenter}>
            {occupiedClasses.length > 0
              ? occupiedClasses.map((classe: any) => (
                  <BeansCell key={classe._id}>{classe.name}</BeansCell>
                ))
              : "Aucune"}
          </div>
        );
      },
    },
    {
      name: "Examen",
      selector: (row: Session) => row?.isExam,
      sortable: true,
      hide: Media.SM,
      maxWidth: screenSize.width < 600 ? "80px" : "100px",
      cell: (row: Session) => {
        const exam = row?.isExam;
        return (
          <div
            style={{
              color: exam ? "#57CA22" : "#5C5C5C",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 0,
              margin: 0,
            }}
          >
            <p style={{ marginLeft: "5px" }}>{exam ? "Examen" : "Cours"}</p>
          </div>
        );
      },
    },
    {
      name: "",
      button: true,

      width: "5%",
      center: true,
      cell: (row: Session) => {
        function handleEdit(_id?: string): void {
          const comparingDateToToday = new Date() <= new Date(row.date);
          if (comparingDateToToday) {
            setShowTimetable(true);
            const formattedOccupiedClassesArray = row.occupiedClasses.map(
              (classes: any) => ({
                label: classes.name,
                alias: classes.name,
                value: classes._id,
              })
            );

            const editSessionData: EditSessionType = {
              _id: row._id,
              date: row.date,
              start: row.start,
              end: row.end,
              isExam: row.isExam,
              occupiedClasses: formattedOccupiedClassesArray,
            };
            setEditSessionData(editSessionData);
          } else {
            setIsSuccess(false);
            setMessage({
              title: "Erreur",
              message: "Cette séance est déjà passé.",
            });
            setIsOpenModalEdit(true);
          }
        }

        function handleDelete(_id?: string): void {
          const comparingDateToToday = new Date() <= new Date(row.date);
          if (comparingDateToToday) {
            setIsOpenModalDelete(true);
            setMessage({
              title: "Confirmation",
              message: "Voulez vous vraiment supprimer cette séance ?",
              confirmText: "Supprimer",
              id: _id,
            });
          } else {
            setIsSuccess(false);
            setMessage({
              title: "Erreur",
              message: "Cette séance est déjà passé.",
            });
            setIsOpenModalEdit(true);
          }
        }

        const [openDropdownId, setOpenDropdownId] = useState(null);
        const handleToggleDropdown = (id: any) => {
          setOpenDropdownId((prevId) => (prevId === id ? null : id));
        };

        const closeModalDelete = (value: boolean) => {
          setIsOpenModalDelete(value);
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
                <IconEdit /> <span style={{ color: "#0231A8" }}>Modifier</span>
              </button>
              {privilegesContext.delete_course ? (
                <button
                  onClick={() => {
                    handleDelete(row?._id);
                  }}
                >
                  <IconDelete />
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

  const handleChangeEditableFields = () => {
    setFieldsIsEditable(!fieldsIsDisabled);
  };

  const onSubmitEdit = async (data: CourseUpdateDto) => {
    const lastCourseTeacher: Teacher = courseData.teacher;
    const lastCourseTeacherId = lastCourseTeacher._id;
    const lastCourseTeacherName = lastCourseTeacher.user.firstname;

    const newCourseTeacherId = data.teacher;

    const newCourseTeacher: any = Array.from(teacherOption).find(
      (teacher: any) => teacher.value === newCourseTeacherId
    );

    const newCourseTeacherName = newCourseTeacher.label;

    let history;
    if (lastCourseTeacherId === newCourseTeacherId) {
      history = {
        action: { name: ActionType.UPDATE_COURSE },
        user: tokenInfo._id,
        targetId: params.courseId,
        entity: EntityName.COURSE,
      };
    } else {
      const teacherUpdateName = `${lastCourseTeacherName}//${newCourseTeacherName}`;
      history = {
        action: {
          name: ActionType.UPDATE_COURSE_TEACHER,
          proof: teacherUpdateName,
        },
        user: tokenInfo._id,
        targetId: params.courseId,
        entity: EntityName.COURSE,
      };
    }

    const courseUpdateDate = { course: data, history };

    const response: ServerResponse = await editCourseById(
      params.courseId,
      courseUpdateDate
    );
    if (response.status === HttpStatusCode.Ok) {
      setOnChangeHistory(!onChangeHistory);
      setFieldsIsEditable(!fieldsIsDisabled);
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
  };

  const loadTeacherData = async () => {
    setIsLoading(true);
    const response: ServerResponse = await getAllTeacher();

    if (response.status === HttpStatusCode.Ok) {
      setIsLoading(false);
      const teacher = response.data.data;

      setTeacherOption(
        teacher.map((teacher: Teacher) => {
          return {
            label: teacher.user.firstname,
            value: teacher._id,
          };
        })
      );

      if (teacherOption) {
      }
    }
  };

  useEffect(() => {
    loadTeacherData();
  }, []);

  const HistoryColumn = [
    {
      name: "Utilisateur",
      selector: (row: HistoryType) => row?.user?._id,
      sortable: true,
      width: screenSize.width < 600 ? "100%" : "160px",
      style: { ...columnStyles, ...responsiveColumnStyles },
      cell: (row: HistoryType) => {
        let date: string | undefined = undefined;
        const actionName = translateActionName(row?.action?.name);
        const entityName = translateEntityName(row?.action?.name);

        if (row?.createdAt) {
          date = new Date(row.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        }
        const time = getTime(row?.createdAt);
        const prof = row?.action?.proof;
        return screenSize.width < 600 ? (
          <div className={style.historyUserContainer}>
            <div className={style.historyUserContent}>
              <HistoryUser
                photo={row?.user?.photo}
                name={row?.user?.firstname}
              />
              <div className={style.historyUserSpecific}>
                {date}, {time}
              </div>
            </div>
            <div className={style.historyProof}>
              <div>
                {`a ${actionName} ${entityName}`}
                {row?.action?.proof && (
                  <>
                    :{" "}
                    <span className={style.listeProof}>
                      "{`${prof?.split("//")[0]}`}"
                    </span>
                    {" par "}
                    <span className={style.listeProof}>
                      "{`${prof?.split("//")[1]}`}"
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <HistoryUser photo={row?.user?.photo} name={row?.user?.firstname} />
        );
      },
    },
    {
      name: "Action",
      selector: (row: HistoryType) => row?.action.name,
      sortable: true,
      hide: Media.SM || Media.MD,
      style: { ...columnStyles, ...responsiveColumnStyles },
      cell: (row: HistoryType) => {
        const actionName = translateActionName(row?.action?.name);
        const entityName = translateEntityName(row?.action?.name);
        const prof = row?.action?.proof;
        return (
          <div>
            {`a ${actionName} ${entityName}`}
            {row?.action?.proof && (
              <>
                :{" "}
                <span className={style.listeProof}>
                  "{`${prof?.split("//")[0]}`}"
                </span>
                {" par "}
                <span className={style.listeProof}>
                  "{`${prof?.split("//")[1]}`}"
                </span>
              </>
            )}
          </div>
        );
      },
    },
    {
      name: "Date",
      selector: (row: HistoryType) => row?.createdAt,
      sortable: true,
      width: "145px",
      style: { ...columnStyles, ...responsiveColumnStyles },
      hide: Media.MD || Media.SM,
      cell: (row: HistoryType) => {
        let date: string | undefined = undefined;

        if (row?.createdAt) {
          date = new Date(row.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        }
        const time = getTime(row?.createdAt);
        return (
          <div style={{ color: "5C5C5C", fontFamily: "Roboto" }}>
            {date}, {time}
          </div>
        );
      },
    },
  ];
  const handleDeleteConfirmation = async (id: string) => {
    const history = {
      action: { name: ActionType.UPDATE_COURSE },
      user: tokenInfo._id,
      targetId: params.courseId,
      entity: EntityName.COURSE,
    };
    const response: ServerResponse = await deleteSessionById(id, history);
    if (response.status === HttpStatusCode.Ok) {
      setOnChangeHistory(!onChangeHistory);
      setOnChangeSession(!onChangeSession);
      setIsOpenModalDelete(false);
      setIsLoading(false);
    } else {
      setIsOpenModalDelete(false);
      setIsLoading(false);
    }
  };

  const onAddButtonChange = () => {
    setShowTimetable(!showTimetable);
  };
  const closeModalDelete = (value: boolean) => {
    setIsOpenModalDelete(value);
  };

  return (
    <DetailsSection>
      {isOpenModalAdd && (
        <ErrorModal
          close={closeModalAdd}
          message={message}
          color={isSuccessAdd ? "#0fc3ed" : "#dc3545"}
        ></ErrorModal>
      )}
      {isOpenModalEdit && (
        <ErrorModal
          close={closeModalEdit}
          message={message}
          color={isSuccess ? "#0fc3ed" : "#dc3545"}
        ></ErrorModal>
      )}
      {isOpenModalDelete && (
        <ConfirmModal
          close={closeModalDelete}
          message={message}
          handleConfirmation={handleDeleteConfirmation}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!dataNotFound ? (
            <>
              {showTimetable ? (
                <>
                  <Timetable
                    courseId={params.courseId}
                    targetCourseName={courseData.name}
                    onChange={onChangeSession}
                    onAddButtonChange={onAddButtonChange}
                  />
                  <div className={style.addSessionForm}>
                    <SessionForm
                      editSessionData={editSessionData}
                      courseData={courseData}
                      courseId={params.courseId}
                      onAddedStatus={onAddSession}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={style.detailWrapper}>
                    <Details>
                      {teacherOption && (
                        <FormProvider {...methods}>
                          <form onSubmit={methods.handleSubmit(onSubmitEdit)}>
                            {courseData && (
                              <CourseFormFields
                                fieldsIsDisabled={fieldsIsDisabled}
                                data={courseData}
                                teacherOption={teacherOption}
                              />
                            )}

                            <div className={style.action}>
                              {fieldsIsDisabled ? (
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
                    </Details>
                    <History
                      columns={HistoryColumn}
                      data={historyData}
                      minHeight="450px"
                    />
                  </div>
                  <Processing>
                    <>
                      <SessionTab
                        columns={SessionColumn}
                        data={sessionData}
                        fixedHeaderScrollHeight="450px"
                        onAddButtonChange={onAddButtonChange}
                      />
                    </>
                  </Processing>
                </>
              )}
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

export default CourseDetailPage;
