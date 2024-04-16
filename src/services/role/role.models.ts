
import { Group } from "../group/group.models";
import { PrivilegeType } from "../privilege/privilege.models";

export interface Role {
  _id?: string;
  name: string;
  alias: string;
  color: string;
  description: string;
  groups: Group[];
  privileges: PrivilegeType[]
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleTypeToInsert {
  _id?: string;
  name: string;
  alias: string;
  color: string;
  description: string;
  groups: string[];
  privileges: string[];
  createdAt?: string;
  updatedAt?: string;
}
