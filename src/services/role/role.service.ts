import axios from "axios";
import { api } from "@/cores/constant/constant.resource.api";
import { Role, RoleTypeToInsert } from "./role.models";
import { HistoryType } from "@/components/shared/history/history.constant";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import { HistoryWithData } from "@/components/shared/history/create-history-with-data";

export async function getRolePaginated(
  page: number,
  pageSize: number,
  searchKeywords: string
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const search = `&search=${searchKeywords}`;
    const response = await axios.get(
      `${
        api.role.RoleList
      }?page=${page.toString()}&pageSize=${pageSize.toString()}${search}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}
export async function getAllRoles(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(`${api.role.list}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

export async function getRoleById(roleId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(`${api.role.index}/${roleId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

export async function addRoleService(data: RoleTypeToInsert): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.post(
      `${api.role.index}`,
      JSON.stringify(data),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}

export async function updateRoleById(
  roleId: string,
  roleData: RoleTypeToInsert,
  history: HistoryType
) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const payload: HistoryWithData = { data: roleData, history };
    const response = await axios.patch(
      `${api.role.index}/${roleId}`,
      JSON.stringify(payload),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

export async function DeleteRoleById(id: string, history: HistoryType) {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.delete(`${api.role.index}/${id}`, {
      data: JSON.stringify(history),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}
