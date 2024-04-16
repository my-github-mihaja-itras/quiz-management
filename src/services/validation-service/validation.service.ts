import { UserValidation } from "./validation.models";
import axios from "axios";
import { api } from "@/cores/constant/constant.resource.api"



export async function validateCandidate(userId: string, userValidation: UserValidation): Promise<any> {
    try {
        const username = userValidation.login
        const password = userValidation.password
        const data = { username: username, password: password }

        const response = await axios.patch(`${api.user.index}/update-candidate/${userId}`, JSON.stringify(data), {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        return response;
    } catch (error: any) {
        return error.response;

    }
}

export async function checkUsernameCandidate(username: string): Promise<any> {
    try {
        const data = { username: username }
        const response = await axios.post(`${api.user.index}/check-username`, JSON.stringify(data), {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })

        return response;
    } catch (error: any) {
        return error.response;

    }
}


async function getCandidateToken(login: string): Promise<string> {
    try {
        const defaultPassword = "ChangeMe2023"
        const data = { login: login, password: defaultPassword }

        const response = await axios.post(`${api.auth.login}`, JSON.stringify(data), {

        })

        return response.data.data.token;
    } catch (error) {
        console.error("Error getting token:", error);
        throw error;
    }
}
