import { Course } from "../course/course.model";
import { EducationalClasses } from "../educational-classes/educational-classes.models";

export interface Session {
  _id?: string;
  date: Date;
  start: string;
  end: string;
  isExam: boolean;
  occupiedClasses: string[] | EducationalClasses[];
  pointing: Pointing[];
  createdAt: string;
  updatedAt: string;
}
export interface SessionWithCourse {
  _id?: string;
  date: Date;
  start: string;
  end: string;
  isActualCourse: boolean;
  isExam: boolean;
  occupiedClasses: string[] | EducationalClasses[];
  pointing: Pointing[];
  course: Course;
  createdAt: string;
  updatedAt: string;
}

export interface Pointing {
  _id?: string;
  arrivalTime: string;
  departureTime: string;
  user: string;
}
export interface EditSessionType {
  _id: string | any;
  date: Date;
  start: string;
  end: string;
  isExam: boolean;
  occupiedClasses: EducationalClasses[] | any[];
}