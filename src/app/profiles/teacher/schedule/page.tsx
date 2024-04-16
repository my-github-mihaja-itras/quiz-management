"use client";

import Timetable from "@/components/timetable/timetable";
import style from "./schedule.module.css";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";

const TeacherTimetable = () => {
  const token = getLocalStorageItem("loginAccessToken") || "";
  const tokenInfo: any = extractTokenInfo(token);

  return (
    <>
      {tokenInfo ? (
        <Timetable
        teacherUserId={tokenInfo?._id}
        />
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
export default TeacherTimetable;
