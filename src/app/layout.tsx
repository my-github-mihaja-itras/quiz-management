import type { Metadata } from "next";
import "./globals.css";
import { PrivilegeProvider } from "@/context/privileges.context";

export const metadata: Metadata = {
  title: "Campus-Management",
  description: "Campus-Management Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/gill-sans-mt-2"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/roboto" rel="stylesheet" />
        <link
          href="https://fonts.cdnfonts.com/css/gill-sans-nova"
          rel="stylesheet"
        ></link>
        <link href="https://fonts.cdnfonts.com/css/lato" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          href="https://fonts.cdnfonts.com/css/montserrat"
          rel="stylesheet"
        />
      </head>

      <body>
        <PrivilegeProvider>{children}</PrivilegeProvider>
      </body>
    </html>
  );
}
