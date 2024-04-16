import { ApplicationStatus } from "../constant/constant.application";

export enum StepStatus {
    CHECKED = 'CHECKED',
    CHECKING = 'CHECKING',
    NOT_CHECKED = 'NOT_CHECKED',
    REFUSED = 'REFUSED',
}

export const APPLICATION_STATUS_COLOR: Record<ApplicationStatus, string> = {
    [ApplicationStatus.UNREAD] : "#ffa319",
    [ApplicationStatus.IN_PROCESSING] : "#0fc3ed",
    [ApplicationStatus.REGISTRATED_FOR_COMPETITION] : "#57ca22",
    [ApplicationStatus.ACCEPTED_FOR_INTERVIEW] : "#ffa319",
    [ApplicationStatus.INTERVIEWED] : "#33c2ff",
    [ApplicationStatus.REQUEST_ACCEPTED] : "#57ca22",
    [ApplicationStatus.REQUEST_REFUSED] : "#ff2950",
}

export interface Step {
    label: string;
    date: any;
    applicationStatus?: any;
    status: StepStatus
}