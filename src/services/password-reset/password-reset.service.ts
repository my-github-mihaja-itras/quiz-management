import { api } from "@/cores/constant/constant.resource.api";
import axios from "axios";
import { PasswordRequestResetDto, PasswordResetDto, } from "./password-reset.models";

export async function passwordResetRequest(requestDto: PasswordRequestResetDto): Promise<any> {
    try {
        const response = await axios.post(`${api.password.request}`, JSON.stringify(requestDto), {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response
    } catch (error: any) {
        return error.response
    }
}


export async function resetPassword(resetDto: PasswordResetDto): Promise<any> {
    try {

        const response = await axios.post(`${api.password.reset}`, JSON.stringify(resetDto), {
            headers: {
                "Content-Type": "application/json",
            }
        })

        return response
    } catch (error: any) {
        return error.response
    }
}