import axios from "axios";
import { api } from "@/cores/constant/constant.resource.api";
import { getLocalStorageItem } from "@/utils/localStorage.utils";

export async function getAllPrivileges(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(`${api.privilege.index}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

export async function GetUserPrivilegesNames(userId: string) {
  try {
    const response = await axios.get(
      `${api.user.index}/user-privileges/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data[0];
  } catch (error: any) {
    throw new Error("Une erreur c'est produit dans le serveur.");
    return error.response;
  }
}
