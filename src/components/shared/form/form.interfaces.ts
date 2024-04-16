export enum InputType {
    TEXT = 'InputText',
    SELECT = 'InputSelect',
    DATE = 'InputDate',
    PHONE = 'InputPhone'
}
export interface Field{
    content: any[];
    disabled: boolean;
}

export interface TabMenu {
    menus: string[];
}