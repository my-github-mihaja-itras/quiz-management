import { FilterKeywords } from "@/components/shared/filter/filter.constant";
import { api } from "@/cores/constant/constant.resource.api";
import { ExtractFilterKeywords } from "@/utils/extract.filterKeywords";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";
import { createCourseDto } from "../course/course.model";

export async function getSessionPaginated(
  page: number,
  pageSize: number,
  filterKeywords: FilterKeywords[]
): Promise<any> {
  const keywords = ExtractFilterKeywords(filterKeywords);
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const sorting = `&sortBy=createdAt&sortOrder=-1`;

    const response = await axios.get(
      `${
        api.session.index
      }?page=${page.toString()}&pageSize=${pageSize.toString()}${sorting}${keywords.toString()}`,
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

export async function getAllSession(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.session.list}`, {
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

export async function getSessionById(sessionId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.session.index}/${sessionId}`, {
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

export async function getSessionByClassId(classId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(
      `${api.session.getByClasseId}/${classId}`,
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


export async function GetOccupiedClassesByCourseId(
  courseId: string
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(
      `${api.session.index}/find-occuped/${courseId}`,
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

export const SaveSession = async (data: any): Promise<any> => {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = axios.post(`${api.session.index}`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export async function editSessionById(
  sessionId: string,
  updatedData: any
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.patch(
      `${api.session.index}/${sessionId}`,
      JSON.stringify(updatedData),
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
export async function deleteSessionById(sessionId: string,historyData:any) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.delete(
      `${api.session.index}/${sessionId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data:{
          historyData
        }
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}