"use client";

import style from "./note.module.css";
import { Student } from "@/services/student/student.models";
import { getStudentByUserId } from "@/services/student/student.service";
import { HttpStatusCode } from "axios";
import { ServerResponse } from "@/cores/constant/response.constant";
import { useEffect, useState } from "react";
import CourseTab from "@/components/shared/courseTab/courseTab.component";
import { CoursSelection } from "@/services/educational-classes/educational-classes.models";
import UseWindowSize from "@/cores/window/window.size";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import IconEdit from "@/components/shared/icons/iconEdit";

const StudentExamResult = () => {
  const [courseData, setCourseData] = useState<Student | any>();
  const [studentData, setStudentData] = useState<Student>();

  const fetchData = async () => {
    const res: ServerResponse = await getStudentByUserId();
    if (res.status === HttpStatusCode.Ok) {
      const studentData: Student = res.data.data;
      setCourseData(studentData?.educationalClasses?.courseSelection);
      setStudentData(studentData);
    }
  };
  const screenSize = UseWindowSize();

  const courseColumn = [
    {
      name: "Unité Enseignement",
      selector: (row: CoursSelection) => row?.label,
      maxWidth: "25%",
      sortable: false,
      cell: (row: CoursSelection) => {
        const label = row?.label;
        return <div>{label}</div>;
      },
    },
    {
      name: "Crédit",
      selector: (row: CoursSelection) => row?.credit,
      maxWidth: "15%",
      sortable: true,
      cell: (row: CoursSelection) => {
        const credit = row?.credit;
        return <div>{credit.toString()}</div>;
      },
    },
    {
      name: "Cours",
      selector: (row: CoursSelection) => row?.courses,
      maxWidth: "35%",
      sortable: false,
      cell: (row: CoursSelection) => {
        const studentCourseIds = studentData?.registratedCourse?.map(
          (course: { course: any }) => course.course._id
        );
        const obligatoryCourse =
          studentData?.educationalClasses?.courseSelection.map(
            (course: { courses: any }) => {
              if (course.courses.length === 1) {
                return course.courses[0]._id;
              }
            }
          );
        const courseName = row?.courses
          .map((course) => {
            if (
              studentCourseIds?.includes(course._id) === true ||
              (obligatoryCourse?.includes(course._id) === true &&
                course.name != undefined)
            ) {
              return course.name;
            }
          })
          .filter((course) => course !== undefined);
        return (
          <div
            style={
              courseName.length>0 ? {} : { color: "red", fontSize: "13px" }
            }
          >
            {courseName.length > 0 ? courseName : "Non sélectionné"}
          </div>
        );
      },
    },
    {
      name: "Moyenne",
      maxWidth: "20%",
      sortable: true,

      cell: (row: CoursSelection) => {
        const studentCourseIds = studentData?.registratedCourse?.map(
          (course: { course: any }) => course.course._id
        );

        const obligatoryCourse =
          studentData?.educationalClasses?.courseSelection.map(
            (course: { courses: any }) => {
              if (course.courses.length === 1) {
                return course.courses[0]._id;
              }
            }
          );
        const courseId = row?.courses
          .map((course) => {
            if (
              studentCourseIds?.includes(course._id) === true ||
              obligatoryCourse?.includes(course._id) === true
            ) {
              return course._id;
            }
          })
          .filter((course) => course !== undefined);
        const foundCourse = studentData?.registratedCourse.find(
          (e: any) => e.course._id === courseId[0]
        );

        return (
          <div
            style={
              foundCourse?.average && foundCourse?.average >= new Number(10)
                ? { color: "#0231A8" }
                : { color: "red" }
            }
          >
            {foundCourse?.average.toString() || 0}
          </div>
        );
      },
    },
    {
      name: "",
      button: true,
      allowOverflow: true,
      accessor: "actionColumn",
      disableSortBy: true,
      width: "5%",
      cell: (row: CoursSelection) => {
        const router = useRouter();
        const studentCourseIds = studentData?.registratedCourse?.map(
          (course: { course: any }) => course.course._id
        );

        const obligatoryCourse =
          studentData?.educationalClasses?.courseSelection.map(
            (course: { courses: any }) => {
              if (course.courses.length === 1) {
                return course.courses[0]._id;
              }
            }
          );
        const courseId = row?.courses
          .map((course) => {
            if (
              studentCourseIds?.includes(course._id) === true ||
              obligatoryCourse?.includes(course._id) === true
            ) {
              return course._id;
            }
          })
          .filter((course) => course !== undefined);
        const foundCourse: any = studentData?.registratedCourse.find(
          (e: any) => e.course._id === courseId[0]
        );

        function handleConsult(_id?: string): void {
          router.push("note/" + foundCourse?.course?._id);
          // router.push("/note/" + _id);
        }
        const [openDropdownId, setOpenDropdownId] = useState(null);
        const handleToggleDropdown = (id: any) => {
          setOpenDropdownId((prevId) => (prevId === id ? null : id));
        };

        return (
          <div>
            <Dropdown
              key={foundCourse?.course?._id}
              id={foundCourse?.course?._id}
              isOpen={openDropdownId === foundCourse?.course?._id}
              onToggle={handleToggleDropdown}
            >
              <button onClick={() => handleConsult(foundCourse?.course?._id)}>
                <IconEdit /> <span style={{ color: "#0231A8" }}>Consulter</span>
              </button>
            </Dropdown>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={style.container}>
      <CourseTab columns={courseColumn} data={courseData} isExamResult={true} />
    </div>
  );
};
export default StudentExamResult;
