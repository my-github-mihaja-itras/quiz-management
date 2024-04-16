import {
  ChoiceFilterType,
  FilterKeywords,
  ParsedType,
} from "@/components/shared/filter/filter.constant";
import { User } from "@/services/user/user.models";

export const userFilterConstant: ChoiceFilterType[] = [];

export const userFilterByItem = (users: User[], item: any) => {
  const results = users.filter((user) => {
    return (
      user.groups.map((group) => group.name === item) ||
      user.roles.map((role) => role.name === item) ||
      user.isActive === item
    );
  });
  return results;
};

export enum USER_SEARCH_FIELDS {
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  USERNAME = "username",
  CREATION_DATE = "creationDate",
}

export const userDateFilterOptionConstant = [
  {
    label: "Date de création",
    value: "createdAt",
  },
  {
    label: "Date de modification",
    value: "updatedAt",
  },
  {
    label: "Date de naissance",
    value: "birthDate",
  },
];
