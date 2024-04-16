import style from "./auth.module.css";
import Image from "next/image";
export const metadata = {
  title: "CM Login Page",
  description: "Campus management app",
};
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={style.container}>
        <div className={style.left}>
          <Image
            className={style.logo}
            src="/resources/logo.png"
            alt="logo"
            width={237}
            height={65}
            objectFit="cover"
          />
          <div className={style.backgroundMobile}>
            <Image
              src="/resources/authentificationMobile.png"
              alt="Image"
              className={style.image}
              width={1000}
              height={1000}
              objectFit="cover"
            />
          </div>
          {children}
        </div>
        <div className={style.right}>
          <Image
            src="/resources/background.png"
            alt="Image"
            className={style.image}
            width={1000}
            height={1000}
            objectFit="cover"
          />
        </div>
      </div>
    </>
  );
}
