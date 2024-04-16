"use client";
import Navbar from "@/components/navbar/navbar";
import React, { ComponentType, useEffect, useRef, useState } from "react";
import style from "./main.module.css";
import authGuard from "@/components/routGuard/routGuard";
import { usePathname } from "next/navigation";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import MenuMobile from "@/components/menu/menuMobile";
import { DEFAULT_CANDIDATE_MENU, DEFAULT_STUDENT_MENU, DEFAULT_TEACHER_MENU } from "@/cores/menu/menu.constants";
import MenuComponent from "@/components/menu/menu";
import extractTokenInfo from "@/utils/extract.token";

const Admin = ({ children }: { children: React.ReactNode }) => {
  const token: string | null = getLocalStorageItem("loginAccessToken");
  const pathname = usePathname().split("/");
  const dropdownRef = useRef<HTMLDivElement>(null);


  // Menu state
  const [menuMobileIsOpen, setMenuMobileIsOpen] = useState<boolean>(false);

  const handleOnClickMenu = (res: boolean) => {
    setMenuMobileIsOpen(!res);
  };
  const userInfo: any = token && extractTokenInfo(token);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuMobileIsOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuMobileIsOpen(false);
      }
    };

    const handleDocumentClick = () => {
      if (menuMobileIsOpen) {
        setMenuMobileIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [menuMobileIsOpen]);

  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <Navbar
          handleOpenMenu={handleOnClickMenu}
          menuIsOpen={menuMobileIsOpen}
        />
      </div>
      <div className={style.content}>
        <MenuComponent
         route={"/" + pathname[1]}
        defaultMenu={
              userInfo.userName.split("-")[0] == "ENS"
                ? DEFAULT_TEACHER_MENU
                : userInfo.userName.split("-")[0] == "ET"
                ? DEFAULT_STUDENT_MENU
                : DEFAULT_CANDIDATE_MENU
            }/>
        <MenuMobile
          route={"/" + pathname[1]}
          isOpen={menuMobileIsOpen}
          token={token}
          defaultMenu={
            userInfo.userName.split("-")[0] == "ENS"
              ? DEFAULT_TEACHER_MENU
              : userInfo.userName.split("-")[0] == "ET"
              ? DEFAULT_STUDENT_MENU
              : DEFAULT_CANDIDATE_MENU
          }
        />
        <div className={style.children}>{children}</div>
      </div>
    </div>
  );
};

export default authGuard(Admin as ComponentType<any>);
