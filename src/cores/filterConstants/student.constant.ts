import {
  ChoiceFilterType,
  ParsedType,
} from "@/components/shared/filter/filter.constant";
import { StudentCursus, StudentLevel } from "../constant/constant.application";
import { Student } from "@/services/student/student.models";

export const studentFilterConstant: ChoiceFilterType[] = [];

export const studentFilterByItem = (students: Student[], item: string) => {
  const results = students.filter((student) => {
    const byEducationalName = student.educationalClasses.name === item;
    const byRegistrationNumber = student.registrationNumber === item;
    const byFirstName = student.user.firstname === item;
    const byLastName = student.user.lastname === item;
    // const byExmNote = student.registratedCourse.map((course)=> course.result) === item
    return (
      byEducationalName || byRegistrationNumber || byFirstName || byLastName
    );
  });
  return results;
};

export const studentFilterOptionConstant = [
  {
    label: "Date de création",
    value: "createdAt",
  },
  {
    label: "Date de modification",
    value: "updatedAt",
  },
];
