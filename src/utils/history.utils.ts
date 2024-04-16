import { HistoryType } from "@/components/shared/history/history.constant";
import extractTokenInfo from "./extract.token";
import { ActionType } from "@/cores/constant/constant.history";

export const FormatHistory = (token: any, targetId: string): HistoryType => {
    const tokenInfo: any = extractTokenInfo(token);

    const history = {
        action: {
            name: "",
            proof: "",
        },
        user: tokenInfo._id,
        targetId: targetId,
        entity: "",
    }
    return {...history} as HistoryType
}