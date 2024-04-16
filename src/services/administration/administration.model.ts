import { User } from "../user/user.models";

export interface Administration {
  _id?: string;
  user?: User;
  position: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface createAdministrationDto {
  user: User;
  position: string;
}
