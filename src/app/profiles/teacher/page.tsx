"use client";

import { useEffect, useState } from "react";
import style from "./teacher.module.css";
import { User } from "@/services/user/user.models";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import { GetUserById } from "@/services/user/user-service";
import { HttpStatusCode } from "axios";
import Banner from "@/components/shared/banner/banner.component";
import EventCalendar from "@/components/shared/event-calendar/event.calendar";
import { SchoolEvent } from "@/services/events/event.interface";
import { GetPaginatedEvent } from "@/services/events/event.service";

const TeacherProfile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const token: string | null = getLocalStorageItem("loginAccessToken");
  const userInfo: any = token ? extractTokenInfo(token) : null;

  const [events, setEvents] = useState<SchoolEvent[]>([]);

  const loadTeacherUserData = async () => {
    const response = await GetUserById(userInfo._id);
    if (response.status === HttpStatusCode.Ok) {
      setUserData(response.data.data);
    }
  };

  const getEventData = async () => {
    const events = await GetPaginatedEvent(1, 100);
    if (events) {
      setEvents(events.data.items);
    }
  };

  useEffect(() => {
    loadTeacherUserData();
    getEventData();
  }, []);
  return (
    <div className={style.container}>
      <Banner userData={userData as User} />
      <EventCalendar data={events} isAStudent={true} />
    </div>
  );
};

export default TeacherProfile;
