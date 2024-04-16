"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import AddSection from "@/components/shared/add-section/add.section.component";
import style from "./add.module.css";
import CoursValidationFormFields from "@/components/form/cours-validation.form.fields";
import Processing from "@/components/shared/processing/processing.component";

import UseWindowSize from "@/cores/window/window.size";
import { Student } from "@/services/student/student.models";
import { AssignedCourse } from "./assignedCourse.model";
import { ActionType } from "@/cores/constant/constant.history";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import {
  EditStudentById,
  getStudentByUserId,
} from "@/services/student/student.service";
import { HttpStatusCode } from "axios";
import { RegistratedCourse } from "@/services/course/course.model";
import SessionTab from "@/components/shared/sessionTab/sessionTab.component";
import { Session } from "@/services/session/session.model";
import { formatDateToLocal } from "@/utils/date.utils";
import { Media } from "react-data-table-component";
import { EducationalClasses } from "@/services/educational-classes/educational-classes.models";
import { AnyNsRecord } from "dns";

const CoursValidation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [assignedCourse, setAssignedCourse] = useState<AssignedCourse[]>([]);

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [message, setMessage] = useState<ErrorMessage>();

  const [hasRegistratedCourse, setHasRegistratedCourse] =
    useState<boolean>(false);

  const [registratedCourseDataByStudent, setRegistratedCourseDataByStudent] =
    useState<RegistratedCourse[]>([]);

  const [studentSession, setStudentSession] = useState<Session[]>([]);

  const token = getLocalStorageItem("loginAccessToken") || "";

  const tokenInfo: any = extractTokenInfo(token);

  const studentId = tokenInfo._id;

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const EducationalClassesSubmitService = async (data: any) => {
    setIsLoading(true);
    const electiveCourses = data.courses;
    // console.log("======================================");
    // console.log(data);
    // console.log("======================================");

    const registratedCourse = electiveCourses.map((item: string) => ({
      course: item,
      result: [],
    }));

    const history = {
      action: { name: ActionType.UPDATE_STUDENT },
      user: tokenInfo._id,
      targetId: data._id,
      entity: "Student",
    };
    const response = await EditStudentById(
      data._id,
      { registratedCourse },
      history
    );

    if (response.status === HttpStatusCode.Ok) {
      setHasRegistratedCourse(true);
      setIsLoading(false);
      setIsSuccess(true);
      setMessage({
        title: "Succès",
        message: "Les cours ont été assignés avec succès",
      });
      setIsOpen(true);
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      setMessage({
        title: "Information incorrect",
        message: "Veuillez bien verifier tous les informations",
      });
      setIsOpen(true);
    }
  };

  const getStudentSessionData = async () => {
    const response = await getStudentByUserId();
    if (response.status == HttpStatusCode.Ok) {
      const studentData: Student = response.data.data;
      const registratedCourseData: RegistratedCourse[] =
        studentData.registratedCourse;
      if (registratedCourseData.length > 0) {
        setHasRegistratedCourse(true);
        setRegistratedCourseDataByStudent(registratedCourseData);

        const sessions = registratedCourseData.flatMap((courseItem: any) => {
          const {
            course: { name: courseName },
            course: { session },
          } = courseItem;

          return session.map((sessionItem: any) => ({
            ...sessionItem,
            course: courseName,
          }));
        });

        setStudentSession(
          sessions.filter((session) => {
            const sessionEndDate = new Date(session.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return sessionEndDate >= today;
          })
        );
      } else {
        setHasRegistratedCourse(false);
      }
    }
  };

  const getProfile = (response: Student) => {
    const {
      educationalClasses,
      registratedCourse,
    }: { educationalClasses: any; registratedCourse: any } = response;
    const { courseSelection } = educationalClasses;
    if (registratedCourse.length < 1) {
      setAssignedCourse(
        courseSelection
          .filter(
            (courseSelectionItem: any) => courseSelectionItem.courses.length < 2
          )
          .map((courseSelectionItem: any) => ({
            label: courseSelectionItem.label,
            credit: courseSelectionItem.credit,
            course: courseSelectionItem.courses[0],
          }))
      );
    } else {
      setHasRegistratedCourse(true);
      setAssignedCourse(
        courseSelection.map((courseSelectionItem: any) => {
          const result: RegistratedCourse[] = registratedCourse.filter(
            (registratedCourseItem: any) => {
              return courseSelectionItem.courses.find(
                (electiveCourse: any) =>
                  electiveCourse._id === registratedCourseItem.course._id
              );
            }
          );

          return {
            label: courseSelectionItem.label,
            credit: courseSelectionItem.credit,
            course: result[0].course,
          };
        })
      );
    }
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
      name: "Cours",
      selector: (row: any) => row?.course,
      maxWidth: screenSize.width < 1000 ? "100px" : "250px",
      sortable: true,
      cell: (row: any) => {
        return <div>{`${row?.course}`}</div>;
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
  ];

  useEffect(() => {
    getStudentSessionData();
  }, [hasRegistratedCourse]);

  return (
    <>
      <div className={style.container}>
        {isLoading && <Loader></Loader>}
        {isOpen && (
          <ErrorModal
            close={closeModal}
            message={message}
            light={true}
            color={isSuccess ? "#0fc3ed" : "#dc3545"}
          ></ErrorModal>
        )}
        <div className={style.containerPage}>
          <AddSection
            title={"Cours"}
            subtitle=""
            redirectLink={"/add"}
            isLoading={false}
            isDisableAdd={hasRegistratedCourse}
            isFullWidthContent={true}
            submitService={EducationalClassesSubmitService}
          >
            <div className={style.formContainer}>
              <CoursValidationFormFields
                onChangeProfile={getProfile}
                assignedCourse={assignedCourse}
                hasRegistratedCourse={hasRegistratedCourse}
              />
            </div>
          </AddSection>
          <div className={style.processingContent}>
            <SessionTab
              columns={SessionColumn}
              data={studentSession}
              noDataMessage={"Aucune séance disponible actuellement."}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursValidation;
