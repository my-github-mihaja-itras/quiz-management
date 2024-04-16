import { APPLICATION_STATUS_LABELS } from "@/components/dashboard/constants";
import { FilterKeywords } from "@/components/shared/filter/filter.constant";
import { HistoryWithData } from "@/components/shared/history/create-history-with-data";
import { HistoryType } from "@/components/shared/history/history.constant";
import { ApplicationStatus } from "@/cores/constant/constant.application";
import { ActionType, EntityName } from "@/cores/constant/constant.history";
import { api } from "@/cores/constant/constant.resource.api";
import { ExtractFilterKeywords } from "@/utils/extract.filterKeywords";
import { FormatHistory } from "@/utils/history.utils";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";

export async function getCandidatePaginated(
  page: number,
  pageSize: number,
  filterKeywords: FilterKeywords[],
  searchKeywords: string
): Promise<any> {
  const keywords = ExtractFilterKeywords(filterKeywords);
  const search = `&search=${searchKeywords}`;
  try {
    const sorting = `&sortBy=createdAt&sortOrder=-1`;
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(
      `${
        api.application.candidateList
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

export async function getAllCandidate(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(`${api.application.candidate}`, {
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

export async function getStatusCount(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(
      `${api.application.candidate}/status-count`,
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

export async function GetCandidateById(candidateId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(
      `${api.application.candidate}/${candidateId}`,
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

export async function UpdateCandidateUserById(
  candidateUserId: string,
  dataToUpdate: any
): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.patch(
      `${api.user.index}/${candidateUserId}`,
      JSON.stringify(dataToUpdate),
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
export async function UpdateApplication(candidateId: string, updateData: any) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.patch(
      `${api.application.candidate}/update/${candidateId}`,
      JSON.stringify(updateData),
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
export async function ChangeApplicationStatus(candidateId: string, data: any) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const payload: HistoryWithData = {
      data,
      history: {
        ...FormatHistory(token, candidateId),
        entity: EntityName.APPLICATION,
        action: {
          name: ActionType.UPDATE_APPLICATION_STATUS,
          proof:
            APPLICATION_STATUS_LABELS[
              ApplicationStatus[
                data.applicationStatus as keyof typeof ApplicationStatus
              ]
            ],
        },
      },
    };
    const response = await axios.patch(
      `${api.application.updateStatus}/${candidateId}`,
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

export async function DeleteCandidateById(candidateId: string) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.delete(
      `${api.application.candidate}/${candidateId}`,
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

export async function GetApplicationByUserId(userId: string) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(
      `${api.application.candidate}/byUser/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}
