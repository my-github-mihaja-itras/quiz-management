import { DashboardCard } from "@/components/dashboard/interfaces";
import { MENU } from "@/cores/menu/menu.constants";
import { getLocalStorageItem } from "./localStorage.utils";
import extractTokenInfo from "./extract.token";
import { ROUTES } from "@/cores/constant/route.constant";
import { PrivilegeName } from "@/cores/privileges/privileges.interfaces";
import { GetUserPrivilegesNames } from "@/services/privilege/privilege.service";

export function UserRedirection(username: string) {
  if (/^ET-/.test(username) || /^C-/.test(username)) {
    return "/profiles/student";
  }
  if (/^ENS-/.test(username)) {
    return "/profiles/teacher";
  }
   else {
    return "/";
  }
}

export function FilterMenuByPrivileges(privileges: string[]) {
  const filteredMenu = MENU.filter((menu) => {
    return isAllowed(privileges, menu.usePrivilege);
  });
  return filteredMenu;
}

export function isAllowed(privileges: string[], usePrivilege: any): boolean {
  const isAllowed = privileges.some((privilege) => privilege === usePrivilege);
  return isAllowed;
}

export function FilterCardsByPrivileges(
  cards: DashboardCard[],
  privileges: string[]
) {
  const filteredCards = cards.filter((card) => {
    return isAllowed(privileges, card.usePrivilege);
  });
  return filteredCards;
}

// guard for path
export const HasPrivileges = async (path: string[]) => {
  const token: string | null = getLocalStorageItem("loginAccessToken");
  const userInfo: any = token && extractTokenInfo(token);
  const privilegesName = userInfo && (await getPrivileges(userInfo._id));
  const route = ROUTES.find((r) => r.path === `/${path[1]}`);
  const result = privilegesName?.includes(
    PrivilegeName[route?.usePrivilege as keyof typeof PrivilegeName]
  );
  return result;
};

export const getPrivileges = async (userId: string): Promise<string[]> => {
  const result = await GetUserPrivilegesNames(userId);
  return result;
};
