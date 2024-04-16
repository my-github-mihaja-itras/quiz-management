import { PrivilegeName } from "@/cores/privileges/privileges.interfaces";
import { DashboardCard } from "./interfaces";
import { ApplicationStatus } from "@/cores/constant/constant.application";

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
    [ApplicationStatus.UNREAD]: 'Non lus',
    [ApplicationStatus.IN_PROCESSING]: 'En traitement',
    [ApplicationStatus.REGISTRATED_FOR_COMPETITION]: 'Inscrits au Bootcamp',
    [ApplicationStatus.ACCEPTED_FOR_INTERVIEW]:'En attente d\'entretien',
    [ApplicationStatus.INTERVIEWED]: 'Interviewés',
    [ApplicationStatus.REQUEST_ACCEPTED]: 'Candidats acceptés',
    [ApplicationStatus.REQUEST_REFUSED]: 'Candidats refusés'
    
};

export const DASHBOARD: DashboardCard[] = [
    {
       
        count: 0,
        status: "Candidats inscrits",
        linkDetail: "/candidate",
        usePrivilege: PrivilegeName.VIEW_APPLICATION,
        color: "#FFD1D9,#D35151"
    },
    {
        count: 0,
        status: ApplicationStatus.UNREAD,
        linkDetail: "/candidate",
        usePrivilege: PrivilegeName.VIEW_APPLICATION,
        color: "#FFECD1,#FFA319"
    },
    {
        count: 0,
        status: ApplicationStatus.IN_PROCESSING,
        linkDetail: "/candidate",
        usePrivilege: PrivilegeName.VIEW_APPLICATION,
        color: "#D6F2FF,#0FC3ED"
    },
    {
        count: 0,
        status: ApplicationStatus.REGISTRATED_FOR_COMPETITION,
        linkDetail: "/candidate",
        usePrivilege: PrivilegeName.VIEW_APPLICATION,
        color: "#DDF4D2,#57CA22"
    },
    {
        count: 0,
        status: ApplicationStatus.ACCEPTED_FOR_INTERVIEW,
        linkDetail: "/candidate",
        usePrivilege: PrivilegeName.VIEW_APPLICATION,
        color: "#FFECD1,#FFA319"
    },
    {
        count: 0,
        status: ApplicationStatus.INTERVIEWED,
        linkDetail: "/candidate",
        usePrivilege: PrivilegeName.VIEW_APPLICATION,
        color: "#D6F2FF,#0FC3ED"
    },
    {
        count: 0,
        status: ApplicationStatus.REQUEST_ACCEPTED,
        linkDetail: "/candidate",
        usePrivilege: PrivilegeName.VIEW_APPLICATION,
        color: "#DDF4D2,#57CA22"
    },
    {
        count: 0,
        status: ApplicationStatus.REQUEST_REFUSED,
        linkDetail: "/candidate",
        usePrivilege: PrivilegeName.VIEW_APPLICATION,
        color: "#FFD1D9,#D35151"
    },
];
