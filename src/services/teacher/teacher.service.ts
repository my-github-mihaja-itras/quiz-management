import { FilterKeywords } from "@/components/shared/filter/filter.constant";
import { api } from "@/cores/constant/constant.resource.api";
import { ExtractFilterKeywords } from "@/utils/extract.filterKeywords";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";
import { createTeacherDto } from "./teacher.models";
import extractTokenInfo from "@/utils/extract.token";

export async function saveTeacher(teacherData: createTeacherDto) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.post(
      `${api.teacher.index}`,
      JSON.stringify(teacherData),
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

export async function getPaginatedTeacher(
  page: number,
  pageSize: number,
  filterKeywords: FilterKeywords[],
  searchKeywords: string
): Promise<any> {
  const keywords = ExtractFilterKeywords(filterKeywords);
  const search = `&search=${searchKeywords}`;
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(
      `${
        api.teacher.index
      }?page=${page.toString()}&pageSize=${pageSize.toString()}${search}${keywords}`,
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

export async function getAllTeacher(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.teacher.index}/all`, {
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

export async function GetTeacherById(teacherId: string) {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.teacher.index}/${teacherId}`, {
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

export async function EditTeacherById(teacherId: string, teacherData: any) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.patch(
      `${api.teacher.index}/${teacherId}`,
      JSON.stringify(teacherData),
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
export async function getTeacherByUserId(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const tokenInfo: any = extractTokenInfo(token);
    const userId = tokenInfo._id;
    const response = await axios.get(`${api.teacher.index}/user/${userId}`, {
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
