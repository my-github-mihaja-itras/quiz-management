import { Group } from "../group/group.models";

export interface PrivilegeType {
  _id?: string;
  name: string;
  group: Group[];
  alias: string;
}
