import { ChoiceFilterType } from "@/components/shared/filter/filter.constant";
import { Administration } from "@/services/administration/administration.model";

export const administrationFilterConstant: ChoiceFilterType[] = [];

export const administrationFilterByItem = (
  administrations: Administration[] | any,
  item: string
) => {
  const results = administrations.filter((administration: any) => {
    return (
      administration.user.groups[0].name === item ||
      administration.user.roles[0].name === item
    );
  });
  return results;
};

export const adminFilterOptionConstant = [
  {
    label: "Date de création",
    value: "createdAt",
  },
  {
    label: "Date de modification",
    value: "updatedAt",
  },
];
