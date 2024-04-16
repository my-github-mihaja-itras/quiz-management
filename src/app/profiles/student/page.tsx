"use client";

import style from "./student.module.css";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import { useEffect, useState } from "react";
import { GetUserById } from "@/services/user/user-service";
import { GetApplicationByUserId } from "@/services/candidate/candidate-service";
import Stepper from "@/components/stepper/stepper";
import { generateColors, getGradientColor } from "@/utils/color.utils";
import Image from "next/image";
import { GetHistoryByTargetId } from "@/services/history/history.service";
import { GetPaginatedEvent } from "@/services/events/event.service";
import { formatDate } from "@/utils/date.utils";
import { HistoryType } from "@/components/shared/history/history.constant";
import { statusList } from "@/cores/constant/constant.application";
import { CandidateType } from "@/services/candidate/candidate-models";
import { User } from "@/services/user/user.models";
import { getAllRoles } from "@/services/role/role.service";
import Link from "next/link";
import { SchoolEvent } from "@/services/events/event.interface";
import Banner from "@/components/shared/banner/banner.component";
import EventCalendar from "@/components/shared/event-calendar/event.calendar";

const StudentProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [histories, setHistories] = useState<HistoryType[]>([])
  const [appData, setAppData] = useState<any>();
  const [isAStudent, setIsAStudent] = useState<boolean>(false);

  const token: string | null = getLocalStorageItem("loginAccessToken");
  const userInfo: any = token ? extractTokenInfo(token) : null;

  const [events, setEvents] = useState<SchoolEvent[]>([]);

  const fetchData = async (userId: string) => {
    const userData = await GetUserById(userId);
    const application: CandidateType = await GetApplicationByUserId(userId);
    application && setAppData(application);
    const historyData: any = await GetHistoryByTargetId(application?._id);
    historyData && setHistories(historyData.data.data);
    const roleRes = await getAllRoles();
    const studentRole = roleRes.data
      .filter((role: { name: string }) => role.name === "Étudiant")
      .map((role: { _id: any }) => role._id);

    setIsAStudent(
      userData.data.data.roles
        .map((role: { _id: any }) => role._id)
        .includes(studentRole[0])
    );
    setUser(userData.data.data);
  };

  const getEventData = async () => {
    const events = await GetPaginatedEvent(1, 100);
    if (events) {
      setEvents(events.data.items);
    }
  };

  useEffect(() => {
    userInfo && fetchData(userInfo._id);
    getEventData();
  }, []);

  return (
    <div className={style.container}>
      <Banner userData={user as User} />
      {!isAStudent && (
        <section className={style.application}>
          <div className={style.contentHeader}>
            <Image
              src={"/resources/icons/file-icon.svg"}
              width={19}
              height={19}
              alt=""
              objectFit="cover"
            />
            Demande d'admission
          </div>
          <div className={style.content}>
            <div className={style.headWrapper}>
              <div className={style.left}>
                <p className={style.title}>Développement Full Stack</p>
                <p className={style.date}>Session Janvier 2024</p>
              </div>
              <div className={style.right}>
                <div></div>
                <Link href="student/admission">
                  <button className={style.btn}>
                      Consulter
                  </button>
                </Link>
              </div>
            </div>
            {!isAStudent && <div className={style.stepper}>
              <Stepper
                application={appData}
                history={histories || []}
              />
            </div>}
          </div>
        </section>
      )}

      <EventCalendar data={events} isAStudent={isAStudent} />
    </div>
  );
};
export default StudentProfile;
