"use client";

import style from "./event.calendar.module.css";
import IconFullCalendar from "../icons/iconFullCalendar";
import { getGradientColor } from "@/utils/color.utils";
import { SchoolEvent } from "@/services/events/event.interface";
import { formatDate } from "@/utils/date.utils";

interface EventCalendarProps {
  data: SchoolEvent[];
  isAStudent: boolean;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ data, isAStudent }) => {
  return (
    <section className={style.event}>
      <div className={style.contentHeader}>
        <IconFullCalendar />
        Événements du calendrier universitaire
      </div>
      <div
        className={isAStudent ? `${style.eventList2}` : `${style.eventList}`}
      >
        {data?.map((event, index) => (
          <div
            className={`${style.eventWtapper} ${
              index != 0 ? style.bordered : ""
            }`}
            key={index}
          >
            <div
              className={style.eventDate}
              style={{ background: data.length === 1 ? "#0231A8" : getGradientColor(index, data.length) }}
            >
              {formatDate(event.startDate.toString())}
            </div>
            <div className={style.eventContent}>{event.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventCalendar;
