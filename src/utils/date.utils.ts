import { Session } from "@/services/session/session.model";

export function getDate(dateString: any): string {
  const date = new Date(dateString);
  const day = date.toLocaleDateString();
  return `${day}`;
}
export function getTime(dateString: any): string {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

export function formatDate(date: string) {
  const dateObject = new Date(date);

  const formatter = new Intl.DateTimeFormat("Fr", {
    dateStyle: "medium",
  });

  return formatter.format(dateObject);
}

export const isoDateStringToDate = (isoString: string): string => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export function formatDateToLocal(dateStr: any): string {
  const weeksDay = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const date = new Date(dateStr);
  const weekDay = weeksDay[date.getDay()];
  const day = date.getDate();
  const recentMonth = months[date.getMonth()];
  const year = date.getFullYear();
  return `${weekDay}, ${day} ${recentMonth} ${year}`;
}
export interface CompareTimeValue {
  error: boolean;
  type: CompareTimeMessageType;
}

export enum CompareTimeMessageType {
  MIN = "MIN",
  MAX = "MAX",
  EQUAL = "EQUAL",
  SUCCESS = "SUCCESS",
  OVER = "OVER",
}

export const compareTime = (start: string, end: string): CompareTimeValue => {
  const startTime = start.split(":").map(Number);
  const endTime = end.split(":").map(Number);

  const startMinutes = startTime[0] * 60 + startTime[1];
  const endMinutes = endTime[0] * 60 + endTime[1];
  const differenceInMinutes = endMinutes - startMinutes;

  if (startTime[0] === endTime[0] && startTime[1] === endTime[1]) {
    return { error: true, type: CompareTimeMessageType.EQUAL };
  } else if (
    startTime[0] > endTime[0] ||
    (startTime[0] === endTime[0] && startTime[1] >= endTime[1])
  ) {
    return { error: true, type: CompareTimeMessageType.MAX };
  } else if (startTime[0] <= 7 || endTime[0] >= 18) {
    return { error: true, type: CompareTimeMessageType.OVER };
  } else if (differenceInMinutes < 60) {
    return { error: true, type: CompareTimeMessageType.MIN };
  } else {
    return { error: false, type: CompareTimeMessageType.SUCCESS };
  }
};

export const combineDateTime = (date: string, time: string): Date => {
  const dateTimeString = `${date}T${time}`;
  return new Date(dateTimeString);
};

export const checkSessionConflict = (
  newSession: any,
  existingSessions: Session[]
): any => {
  const existingFilteredSession = existingSessions.filter(
    (session) =>
      new Date(session.date).toLocaleDateString() ===
      new Date(newSession.date).toLocaleDateString()
  );
  
  if (existingFilteredSession.length > 0) {
    const conflictingSessions = existingFilteredSession.filter((session) => {
      const sessionStart = new Date("1970-01-01T" + session.start);
      const sessionEnd = new Date("1970-01-01T" + session.end);
      const newSessionStart = new Date("1970-01-01T" + newSession.start);
      const newSessionEnd = new Date("1970-01-01T" + newSession.end);
      if (
        (newSessionStart >= sessionStart && newSessionStart < sessionEnd) ||
        (newSessionEnd > sessionStart && newSessionEnd <= sessionEnd) ||
        (newSessionStart <= sessionStart && newSessionEnd >= sessionEnd)
      ) {
        return true;
      }
      return false;
    });

    if (conflictingSessions.length > 0) {
      return true;
    } else {      
      return false;
    }
  }
  else {
    return false;
  }
};

