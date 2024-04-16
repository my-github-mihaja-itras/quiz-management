import { Course } from "../course/course.model";
import { CursusType } from "../cursus/cursus.models";

export interface EducationalClasses {
  _id?: string;
  name: string;
  cursus: CursusType;
  schoolYear: string;
  flattedCourseSelection: string[];
  courseSelection: CoursSelection[];
  createdAt: string;
  updatedAt: string;
  schoolYearStart?: string;
  schoolYearEnd?: string;
}

export interface CoursSelection {
  _id?: string;
  label: string;
  credit: Number;
  courses: Course[];
}
