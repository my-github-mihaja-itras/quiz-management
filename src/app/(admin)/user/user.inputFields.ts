import { InputFieldType } from "@/components/form/add.form.component";

export const userInputFields: InputFieldType[] = [
    {
        label: "Nom",
        inputType: "text",
        placeholder: "",
        name: "lastname",
        required: true,
    },
    {
        label: "Prénom(s)",
        inputType: "text",
        name: "firstname",
        required: true,
    },
    {
        label: "Identifiant",
        inputType: "text",
        name: "username",
        required: true,
    },
    {
        label: "E-mail",
        inputType: "email",
        name: "email",
        required: true,
    },
    {
        label: "Mot de passe",
        inputType: "password",
        name: "password",
        required: true,
    },
    {
        label: "Confirmation de mot de passe",
        inputType: "password",
        name: "password",
        required: true,
    },
    {
        label: "Groupe",
        inputType: "select",
        name: "groups",
        required: true,
        selectData: [
            {
                label: "ADMINISTRATION",
                value: "ADMIN",
            },
            {
                label: "STUDENT",
                value: "STUDENT",
            },
            {
                label: "TEACHER",
                value: "TEACHER",
            },
        ],
    },
    {
        label: "Rôle",
        inputType: "select",
        name: "roles",
        required: true,
        selectData: [
            {
                label: "Chef du département",
                value: "ROLE_ADMIN_1",
            },
            {
                label: "Adjoint du chef",
                value: "ROLE_ADMIN_2",
            },
            {
                label: "Secrétaire",
                value: "ROLE_ADMIN_3",
            },
            {
                label: "Candidat",
                value: "ROLE_CANDIDATE",
            },
            {
                label: "Chef de classe",
                value: "ROLE_STUDENT_1",
            },
            {
                label: "Étudiant",
                value: "ROLE_STUDENT_2",
            },
            {
                label: "Visiteur",
                value: "ROLE_GUEST",
            },
        ],
    },
];