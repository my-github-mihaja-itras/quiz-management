import axios from "axios";
import { api } from "@/cores/constant/constant.resource.api";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import { HistoryType } from "@/components/shared/history/history.constant";
import { FilterKeywords } from "@/components/shared/filter/filter.constant";
import { ExtractFilterKeywords } from "@/utils/extract.filterKeywords";

export async function getStudentPaginated(
  page: number,
  pageSize: number,
  filterKeywords: FilterKeywords[],
  searchKeywords: string
): Promise<any> {
  const keywords = ExtractFilterKeywords(filterKeywords);
  const sorting = `&sortBy=createdAt&sortOrder=-1`;
  const search = `&search=${searchKeywords}`;
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const response = await axios.get(
      `${
        api.student.index
      }?page=${page.toString()}&pageSize=${pageSize.toString()}${sorting}${search}${keywords.toString()}`,
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

export async function getStudentByUserId(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const tokenInfo: any = extractTokenInfo(token);
    const userId = tokenInfo._id;
    const response = await axios.get(`${api.student.index}/user/${userId}`, {
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

export async function getStudentByEducationalClassesId(
  educationalClassesId: string
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const tokenInfo: any = extractTokenInfo(token);
    const response = await axios.get(
      `${api.student.index}/educationalClasses/${educationalClassesId}`,
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

export async function EditStudentById(
  studentId: string,
  studentData: any,
  history: HistoryType
) {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const payload = { data: studentData, history };
    const response = await axios.patch(
      `${api.student.index}/${studentId}`,
      JSON.stringify(payload),
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

export async function UpdateStudentResults(
  studentId: string,
  studentResultsData: any,
  history: HistoryType
) {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const payload = { data: studentResultsData, history };
    const response = await axios.patch(
      `${api.student.index}/result/${studentId}`,
      JSON.stringify(payload),
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

export async function getAllStudent(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const tokenInfo: any = extractTokenInfo(token);
    const userId = tokenInfo._id;
    const response = await axios.get(`${api.student.index}/all`, {
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

export async function GetStudentById(studentId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const tokenInfo: any = extractTokenInfo(token);
    const userId = tokenInfo._id;
    const response = await axios.get(`${api.student.index}/${studentId}`, {
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

export async function getStudentResultByCourseId(courseId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const response = await axios.get(`${api.student.result}/${courseId}`, {
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

export async function GetStudentByCourseId(courseId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const tokenInfo: any = extractTokenInfo(token);
    const userId = tokenInfo._id;
    const response = await axios.get(
      `${api.student.index}/course/${courseId}`,
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

export async function getStatistic(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const tokenInfo: any = extractTokenInfo(token);
    const userId = tokenInfo._id;
    const response = await axios.get(`${api.application.candidate}/stat`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

export async function getEducationalClassesCount(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(
      `${api.student.index}/educational-classes-count`,
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
