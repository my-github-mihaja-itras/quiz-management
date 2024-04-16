import { EventType } from "@/services/events/event.interface";

export const formatEventType = (eventType: EventType) => {
  switch (eventType) {
    case EventType.ADMIN_EVENT:
      return "Évènement Administratif";
    case EventType.CAMPUS_EVENT:
      return "Évènement Universitaire";
    case EventType.SCHOOL_EVENT:
      return "Évènement Scolaire";
  }
};
