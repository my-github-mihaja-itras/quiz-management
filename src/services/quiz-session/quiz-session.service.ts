import { FilterKeywords } from "@/components/shared/filter/filter.constant";
import { api } from "@/cores/constant/constant.resource.api";
import { ExtractFilterKeywords } from "@/utils/extract.filterKeywords";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";

export async function getQuizSessionPaginated(
  page: number,
  pageSize: number,
  filterKeywords: FilterKeywords[],
  searchKeywords: string,
  
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const keywords = ExtractFilterKeywords(filterKeywords);
    const search = `&search=${searchKeywords}`;
    const response = await axios.get(
      `${
        api.quizSession.list
      }?page=${page.toString()}&pageSize=${pageSize.toString()}${search}${keywords}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
           Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

export async function getQuizSessionById(quizSessionId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(
      `${api.quizSession.index}/${quizSessionId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}
