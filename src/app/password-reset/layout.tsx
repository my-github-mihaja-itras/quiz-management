import style from "./auth.module.css";
import Image from "next/image";
export const metadata = {
  title: "CM Request Reset Password Page",
  description: "Campus management app",
};
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
