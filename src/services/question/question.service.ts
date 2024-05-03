import { api } from "@/cores/constant/constant.resource.api";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";
import { QuestionType } from "./question.models";
import { FilterKeywords } from "@/components/shared/filter/filter.constant";
import { ExtractFilterKeywords } from "@/utils/extract.filterKeywords";

const token = getLocalStorageItem("loginAccessToken");

export async function getQuestionPaginated(
  page: number,
  pageSize: number,
  filterKeywords: FilterKeywords[],
  searchKeywords: string
): Promise<any> {
  try {
    const search = `&search=${searchKeywords}`;
    const keywords = ExtractFilterKeywords(filterKeywords);
    const response = await axios.get(
      `${api.question.list
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

// export async function getQuestionById(questionId: string): Promise<any> {
//   try {
//     const token = getLocalStorageItem("loginAccessToken");
//     const response = await axios.get(
//       `${api.question.index}/${questionId}`,
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return response;
//   } catch (error: any) {
//     return error.response;
//   }
// }

export async function addQuestionService(question: QuestionType): Promise<any> {
  try {
    const response = await axios.post(
      `${api.question.index}`,
      JSON.stringify(question),
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

export async function getHistoryByEntity(entityName: string): Promise<any> {
  try {
    const response = await axios.get(
      `${api.history.index}/entity/${entityName}`,
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
