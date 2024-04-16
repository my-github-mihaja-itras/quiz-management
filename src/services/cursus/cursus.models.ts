import { HistoryType } from "@/components/shared/history/history.constant";

export interface CursusType {
  _id?: string;
  name: string;
  description?: string;
}

export interface CursusAndHistory {
  cursus: CursusType;
  history?: HistoryType;
}
export interface CursusMutipleToInsert {
  cursusToInsert: CursusAndHistory[];
}
