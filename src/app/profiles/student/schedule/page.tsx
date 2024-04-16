"use client";

import Timetable from "@/components/timetable/timetable";
import { EducationalClasses } from "@/services/educational-classes/educational-classes.models";
import { getStudentByUserId } from "@/services/student/student.service";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import style from "./schedule.module.css";

const StudentTimetable = () => {
  const [studentClassInfo, setStudentInfo] = useState<EducationalClasses>();

  const getStudentInfo = async () => {
    const response = await getStudentByUserId();
    if (
      response?.status === HttpStatusCode.Ok &&
      response.data.data?.educationalClasses
    ) {
      setStudentInfo(response.data.data.educationalClasses);
    }
  };

  useEffect(() => {
    getStudentInfo();
  }, []);

  return (
    <>
      {studentClassInfo ? (
        <Timetable
          classId={studentClassInfo?._id}
          targetCourseName={studentClassInfo?.name}
        ></Timetable>
      ) : (
        <div className={style.container}>
          <span className={style.notFoundData}>
            Il n'y a pas d'emploi du temps pour le moment.
          </span>
        </div>
      )}
    </>
  );
};
export default StudentTimetable;
