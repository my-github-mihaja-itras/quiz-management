import { ChoiceFilterType } from "@/components/shared/filter/filter.constant";
import { Role } from "@/services/role/role.models";

export const roleFilterConstant: ChoiceFilterType[] = [];

export const roleFilterByItem = (roles: Role[], item: string) => {
  const results = roles.filter((role) => {
    return role.groups.map((group) => group.name === item);
  });
  return results;
};

export const roleFilterOptionConstant = [
  {
    label: "Date de création",
    value: "createdAt",
  },
  {
    label: "Date de modification",
    value: "updatedAt",
  },
];
