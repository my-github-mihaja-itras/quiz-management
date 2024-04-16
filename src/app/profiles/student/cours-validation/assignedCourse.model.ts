import { Course } from "@/services/course/course.model";

export interface AssignedCourse {
    label: string;
    credit: Number;
    course: Course;
}