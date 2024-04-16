import { api } from "@/cores/constant/constant.resource.api";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";
import { CreateEventDto } from "./event.interface";

export async function GetPaginatedEvent(
  page: number,
  pageSize: number
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(
      `${
        api.event.EventList
      }?page=${page.toString()}&pageSize=${pageSize.toString()}`,
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

export async function GetAllEvent(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.event.index}`, {
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

export async function SaveEvent(createEventDto: CreateEventDto): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.post(
      `${api.event.index}`,
      JSON.stringify(createEventDto),
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
