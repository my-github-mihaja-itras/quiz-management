import { Semester } from "../course/course.model";

export interface CourseUpdateDto {
  code?: string;
  name?: string;
  semester?: Semester;
  teacher?: string;
}
