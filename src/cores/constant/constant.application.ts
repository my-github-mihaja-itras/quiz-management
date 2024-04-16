import { OptionsType } from "@/components/shared/form/input-field/input.interface";
import { StatutList } from "@/components/shared/statuts/status.component";

export enum ApplicationStatus {
  UNREAD = "UNREAD",
  IN_PROCESSING = "IN_PROCESSING",
  REGISTRATED_FOR_COMPETITION = "REGISTRATED_FOR_COMPETITION",
  ACCEPTED_FOR_INTERVIEW = "ACCEPTED_FOR_INTERVIEW",
  INTERVIEWED = "INTERVIEWED",
  REQUEST_ACCEPTED = "REQUEST_ACCEPTED",
  REQUEST_REFUSED = "REQUEST_REFUSED",
}

export enum StudentCursus {
  DEV_FULLSTACK = "DEV_FULLSTACK",
  ADMIN_SYSTEME = "ADMIN_SYSTEME",
  DEV_OPS = "DEV_OPS",
}

export enum StudentLevel {
  FAILED = "FAILED",
  L1 = "L1",
  L2 = "L2",
  L3 = "L3",
  M1 = "M1",
  M2 = "M2",
}

export const statusList: StatutList[] = [
  {
    label: "Non lu",
    value: ApplicationStatus.UNREAD,
    color: "#FFA319",
    bg: "#FFECD1",
  },
  {
    label: "En traitement",
    value: ApplicationStatus.IN_PROCESSING,
    color: "#0FC3ED",
    bg: "#D6F2FF",
  },
  {
    label: "Inscrits au Bootcamp",
    value: ApplicationStatus.REGISTRATED_FOR_COMPETITION,
    color: "#57CA22",
    bg: "#DDF4D2",
  },
  {
    label: "En attente d'entretien",
    value: ApplicationStatus.ACCEPTED_FOR_INTERVIEW,
    color: "#FFA319",
    bg: "#FFECD1",
  },
  {
    label: "Interviewé",
    value: ApplicationStatus.INTERVIEWED,
    color: "#33C2FF",
    bg: "#D6F2FF",
  },
  {
    label: "Candidats Accepté",
    value: ApplicationStatus.REQUEST_ACCEPTED,
    color: "#57CA22",
    bg: "#DDF4D2",
  },
  {
    label: "Candidats refusés",
    value: ApplicationStatus.REQUEST_REFUSED,
    color: "#D35151",
    bg: "#FFD1D9",
  },
];
