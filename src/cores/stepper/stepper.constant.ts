import { ApplicationStatus, statusList } from "../constant/constant.application";
import { StepStatus } from "./stepper.interface";

// export const DEFAULT_STEPS = [
//     {
//         label: 'Dépot de dossier',
//         date: '',
//         status: StepStatus.CHECKED,
//         applicationStatus:ApplicationStatus.UNREAD
//     },
//     {
//         label: 'En traitement',
//         date: '',
//         applicationStatus: ApplicationStatus.IN_PROCESSING,
//         status: StepStatus.NOT_CHECKED
//     },
//     {
//         label: 'Inscription au bootcamp',
//         date: ' ',
//         applicationStatus: ApplicationStatus.REGISTRATED_FOR_COMPETITION,
//         status: StepStatus.NOT_CHECKED
//     },
//     {
//         label: '1ère épreuve - Bootcamp',
//         date: '1 Avr 2023 - 15 Avr 2023',
//         applicationStatus: ApplicationStatus.ACCEPTED_FOR_INTERVIEW,
//         status: StepStatus.NOT_CHECKED
//     },
//     {
//         label: '2ème épreuve - Entretien',
//         date: '',
//         applicationStatus: ApplicationStatus.INTERVIEWED,
//         status: StepStatus.NOT_CHECKED
//     },
//     {
//         label: 'Finalisations des Inscriptions',
//         date: '5 Mai 2024 - 15 Mai 2024',
//         applicationStatus: ApplicationStatus.REQUEST_ACCEPTED,
//         status: StepStatus.NOT_CHECKED
//     },
// ]
export const DEFAULT_STEPS = [
    {
        label: 'Dépot de dossier',
        date: '',
        status: StepStatus.CHECKED,
        applicationStatus:statusList[0]
    },
    {
        label: 'En traitement',
        date: '',
        applicationStatus:statusList[1],
        status: StepStatus.NOT_CHECKED
    },
    {
        label: 'Inscription au bootcamp',
        date: '',
        applicationStatus:statusList[2],
        status: StepStatus.NOT_CHECKED
    },
    {
        label: '1ère épreuve - Bootcamp',
        date: '',
        applicationStatus:statusList[3],
        status: StepStatus.NOT_CHECKED
    },
    {
        label: '2ème épreuve - Entretien',
        date: '',
        applicationStatus:statusList[4],
        status: StepStatus.NOT_CHECKED
    },
    {
        label: 'Finalisations des Inscriptions',
        date: '',
        applicationStatus:statusList[5],
        status: StepStatus.NOT_CHECKED
    },
]