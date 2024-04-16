import { ChoiceFilterType } from "@/components/shared/filter/filter.constant";
import { EducationalClasses } from "@/services/educational-classes/educational-classes.models";

export const educationalClassFilterConstant: ChoiceFilterType[] = [];

export const educationalClassFilterByItem = (
  educationalClasss: EducationalClasses[],
  item: string
) => {
  const results = educationalClasss.filter((educationalClass) => {
    return educationalClass.cursus.name === item;
  });
  return results;
};
