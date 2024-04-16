"use client";
import style from "./profile.module.css";
import Navbar from "@/components/navbar/navbar";
import Menu from "@/components/menu/menu";
import { RedirectType, redirect, usePathname } from "next/navigation";
import {
  DEFAULT_CANDIDATE_MENU,
  DEFAULT_STUDENT_MENU,
  DEFAULT_TEACHER_MENU,
} from "@/cores/menu/menu.constants";
import { ComponentType, useEffect, useRef, useState } from "react";
import authGuard from "@/components/routGuard/routGuard";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import { HasPrivileges } from "@/utils/guard-utils";
import MenuMobile from "@/components/menu/menuMobile";
import extractTokenInfo from "@/utils/extract.token";
import MenuComponent from "@/components/menu/menu";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const token: string | null = getLocalStorageItem("loginAccessToken");
  const isAuthenticated = !!token;
  const [isUserAllowed, setIsUserAllowed] = useState<boolean>(true);
  const pathname = usePathname().split("/");
  const route = usePathname();
  const [menuMobileIsOpen, setMenuMobileIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAllowed = async () => {
    const isAllowed = await HasPrivileges(pathname);
    setIsUserAllowed(isAllowed);
  };

  const handleOnClickMenu = (res: boolean) => {
    setMenuMobileIsOpen(!res);
  };
  const userInfo: any = token && extractTokenInfo(token);

  useEffect(() => {
    if (isAuthenticated) {
      isAllowed();
      if (!isUserAllowed) {
        localStorage.removeItem("loginAccessToken");
        localStorage.removeItem("loginAccessTokenExpiration");
        redirect("/auth", RedirectType.replace);
      }
    }
  }, [pathname, isUserAllowed]);

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
        <div className={style.menu}>
          {userInfo && (
            <>
              <MenuComponent
                route={route}
                defaultMenu={
                  userInfo.userName.split("-")[0] == "ENS"
                    ? DEFAULT_TEACHER_MENU
                    : userInfo.userName.split("-")[0] == "ET"
                    ? DEFAULT_STUDENT_MENU
                    : DEFAULT_CANDIDATE_MENU
                }
              ></MenuComponent>
              <MenuMobile
                route={route}
                defaultMenu={
                  userInfo.userName.split("-")[0] == "ENS"
                    ? DEFAULT_TEACHER_MENU
                    : userInfo.userName.split("-")[0] == "ET"
                    ? DEFAULT_STUDENT_MENU
                    : DEFAULT_CANDIDATE_MENU
                }
                isOpen={menuMobileIsOpen}
                token={token}
              />
            </>
          )}
        </div>
        <div className={style.children}>{children}</div>
      </div>
    </div>
  );
};

export default authGuard(ProfileLayout as ComponentType<any>);
