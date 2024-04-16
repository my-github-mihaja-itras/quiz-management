import { SessionWithCourse } from "@/services/session/session.model";

export const FormattedSessionList = (sessions: SessionWithCourse[]) => {
  const formattedList = sessions
    .map((session) => {
      const classNames = session.occupiedClasses.map(
        (classe: any) => classe.name
      );

      const splited = {
        year: new Date(session.date).getFullYear(),
        month: new Date(session.date).getMonth(),
        day: new Date(session.date).getDate(),
      };   
      const formattedSessions = classNames.map((className) => ({
        title: (
          <>
            <div>{className}</div>
            <div>
              {session?.isExam
                ? session?.course?.name + " (Examen)"
                : session?.course?.name}
            </div>
          </>
        ),
        start: new Date(
          splited.year,
          splited.month,
          splited.day,
          Number(session.start.slice(0, 2)),
          Number(session.start.slice(3, 5))
        ),
        end: new Date(
          splited.year,
          splited.month,
          splited.day,
          Number(session.end.slice(0, 2)),
          Number(session.end.slice(3, 5))
        ),
        bg: session?.isExam ? SessionColor.GREEN : session.isActualCourse ? SessionColor.LIGHTBLUE:  loadColor(className)?.bg,
        color: "#FFFFFFF",
        borderRadius: "5px",
      }));

      return formattedSessions;
    })
    .flat();
  return formattedList;
};

const loadColor = (className: string) => {
  switch (className?.split(" ")[0]) {
    case "L1":
      return { bg: SessionColor.BLUE, color: "#fff" };
    case "L2":
      return { bg: SessionColor.YELLOW, color: "#fff" };
    case "L3":
      return { bg: SessionColor.RED, color: "#fff" };
    default:
      break;
  }
};

export enum SessionColor {
  RED = "#f52b24",
  YELLOW = "#fbc80e",
  BLUE = "#0FC3ED",
  GREEN = "#60A917",
  LIGHTBLUE = "#A9C4EB",
}
