import { api } from "@/cores/constant/constant.resource.api";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";

export async function GetAllRegistrationPeriod(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.registrationPeriod.index}`, {
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

export async function EditRegistrationPeriodById(
  registrationPeriodId: string,
  updateData: any
) {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.patch(
      `${api.registrationPeriod.index}/${registrationPeriodId}`,
      JSON.stringify(updateData),
      {
        headers: {
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
