export interface Menu {
    label: string;
    icon: string;
    bleuIcon: string;
    link: string;
    usePrivilege?: string;
    child:Child[];
}
export interface Child {
    label: string;
    link: string;
    usePrivilege: string;
}
