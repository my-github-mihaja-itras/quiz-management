import { OptionsType } from "@/components/shared/form/input-field/input.interface";

export enum EventType {
  SCHOOL_EVENT = "SCHOOL_EVENT",
  ADMIN_EVENT = "ADMIN_EVENT",
  CAMPUS_EVENT = "CAMPUS_EVENT",
}

export interface SchoolEvent {
  _id?: string;
  name: string;
  description: string;
  type: EventType;
  isDeleted: boolean;
  startDate: Date;
  endDate: Date;
}

export const eventTypeOption: OptionsType[] = [
  {
    label: "Événement Scolaire",
    value: EventType.SCHOOL_EVENT,
  },
  {
    label: "Événement Administratif",
    value: EventType.ADMIN_EVENT,
  },
  {
    label: "Événement Publique",
    value: EventType.CAMPUS_EVENT,
  },
];

export interface CreateEventDto {}
