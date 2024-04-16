import { api } from "@/cores/constant/constant.resource.api";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";

export async function GetHistoryByTargetId(targetId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(`${api.history.list}/${targetId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}
