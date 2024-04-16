import { api } from "@/cores/constant/constant.resource.api";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";
import { CursusAndHistory } from "./cursus.models";

const token = getLocalStorageItem("loginAccessToken");

export async function getAllCursus(): Promise<any> {
  try {
    const response = await axios.get(`${api.cursus.index}`, {
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

export async function addMultipleCursusService(
  cursusData: CursusAndHistory[]
): Promise<any> {
  try {
    const response = await axios.post(
      `${api.cursus.index}/multipleModification`,
      JSON.stringify(cursusData),
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


export async function getHistoryByEntity(  entityName: string): Promise<any> {
  try {
    const response = await axios.get(`${api.history.index}/entity/${entityName}`, {
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


