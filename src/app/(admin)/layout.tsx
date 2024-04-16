"use client";

import Navbar from "@/components/navbar/navbar";
import React, { ComponentType, useEffect, useRef, useState } from "react";
import style from "./main.module.css";
import authGuard from "@/components/routGuard/routGuard";
import { RedirectType, redirect, usePathname } from "next/navigation";
import { HasPrivileges } from "@/utils/guard-utils";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import useWindowSize from "@/cores/window/window.size";
import MenuMobile from "@/components/menu/menuMobile";
import MenuComponent from "@/components/menu/menu";

const Admin = ({ children }: { children: React.ReactNode }) => {
  const token: string | null = getLocalStorageItem("loginAccessToken");
  const isAuthenticated = !!token;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isUserAllowed, setIsUserAllowed] = useState<boolean>(true);
  const pathname = usePathname().split("/");

  // Menu state
  const [menuMobileIsOpen, setMenuMobileIsOpen] = useState<boolean>(false);

  const isAllowed = async () => {
    const isAllowed = await HasPrivileges(pathname);
    setIsUserAllowed(isAllowed);
  };

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

  const handleOnClickMenu = (res: boolean) => {
    setMenuMobileIsOpen(!res);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuMobileIsOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        <MenuComponent route={"/" + pathname[1]} />
        <MenuMobile
          route={"/" + pathname[1]}
          isOpen={menuMobileIsOpen}
          token={token}
        />
        <div className={style.children}>{children}</div>
      </div>
    </div>
  );
};

export default authGuard(Admin as ComponentType<any>);
