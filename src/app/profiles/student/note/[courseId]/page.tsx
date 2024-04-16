"use client";

import style from "./details.module.css";
import { ServerResponse } from "@/cores/constant/response.constant";
import { Student } from "@/services/student/student.models";
import { getStudentResultByCourseId } from "@/services/student/student.service";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { CoursSelection } from "@/services/educational-classes/educational-classes.models";
import { formatDate } from "@/utils/date.utils";
import { NoDataComponent } from "@/components/shared/courseTab/courseTab.component";

const NoteDetail = ({ params }: { params: { courseId: string } }) => {
    const [studentResultData,setStudentResultData] = useState<any>();
    const [dataNotFound, setDataNotFound] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getStudentData = async () => {
        const response: ServerResponse = await getStudentResultByCourseId(params.courseId);
        if (response.status === HttpStatusCode.Ok) {
          setDataNotFound(false);
          setIsLoading(false);
          const student: Student = response?.data.data;
          setStudentResultData(student)
    
         } else {
          setDataNotFound(true);
          setIsLoading(false);
        }
        setIsLoading(false);
      };
    
    useEffect(() => {
    getStudentData();
  }, []);
    return (
      <div>
        {studentResultData ? 
        <>
        <div className={style.container}>
          <div className={style.title}>
            <span>{studentResultData?.registratedCourse[0].course.name}</span>
          </div>
          <br />
          <div className={style.content}>
            <div className={style.header}>
              <p>Date de l'examen</p>
              <p>note</p>
            </div>
            {studentResultData?.registratedCourse[0]?.result?.map((result: any, index: number) => (
              <div className={style.row} key={index}>
                <p>{formatDate(result.examDate)}</p>
                <p>{result.note}</p>
              </div>
            ))}
          </div>
        </div>
        </>
        :
        <>
          <NoDataComponent/>
        </>
        }
      </div>
    );
}
export default NoteDetail;
