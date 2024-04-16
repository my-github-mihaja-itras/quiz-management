import { FilterKeywords } from "@/components/shared/filter/filter.constant";
import { api } from "@/cores/constant/constant.resource.api";
import { ExtractFilterKeywords } from "@/utils/extract.filterKeywords";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";
import { createAdministrationDto } from "./administration.model";
import { HistoryType } from "@/components/shared/history/history.constant";

export async function saveAdministrationUser(
  administrationData: createAdministrationDto
) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.post(
      `${api.personnalAdmin.index}`,
      JSON.stringify(administrationData),
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

export async function getPaginatedAdministration(
  page: number,
  pageSize: number,
  filterKeywords: FilterKeywords[],
  searchKeywords: string
): Promise<any> {
  const keywords = ExtractFilterKeywords(filterKeywords);
  const search = `&search=${searchKeywords}`;
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(
      `${
        api.personnalAdmin.personalAdminList
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

export async function GetAdministrationById(adminId: string) {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.personnalAdmin.index}/${adminId}`, {
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

export async function EditAdministrationById(
  administrationId: string,
  updateData: any,
  history: HistoryType
) {  
  
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const payload = { data: updateData, history };
    const response = await axios.patch(
      `${api.personnalAdmin.index}/update/${administrationId}`,
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
export async function DeleteAdministrationById(administrationId: string) {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.delete(
      `${api.personnalAdmin.index}/${administrationId}`,
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
