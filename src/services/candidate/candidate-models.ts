import { ApplicationStatus } from "@/cores/constant/constant.application";

export interface CandidateType {
  _id: string;
  applicationStatus: string | ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  diploma: DiplomaType[];
  certification: CertificationType[];
  competitionResult: CompetitionResultType;
  motivation: string;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    address: string;
    birthDate: string;
    birthPlace: string;
    creationDate: string;
    email: string;
    gender: string;
    phone: string[];
    groups: string[];
    roles: string[];
    isActive: string;
    photo?: string;
  };
}

export interface PersonalType {
  _id: string;
  firstname: string;
  lastname: string;
  address: string;
  birthDate: Date | string;
  birthPlace: string;
  creationDate: Date | string;
  email: string;
  gender: string;
  groups: any[];
  isActive?: boolean;
  isDelete?: boolean;
  phone: string[];
  photo?: string;
  roles: any[];
  username: string;
  password?: string;
}
export interface DiplomaType {
  _id: string;
  name: string;
  obtentionYear: string;
  option: string;
  school: string;
  attachement: string;
}

export interface CertificationType {
  _id: string;
  name: string;
  startDate: Date | string;
  endDate: Date | string;
  institution: string;
  attachement: string;
}

export interface CompetitionResultType {
  totalTasksNumber: number;
  finishedTasksNumber: number;
  TaskDetails: any[];
  _id: string;
}

