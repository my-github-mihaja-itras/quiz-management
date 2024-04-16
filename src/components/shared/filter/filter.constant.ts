export interface itemChoiceFilter {
  label: string;
  value: any;
  isChecked: boolean;
  count: number;
}
export interface ChoiceFilterType {
  title: string;
  name: string;
  type: ParsedType;
  element: itemChoiceFilter[];
}

export interface DateFilterType {
  label: string;
  value: any;
}

export enum ParsedType {
  SEARCH = "search",
  LIST = "list",
  FROM_DATE = "from",
  TO_DATE = "to",
  MIN_VALUE = "min",
  MAX_VALUE = "max",
}

/**
 * 

* {
  *   'fullName:search': 'rak',
  *   'creationDate:from': 'Mon Jun 12 2023 03:00:00 GMT+0300', ISODate()
  *   'creationDate:to': 'Tue Jun 13 2023 03:00:00 GMT+0300', ISODate()
  *   'amount:min': 100,
  *   'amount:max': 200,
  *   'status:list': ['PENING', 'DONE']
  * }
  *  */

export interface FilterKeywords {
  category: string;
  key: string;
  value: any;
  type: ParsedType;
}

export interface SearchKeywords {
  type: string;
  value: string;
}
