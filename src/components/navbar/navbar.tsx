import { logoutService } from "@/services/login/logout.service";
import styles from "./navbar.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import extractTokenInfo from "@/utils/extract.token";
import { useEffect, useRef, useState } from "react";
import { GetUserById } from "@/services/user/user-service";
import { api } from "@/cores/constant/constant.resource.api";
import IconNotificationActive from "../shared/icons/iconNotificationActive";
import IconDropup from "../shared/icons/iconDropup";
import IconDropdown from "../shared/icons/iconDropdown";
import IconProfilGrey from "../shared/icons/iconProfileGrey";
import IconLogout from "../shared/icons/iconLogout";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import Link from "next/link";
import { User } from "@/services/user/user.models";

export default function Navbar({ handleOpenMenu, menuIsOpen }: any) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User>();
  const token = getLocalStorageItem("loginAccessToken") || "";
  const tokenInfo: any = extractTokenInfo(token);
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
  const router = useRouter();

  const fetchData = async () => {
    const res = await GetUserById(tokenInfo._id);
    const userData: User = res.data.data;

    setUser(userData);
  };

  useEffect(() => {
    tokenInfo && fetchData();
  }, []);

  const handleLogout = async () => {
    await logoutService();
    router.push("/auth");
  };

  const handleOnClickMenu = () => {
    handleOpenMenu(menuIsOpen);
  };

  const handleOpenDropdown = () => {
    setDropdownOpened((prevDropdownOpened) => !prevDropdownOpened);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownOpened &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpened(false);
      }
    };

    const handleDocumentClick = () => {
      if (dropdownOpened) {
        setDropdownOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [dropdownOpened]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="/resources/logo-ic-blanc.png"
            alt="logo"
            width={200}
            height={75}
            className={styles.logoImg}
            objectFit="cover"
          />
        </div>
        <div className={styles.logoMobile}>
          <Image
            src="/resources/logo-mobile.png"
            alt="logo"
            width={115}
            height={27}
            className={styles.logoImg}
            objectFit="cover"
          />
        </div>
        <div className={styles.separator}>
          <div></div>
        </div>
        <div className={styles.profileSM}>
          <button className={styles.btnSM} onClick={handleOnClickMenu}>
            menu
          </button>
        </div>

        <div className={styles.profile}>
          <div className={styles.notification}>
            <IconNotificationActive />
          </div>
          <Image
            src={`${api.image.profile}/${user?.photo}`}
            className={styles.profileImage}
            alt="Photo de profile"
            unoptimized
            width={40}
            height={40}
            objectFit="cover"
          />

          <div
            ref={dropdownRef}
            className={styles.profileInfo}
            onClick={handleOpenDropdown}
          >
            <div className={styles.username}>
              {user?.firstname && user?.firstname.length > 10
                ? `${user?.firstname.slice(0, 12)}...`
                : user?.firstname}
              <p>{dropdownOpened ? <IconDropup /> : <IconDropdown />}</p>
            </div>
            <p className={styles.mail} title={user?.username}>
              {user?.username && user?.username.length > 10
                ? `${user?.username.slice(0, 11)}...`
                : user?.username}
            </p>
            <div
              className={
                dropdownOpened
                  ? `${styles.dropdownContent}`
                  : `${styles.dropdownContentInitial}`
              }
              ref={dropdownRef}
            >
              <Link href="/profile">
                <IconProfilGrey /> Profil
              </Link>
              <Link href="/auth" onClick={handleLogout}>
                <IconLogout /> Déconnexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
