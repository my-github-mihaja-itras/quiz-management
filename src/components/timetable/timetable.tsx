"use client";
import style from "./timetable.module.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "moment/locale/fr";
import { Calendar, Formats, View, momentLocalizer } from "react-big-calendar";

import moment from "moment";
import { useEffect, useState } from "react";
import {
  GetOccupiedClassesByCourseId,
  getSessionByClassId,
} from "@/services/session/session.service";
import { HttpStatusCode } from "axios";
import {
  getCourseBySessionId,
  getCourseTeacherByUserId,
} from "@/services/course/course.service";
import { FormattedSessionList } from "@/utils/timetable.utils";
import IconArrowLeft from "../shared/icons/iconArrowLeft";
import { ServerResponse } from "@/cores/constant/response.constant";

const localizer = momentLocalizer(moment);

const customFormats: Formats = {
  dayFormat: (date, culture, localizer) =>
    localizer?.format(date, "dddd DD MMMM", culture) ?? "",
  agendaDateFormat: (date, culture, localizer) =>
    localizer?.format(date, "dddd DD MMMM", culture) ?? "", // Format pour la vue "Agenda"
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    localizer?.format(start, "dddd DD MMMM", culture) +
    " - " +
    localizer?.format(end, "dddd DD MMMM", culture), // Format pour l'entête de plage de jours
  dayHeaderFormat: (date, culture, localizer) =>
    localizer?.format(date, "dddd DD MMMM", culture) ?? "", // Format pour l'entête de jour
};

export interface Props {
  courseId?: string;
  classId?: string;
  teacherUserId?: string;
  targetCourseName?: string;
  onChange?: any;
  onAddButtonChange?: any;
}

export default function Timetable(props: Props) {
  const [classesSession, setClassesSession] = useState<any>([]);
  const [currentView, setCurrentView] = useState<View>("week");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const fetchData = async () => {
    if (props.courseId) {
      const response = await GetOccupiedClassesByCourseId(props.courseId);
      if (response.status == HttpStatusCode.Ok) {
        const sessionsList = response.data.data.sessions;

        const sessionListWithCourse = await Promise.all(
          sessionsList.map(async (session: any) => {
            const courseResponse = await getCourseBySessionId(session._id);
            if (courseResponse.status === HttpStatusCode.Ok) {
              session.course = courseResponse.data.data;
            } else {
              session.course = null;
            }
            session.isActualCourse =
              props.courseId === session.course._id ? true : false;
            return session;
          })
        );

        setClassesSession(FormattedSessionList(sessionListWithCourse));
      }
    } else if (props.classId) {
      const res = await getSessionByClassId(props.classId);
      const sessionsList = res.data.data;
      const sessionListWithCourse = await Promise.all(
        sessionsList.map(async (session: any) => {
          const courseResponse: ServerResponse = await getCourseBySessionId(
            session._id
          );
          if (courseResponse.status === HttpStatusCode.Ok) {
            session.course = courseResponse.data?.data;
          } else {
            session.course = null;
          } 
          session.isActualCourse =
            session.course._id === props.courseId ? true : false;
          session.occupiedClasses = session?.occupiedClasses?.filter((classes: { _id: string; })=>classes._id === props.classId)
          return session;
        })
      );
      setClassesSession(FormattedSessionList(sessionListWithCourse));
    } else if (props.teacherUserId) {
      const res = await getCourseTeacherByUserId(props.teacherUserId);
      const sessionsList = res.data.data;
      const flattenedSessionsList = sessionsList.flatMap((course: any) => {
        const { name, _id, code, session } = course;

        return session.map((sessionItem: any) => ({
          course: { _id: _id, name: name, code: code },
          _id: sessionItem._id,
          date: sessionItem.date,
          start: sessionItem.start,
          end: sessionItem.end,
          isActualCourse: false,
          isExam: sessionItem.isExam,
          occupiedClasses: sessionItem.occupiedClasses,
        }));
      });

      setClassesSession(FormattedSessionList(flattenedSessionsList));
    }
  };

  const handleViewChange = (newView: View) => {
    setCurrentView(newView);
  };

  const handleNavigateChange = (newDate: Date, view: View, action: string) => {
    setCurrentView(view);
    setCurrentDate(newDate);
  };

  const eventStyleGetter = (
    event: any,
    start: any,
    end: any,
    isSelected: boolean
  ) => {
    var style = {
      backgroundColor: event.bg,
      borderRadius: "0px",
      font: "Roboto",
      opacity: 1,
      color: event.color,
      border: "1px solid #FFFFFF",
      display: "block",
    };
    return {
      style: style,
    };
  };

  useEffect(() => {
    fetchData();
  }, [props.classId, props.onChange]);
  return (
    <div
      className={
        props.classId || props.teacherUserId
          ? style.container2
          : style.container
      }
    >
      <div className={style.header}>
        {props.onAddButtonChange && (
          <button
            className={style.btnBack}
            type="button"
            onClick={props.onAddButtonChange}
          >
            <IconArrowLeft />
          </button>
        )}

        <span className={style.title}>Emploi du temps </span>
        {props.classId && (
          <span className={style.courseName}>{props.targetCourseName}</span>
        )}
      </div>
      <Calendar
        culture={"fr"}
        localizer={localizer}
        events={classesSession}
        enableAutoScroll={true}
        startAccessor="start"
        endAccessor="end"
        className={style.calendar}
        view={currentView}
        onView={handleViewChange}
        onNavigate={handleNavigateChange}
        date={currentDate}
        messages={{
          month: "Mois",
          day: "Jour",
          agenda: "Agenda",
          today: "Aujourd'hui",
          next: "Suivant",
          previous: "Précédent",
          week: "Semaine",
        }}
        min={
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            8
          )
        }
        max={
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            18
          )
        }
        eventPropGetter={eventStyleGetter}
        formats={customFormats}
      />
    </div>
  );
}
