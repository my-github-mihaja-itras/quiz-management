import { api } from "@/cores/constant/constant.resource.api";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";
import { QuestionTypeToInsert } from "./quiz-session.models";

const token = getLocalStorageItem("loginAccessToken");

// export async function getAllQuestion(): Promise<any> {
//   try {
//     const response = await axios.get(`${api.question.index}`, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error: any) {
//     return error.response;
//   }
// }

export async function addQuestionService(
  question: QuestionTypeToInsert
): Promise<any> {
  try {
    const response = await axios.post(
      `${api.question.index}`,
      JSON.stringify(question),
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
