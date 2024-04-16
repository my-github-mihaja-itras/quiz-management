"use client";

import { setPrivilegesValues } from "@/utils/common-priviletes.utils";
import extractTokenInfo from "@/utils/extract.token";
import { getPrivileges } from "@/utils/guard-utils";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import { createContext, useEffect, useState } from "react";

export interface CountextType {
  privilegesContext: any;
  setPrivilegesContext: React.Dispatch<React.SetStateAction<any>>;
}

export const Privileges = createContext({} as CountextType);

export const PrivilegeProvider = ({ children }: any) => {
  const token: string | null = getLocalStorageItem("loginAccessToken");
  const userInfo: any = token && extractTokenInfo(token);

  const fetchData = async () => {
    const privilegesName = userInfo && (await getPrivileges(userInfo._id));
    if (privilegesName) {
      setPrivilegesContext(setPrivilegesValues(privilegesName));
    }
  };

  const [privilegesContext, setPrivilegesContext] = useState([] as any[]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Privileges.Provider value={{ privilegesContext, setPrivilegesContext }}>
      {children}
    </Privileges.Provider>
  );
};
