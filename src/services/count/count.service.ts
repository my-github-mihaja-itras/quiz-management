import { api } from "@/cores/constant/constant.resource.api";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";

export async function getCount(): Promise<any> {
    try {
      const token = getLocalStorageItem("loginAccessToken");
  
      const response = await axios.get(`${api.count.index}`, {
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