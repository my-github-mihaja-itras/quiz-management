import { api } from "@/cores/constant/constant.resource.api";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";

export async function getQuizSessionPaginated(
  page: number,
  pageSize: number,
  searchKeywords: string
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const search = `&search=${searchKeywords}`;
    const response = await axios.get(
      `${
        api.quizSession.list
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
