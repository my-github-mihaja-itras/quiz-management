import { api } from "@/cores/constant/constant.resource.api";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";
import { EducationalClasses } from "./educational-classes.models";

export async function getPaginatedEducationalClasses(
  page: number,
  pageSize: number,
  searchKeywords: string
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const search = `&search=${searchKeywords}`;
    const response = await axios.get(
      `${
        api.educationalClass.educationalClassList
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
export async function DeleteEducationalClassesById(id: string) {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.delete(`${api.educationalClass.index}/${id}`, {
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

export const SaveEducationalClasses = async (educationalClassesData: any) => {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.post(
      `${api.educationalClass.index}`,
      JSON.stringify(educationalClassesData),
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
};

export async function GetEducationalClassesById(
  educationalClassesId: string
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(
      `${api.educationalClass.index}/${educationalClassesId}`,
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

export async function EditEducationalClassesById(
  educationalClassesId: string,
  educationalClassesData: any
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.patch(
      `${api.educationalClass.index}/${educationalClassesId}`,
      JSON.stringify(educationalClassesData),
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
export async function getAllEducationalClasses(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.educationalClass.list}`, {
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
