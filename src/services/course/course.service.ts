import { FilterKeywords } from "@/components/shared/filter/filter.constant";
import { api } from "@/cores/constant/constant.resource.api";
import { ExtractFilterKeywords } from "@/utils/extract.filterKeywords";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";
import { createCourseDto } from "./course.model";

export async function getCoursePaginated(
  page: number,
  pageSize: number,
  filterKeywords: FilterKeywords[],
  searchKeywords: string
): Promise<any> {
  const keywords = ExtractFilterKeywords(filterKeywords);
  const search = `&search=${searchKeywords}`;
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const sorting = `&sortBy=createdAt&sortOrder=-1`;

    const response = await axios.get(
      `${
        api.course.index
      }?page=${page.toString()}&pageSize=${pageSize.toString()}${search}${keywords.toString()}`,
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

export async function getAllCourse(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.course.list}`, {
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

export async function getCourseById(courseId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(`${api.course.index}/${courseId}`, {
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

export async function getCourseBySessionId(sessionID: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.course.bySessionId}/${sessionID}`, {
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

export async function getCourseTeacherByUserId(teacherId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.course.byTeacherUserId}/${teacherId}`, {
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

export async function editCourseById(
  courseId: string,
  updatedData: any
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.patch(
      `${api.course.index}/${courseId}`,
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
export async function saveCourse(courseData: createCourseDto) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.post(
      `${api.course.index}`,
      JSON.stringify(courseData),
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
