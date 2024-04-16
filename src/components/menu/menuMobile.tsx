"use client";
import styles from "./menu.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu } from "@/cores/menu/menu.interface";
import { DEFAULT_MENU } from "@/cores/menu/menu.constants";
import useWindowSize from "@/cores/window/window.size";
import { api } from "@/cores/constant/constant.resource.api";
import { GetUserById } from "@/services/user/user-service";
import extractTokenInfo from "@/utils/extract.token";
import IconNotificationMobileActive from "../shared/icons/iconNotificationMobileActive";
import { logoutService } from "@/services/login/logout.service";
import { useRouter } from "next/navigation";
import IconProfilGrey from "../shared/icons/iconProfileGrey";
import IconSettingGear from "../shared/icons/iconSettingGear";
import IconLogout from "../shared/icons/iconLogout";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import Link from "next/link";
import { User } from "@/services/user/user.models";
import IconDropdown from "../shared/icons/iconDropdown";
import IconDropup from "../shared/icons/iconDropup";
export interface Props {
  route: string;
  defaultMenu?: Menu[];
  isOpen: boolean;
  token: any;
}

export default function MenuMobile({
  route,
  defaultMenu,
  isOpen,
  token,
}: Props) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(0);
  const [openChildIndex, setOpenChildIndex] = useState<number | null>(null);
  const [menuChildClicked, setMenuChildClicked] = useState(false);
  const [filtredMenu, setFilteredMenu] = useState<Menu[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>();
  const [openDefaultMenuIndex, setOpenDefaultMenuIndex] = useState<
    number | null
  >(null);
  const [defaultMenuHovered, setDefaultMenuHovered] = useState<number | null>();
  const router = useRouter();
  //
  const [user, setUser] = useState<User>();
  const tokenInfo: any = extractTokenInfo(token);
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);

  const fetchData = async () => {
    const res = await GetUserById(tokenInfo._id);
    const userData: User = res.data.data;

    setUser(userData);
  };

  const menu = getLocalStorageItem("menu");
  const link = route;

  //Windows Size
  const screenSize = useWindowSize();

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
        (storedMenu.length === 0 ||
          tokenInfo.userName.split("-")[0] == "ENS") &&
        defaultMenu
      ) {
        setFilteredMenu(defaultMenu);
      } else {
        setFilteredMenu(storedMenu);
      }
      fetchData();
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

  const handleLogout = async () => {
    await logoutService();
    router.push("/auth");
  };
  const handleMenuClick = () => {
    setMenuChildClicked(false);
  };

  if (isOpen && screenSize.width < 736) {
    return (
      <div className={styles.containerMobile}>
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            <Image
              className={styles.profileImage}
              alt="Photo de profile"
              src={`${api.image.profile}/${user?.photo}`}
              unoptimized
              width={40}
              height={40}
              objectFit="cover"
            />
          </div>
          <div
            className={styles.userInfo}

            // onClick={handleOpenDropdown}
          >
            <div className={styles.firstname}>{user?.firstname}</div>
            <div className={styles.username}>
              <span>@{user?.username}</span>
              {/* <button type="button">
                <IconCareDownFill />
              </button> */}
              <div
                className={
                  dropdownOpened
                    ? `${styles.dropdownContentClicked}`
                    : `${styles.dropdownContent}`
                }
              >
                <div className={styles.dropdownItem}>
                  <Link href="/profile">
                    <IconProfilGrey /> Profil
                  </Link>
                </div>
                {/* <div className={styles.dropdownItem}>
                  <Link href="/setting">
                    <IconSettingGear /> Paramètres
                  </Link>
                </div> */}
                <div className={styles.dropdownItem}>
                  <Link href="/auth" onClick={handleLogout}>
                    <IconLogout /> Déconnexion
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.notification}>
            <IconNotificationMobileActive />
          </div>
        </div>
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
                    openMenuIndex === index
                      ? styles.clicked
                      : styles.menuContent
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
                      )}{" "}
                    </span>
                  </div>
                  {menuChildClicked && openMenuIndex === index && (
                    <div>
                      {menu.child.map((children, childIndex) => (
                        <Link
                          href={children.link}
                          key={childIndex}
                          className={`${
                            openChildIndex === childIndex
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
                    openDefaultMenuIndex === index ||
                    defaultMenuHovered === index
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
          <div className={styles.menuWrapper}>
            <Link
              href="/auth"
              onClick={handleLogout}
              className={`${styles.menuContent}`}
            >
              <IconLogout /> Déconnexion
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
