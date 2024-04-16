/* eslint-disable react/jsx-key */
"use client";

import React from "react";
import style from "./main.module.css";
import dynamic from "next/dynamic";

const DashboardCardsServer = dynamic(
  () => import("@/components/dashboard/dasboardCard/dashboardCard"),
  {
    ssr: false,
  }
);

const Dashboard = () => {
  return (
    <div className={style.contentWrapper}>
      <div>
        <p className={style.title}></p>
        <div className={style.cardContainer}>
          <DashboardCardsServer></DashboardCardsServer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
