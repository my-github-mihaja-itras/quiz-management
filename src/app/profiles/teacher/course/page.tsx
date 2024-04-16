"use client";
import SessionTab from "@/components/shared/sessionTab/sessionTab.component";
import style from "./teacher.course.module.css";
import { Session } from "@/services/session/session.model";
import { useEffect, useState } from "react";
import UseWindowSize from "@/cores/window/window.size";
import { formatDateToLocal } from "@/utils/date.utils";
import { Media } from "react-data-table-component";
import { Course, translateSemesterValue } from "@/services/course/course.model";
import { getTeacherByUserId } from "@/services/teacher/teacher.service";
import { HttpStatusCode } from "axios";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import { getCourseTeacherByUserId } from "@/services/course/course.service";
import { ServerResponse } from "@/cores/constant/response.constant";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import IconEdit from "@/components/shared/icons/iconEdit";
import { EducationalClasses } from "@/services/educational-classes/educational-classes.models";
import { BeansCell } from "@/components/shared/dropdown/cell.style";

const TeacherCourse = () => {
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [coursSessionData, setCourseSessionData] = useState<Session[] | any>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = getLocalStorageItem("loginAccessToken") || "";
  const tokenInfo: any = extractTokenInfo(token);
  const userId = tokenInfo._id;
  const router = useRouter();
  const screenSize = UseWindowSize();

  const [hasRegistratedCourse, setHasRegistratedCourse] =
    useState<boolean>(false);

  const getCourseData = async () => {
    setIsLoading(true);
    const response: ServerResponse = await getCourseTeacherByUserId(userId);
    if (response.status == HttpStatusCode.Ok) {
      setIsLoading(false);
      const courses: Course[] = response.data?.data;
      const transformerCourseData = courses.flatMap((course) => {
        const seenClasses = new Set<string>();
        const occupiedClasses = course.session.flatMap((session) =>
          session.occupiedClasses.filter((occupiedClass: any) => {
            const key = `${occupiedClass.name}-${occupiedClass.schoolYear}`;
            if (seenClasses.has(key)) {
              return false;
            } else {
              seenClasses.add(key);
              return true;
            }
          })
        );
        return [{ ...course, occupiedClasses }];
      });

      setCourseData(transformerCourseData);
      const flattedSessionData = courses.flatMap((course) => {
        return course.session.map((session) => {
          return {
            course: course.name,
            date: session.date,
            start: session.start,
            end: session.end,
            occupiedClasses: session.occupiedClasses,
            isExam: session.isExam,
          };
        });
      });
      setCourseSessionData(
        flattedSessionData.filter((session) => {
          const sessionEndDate = new Date(session.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return sessionEndDate >= today;
        })
      );
    }
  };

  const CoursColumn = [
    {
      name: "Nom",
      selector: (row: Course) => row?.name,
      sortable: true,
      maxWidth: "auto",
    },
    {
      name: "Semestre",
      selector: (row: Course) => row?.semester,
      sortable: true,
      hide: Media.SM,
      // maxWidth: "100px",
      cell: (row: Course) => {
        return translateSemesterValue(row?.semester);
      },
    },
    {
      name: "Classe",
      selector: (row: EducationalClasses) => row?.name,
      maxWidth: "auto",
      sortable: true,
      hide: Media.SM,
      cell: (row: Session) => {
        const occupiedClasses = row?.occupiedClasses;
        return (
          <div className={style.rowCenter}>
            {occupiedClasses.length > 0
              ? occupiedClasses.map((classe: any, index) => (
                  <BeansCell key={index}>{classe.name}</BeansCell>
                ))
              : "Aucune"}
          </div>
        );
      },
    },
    {
      name: "",
      button: true,
      allowOverflow: true,
      width: "5%",
      right: true,
      cell: (row: Course) => {
        function handleEdit(_id: string): void {
          router.push("/profiles/teacher/course/" + _id);
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
      name: "Classe",
      selector: (row: EducationalClasses) => row?.name,
      maxWidth: "auto",
      sortable: true,
      hide: Media.SM,
      cell: (row: Session) => {
        const occupiedClasses = row?.occupiedClasses;
        return (
          <div className={style.rowCenter}>
            {occupiedClasses.length > 0
              ? occupiedClasses.map((classe: any, index) => (
                  <BeansCell key={index}>{classe.name}</BeansCell>
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
  ];

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <div className={style.container}>
      <SessionTab
        columns={CoursColumn}
        data={courseData}
        title="Cours"
        noDataMessage={"Aucune cours disponible"}
        isLoading={isLoading}
      />
      <SessionTab
        columns={SessionColumn}
        data={coursSessionData}
        noDataMessage={"Aucune séance disponible actuellement."}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TeacherCourse;
