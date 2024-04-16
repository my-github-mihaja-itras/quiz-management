"use client";
import styles from "./menu.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu } from "@/cores/menu/menu.interface";
import { DEFAULT_MENU } from "@/cores/menu/menu.constants";
import useWindowSize from "@/cores/window/window.size";
import IconDropdown from "../shared/icons/iconDropdown";
import IconDropup from "../shared/icons/iconDropup";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import Link from "next/link";
import extractTokenInfo from "@/utils/extract.token";
export interface Props {
  route: string;
  defaultMenu?: Menu[];
}

export default function MenuComponent({ route, defaultMenu }: Props) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [openDefaultMenuIndex, setOpenDefaultMenuIndex] = useState<
    number | null
  >(null);
  const [openChildIndex, setOpenChildIndex] = useState<number | null>(null);
  const [menuChildClicked, setMenuChildClicked] = useState(false);
  const [filtredMenu, setFilteredMenu] = useState<Menu[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>();
  const [defaultMenuHovered, setDefaultMenuHovered] = useState<number | null>();

  const menu = getLocalStorageItem("menu");
  const link = route;
  const token: string | null = getLocalStorageItem("loginAccessToken");

  const userInfo: any = token && extractTokenInfo(token);

  const handleMouseEnter = (index: number, isDefault?: boolean) => {
    if (isDefault) {
      setDefaultMenuHovered(index);
    } else {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setDefaultMenuHovered(null);
  };

  useEffect(() => {
    if (menu) {
      const storedMenu: Menu[] = JSON.parse(menu);
      if (
        (storedMenu.length === 0 || userInfo.userName.split("-")[0] == "ENS") &&
        defaultMenu
      ) {
        setFilteredMenu(defaultMenu);
      } else {
        setFilteredMenu(storedMenu);
      }
    }
  }, [menu, defaultMenu]);

  useEffect(() => {
    filtredMenu.find((menu, index) => {
      if (!menuChildClicked && menu.link === link) {
        setOpenMenuIndex(index);
        setOpenChildIndex(null);
        setOpenDefaultMenuIndex(null);
      }
      if (menu.child.length !== 0) {
        const childIndex = menu.child.findIndex((child) => child.link === link);
        if (childIndex !== -1) {
          setOpenChildIndex((prevIndex) =>
            prevIndex === index ? null : childIndex
          );
          // setOpenMenuIndex(index);
        }
      }
    });
    DEFAULT_MENU.find((menu, index) => {
      if (!menuChildClicked && menu.link === link) {
        setOpenDefaultMenuIndex(index);
        setOpenChildIndex(null);
        setOpenMenuIndex(null);
      }
    });
  });

  const handleMenuWithChildClick = (index: number) => {
    setOpenMenuIndex((prevIndex) => {
      if (prevIndex === index) {
        setMenuChildClicked(!menuChildClicked);
        return null;
      } else {
        setMenuChildClicked(true);
        return index;
      }
    });
  };
  const handleMenuClick = () => {
    setMenuChildClicked(false);
  };
  return (
    <div className={styles.container}>
      {filtredMenu.length > 0 && (
        <div className={styles.header}>
          <p>Menu</p>
        </div>
      )}
      <div className={styles.content}>
        {filtredMenu.map((menu: Menu, index) => (
          <div
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={styles.menuWrapper}
            key={index}
          >
            {menu.child.length === 0 ? (
              <Link
                href={menu.link}
                className={`${
                  openMenuIndex === index ? styles.clicked : styles.menuContent
                }`}
                onClick={() => handleMenuClick()}
              >
                <Image
                  src={`${
                    openMenuIndex === index || hoveredIndex === index
                      ? menu.bleuIcon
                      : menu.icon
                  }`}
                  width={20}
                  height={20}
                  alt=""
                  objectFit="cover"
                />
                <p className={styles.title}>{menu.label}</p>
              </Link>
            ) : (
              <div
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  onClick={() => handleMenuWithChildClick(index)}
                  className={`${styles.menuContent}`}
                >
                  <Image
                    src={`${
                      hoveredIndex === index && openMenuIndex != index
                        ? menu.bleuIcon
                        : menu.icon
                    }`}
                    width={20}
                    height={20}
                    alt=""
                    objectFit="cover"
                  />
                  <p className={styles.title}>{menu.label}</p>
                  <span className={styles.arrow}>
                    {openMenuIndex === index ? (
                      <IconDropdown />
                    ) : (
                      <IconDropup />
                    )}
                  </span>
                </div>
                {menuChildClicked &&
                  openMenuIndex === index &&
                  menu.child.map((children, childIndex) => (
                    <Link
                      href={children.link}
                      key={childIndex}
                      className={`${
                        openChildIndex === childIndex && children.link === route
                          ? styles.childrenClicked
                          : styles.children
                      } ${styles.children}`}
                    >
                      <p className={styles.title}>{children.label}</p>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        ))}
        <div className={styles.menuContentSupport}>
          <span className={styles.supportText}>SUPPORT</span>
        </div>
        {DEFAULT_MENU.map((menu: Menu, index) => (
          <div
            onMouseEnter={() => handleMouseEnter(index, true)}
            onMouseLeave={handleMouseLeave}
            className={styles.menuWrapper}
            key={index}
          >
            <Link
              href={menu.link}
              className={`${
                openDefaultMenuIndex === index
                  ? styles.clicked
                  : styles.menuContent
              }`}
            >
              <Image
                src={`${
                  openDefaultMenuIndex === index || defaultMenuHovered === index
                    ? menu.bleuIcon
                    : menu.icon
                }`}
                width={20}
                height={20}
                alt=""
                objectFit="cover"
              />
              <p className={styles.title}>{menu.label}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
