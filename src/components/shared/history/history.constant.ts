import { User } from "@/services/user/user.models";


export interface HistoryType {
  _id?: string;
  action: {
    name: string;
    proof?: string;
  };
  user: User;
  targetId: string;
  entity: string;
  createdAt?: string;
  updatedAt?: string;
}
