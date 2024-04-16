import axios from "axios";
import { Login } from "./login.models";
import { api } from "@/cores/constant/constant.resource.api";

export async function loginService(data: Login): Promise<any> {
  try {
    const response = await axios.post(
      `${api.auth.login}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}
