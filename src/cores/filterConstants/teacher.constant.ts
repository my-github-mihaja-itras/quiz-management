import { ChoiceFilterType } from "@/components/shared/filter/filter.constant";
import { Teacher } from "@/services/teacher/teacher.models";

export const teacherFilterConstant: ChoiceFilterType[] = [];

export const teacherFilterByItem = (teachers: Teacher[], item: string) => {
  const results = teachers.filter((teacher) => {
    return (
      teacher.user?.groups[0].name === item ||
      teacher?.user?.roles[0].name === item
    );
  });
  return results;
};

export const teacherFilterOptionConstant = [
  {
    label: "Date de création",
    value: "createdAt",
  },
  {
    label: "Date de modification",
    value: "updatedAt",
  },
];
