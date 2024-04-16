import { User } from "../user/user.models";


export interface Teacher {
  _id: string;
  user: User;
  timeWork: number;
  createdAt: string;
  updatedAt: string;
}
export interface createTeacherDto {
  user: User;
  timeWork: number;
 }