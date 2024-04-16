import { RegistratedCourse } from "../course/course.model";
import { EducationalClasses } from "../educational-classes/educational-classes.models";
import { User } from "../user/user.models";

export interface Student {
  _id: string;
  registrationNumber: string;
  educationalClasses: EducationalClasses;
  user: User;
  registratedCourse: RegistratedCourse[];
}
