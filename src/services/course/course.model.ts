import { EducationalClasses } from "../educational-classes/educational-classes.models";
import { Session } from "../session/session.model";
import { Teacher } from "../teacher/teacher.models";

export interface Course {
  _id: String;
  name: string;
  code: string;
  teacher: Teacher;
  semester: Semester;
  session: Session[];
  createdAt: string;
  updatedAt: string;
}

export interface createCourseDto {
  name: string;
  code: string;
  teacher: Teacher;
  semester: Semester;
  session: Session[];
}

export interface RegistratedCourse {
  _id: string;
  course: Course | String | any;
  average: Number;
  result: Result[];
}

export interface Result {
  note: number;
  examDate: Date;
}

export enum Semester {
  SEMESTER_1 = "SEMESTER_1",
  SEMESTER_2 = "SEMESTER_2",
  SEMESTER_3 = "SEMESTER_3",
  SEMESTER_4 = "SEMESTER_4",
  SEMESTER_5 = "SEMESTER_5",
  SEMESTER_6 = "SEMESTER_6",
  SEMESTER_7 = "SEMESTER_7",
  SEMESTER_8 = "SEMESTER_8",
  SEMESTER_9 = "SEMESTER_9",
  SEMESTER_10 = "SEMESTER_10",
}

export const semesterOption = [
  { label: "Semestre 1", value: Semester.SEMESTER_1 },
  { label: "Semestre 2", value: Semester.SEMESTER_2 },
  { label: "Semestre 3", value: Semester.SEMESTER_3 },
  { label: "Semestre 4", value: Semester.SEMESTER_4 },
  { label: "Semestre 5", value: Semester.SEMESTER_5 },
  { label: "Semestre 6", value: Semester.SEMESTER_6 },
  { label: "Semestre 7", value: Semester.SEMESTER_7 },
  { label: "Semestre 8", value: Semester.SEMESTER_8 },
  { label: "Semestre 9", value: Semester.SEMESTER_9 },
  { label: "Semestre 10", value: Semester.SEMESTER_10 },
];

export const translateSemesterValue = (value: string) => {
  switch (value) {
    case Semester.SEMESTER_1:
      return "Semestre 1";
    case Semester.SEMESTER_2:
      return "Semestre 2";
    case Semester.SEMESTER_3:
      return "Semestre 3";
    case Semester.SEMESTER_4:
      return "Semestre 4";
    case Semester.SEMESTER_5:
      return "Semestre 5";
    case Semester.SEMESTER_6:
      return "Semestre 6";
    case Semester.SEMESTER_7:
      return "Semestre 7";
    case Semester.SEMESTER_8:
      return "Semestre 8";
    case Semester.SEMESTER_9:
      return "Semestre 9";
    case Semester.SEMESTER_10:
      return "Semestre 10";
  }
};
