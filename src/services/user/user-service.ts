import { FilterKeywords } from "@/components/shared/filter/filter.constant";
import { HistoryType } from "@/components/shared/history/history.constant";
import { ActionType } from "@/cores/constant/constant.history";
import { api } from "@/cores/constant/constant.resource.api";
import { ExtractFilterKeywords } from "@/utils/extract.filterKeywords";
import extractTokenInfo from "@/utils/extract.token";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import axios from "axios";
import { User, createUserDto } from "./user.models";

export async function getPrivileges(
  userId: string,
  token: string | null
): Promise<any> {
  try {
    const response = await axios.get(
      `${api.user.index}/user-privileges/${userId}`,
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

export async function getPaginatedUser(
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
        api.user.list
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

export async function getAllUser(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.user.index}`, {
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

export async function getUserById(userId: string): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const response = await axios.get(`${api.user.index}/${userId}`, {
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

export async function getGroupCount(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(`${api.user.index}/group-count`, {
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

export async function getRoleCount(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(`${api.user.index}/role-count`, {
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

export async function getCountUserByRole(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(`${api.user.index}/role`, {
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

export async function getActivityCount(): Promise<any> {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.get(`${api.user.index}/activity-count`, {
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

export async function saveUsers(userData: createUserDto) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const response = await axios.post(
      `${api.user.index}`,
      JSON.stringify(userData),
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

export async function DeleteUserById(userId: string) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const data = { isDelete: true, isActive: false };
    const response = await axios.patch(
      `${api.user.index}/${userId}`,
      JSON.stringify(data),
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

export async function DisableUserById(userId: string, status: boolean) {
  try {
    const token = getLocalStorageItem("loginAccessToken") || "";
    const tokenInfo: any = extractTokenInfo(token);
    const data = {
      data: { isActive: !status },
      history: {
        action: {
          name: status ? ActionType.DISABLE_USER : ActionType.ENABLE_USER,
          proof: "",
        },
        user: tokenInfo._id,
        targetId: userId,
        entity: "User",
      },
    };

    const response = await axios.patch(
      `${api.user.index}/${userId}`,
      JSON.stringify(data),
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

export async function EnableUserById(userId: string) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const data = { isActive: true };

    const response = await axios.patch(
      `${api.user.index}/${userId}`,
      JSON.stringify(data),
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

export async function GetUserById(userId: string) {
  try {
    const token = getLocalStorageItem("loginAccessToken");

    const response = await axios.get(`${api.user.index}/${userId}`, {
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

export async function EditUserById(
  userId: string,
  userData: any,
  history: HistoryType
) {
  try {
    const token = getLocalStorageItem("loginAccessToken");
    const payload = { data: userData, history };
    const response = await axios.patch(
      `${api.user.index}/${userId}`,
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
export async function checkDuplication(user: User): Promise<any> {
  const userApiUrl = api.user.checkDuplication;
  const token = getLocalStorageItem("loginAccessToken");
  try {
    const res = await fetch(userApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(
        `Request failed with status ${res.status}: ${await res.text()}`
      );
    }
  } catch (error) {
    console.error("Error during API request:", error);
    throw error;
  }
}

export const checkUserDuplication = async (user: any) => {
  const isDuplicated = await checkDuplication(user);
  if (isDuplicated.data) {
    return true;
  }
  return false;
};
