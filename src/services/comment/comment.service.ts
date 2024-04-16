import axios from "axios";
import { api } from "@/cores/constant/constant.resource.api";
import { HistoryType } from "@/components/shared/history/history.constant";
import { HistoryWithData } from "@/components/shared/history/create-history-with-data";
import { CommentType, CommentTypeToInsert } from "./comment.models";
import { getLocalStorageItem } from "@/utils/localStorage.utils";

const token = getLocalStorageItem("loginAccessToken");

export async function getCommentByTargetId(targetId: string): Promise<any> {
  try {
    const response = await axios.get(`${api.comment.target}/${targetId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}
export async function addCommentService(
  comment: CommentTypeToInsert,
  history: HistoryType
): Promise<any> {
  try {
    const payload: HistoryWithData = { data: { comment }, history };
    const response = await axios.post(
      `${api.comment.index}`,
      JSON.stringify(payload),
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

export async function UpdateCommentaryById(
  id: string,
  comment: string,
  history: HistoryType
) {
  try {
    const payload: HistoryWithData = { data: { comment }, history };
    const response = await axios.patch(
      `${api.comment.updateComment}/${id}`,
      JSON.stringify(payload),
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

export async function DeleteCommentaryById(id: string, history: HistoryType) {
  try {
    const response = await axios.delete(`${api.comment.index}/${id}`, {
      data: JSON.stringify(history),
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
