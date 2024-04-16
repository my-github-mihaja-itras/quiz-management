import { UseFormSetError, UseFormSetValue } from "react-hook-form";

export interface InputSelectMultipleProps {
  label: string;
  placeholder?: string;
  options: any[];
  defaultValue: any[];
  isDisabled: boolean;
  setValue: UseFormSetValue<any>;
  fieldName: string;
  required: boolean;
  onError?: any;
}
export interface DropdownOptionType {
  label: string;
  value: string;
  alias: string;
  isChecked: boolean;
}
export interface OptionsType {
  label: string;
  value: any;
}

export interface InputSelectWithCheckboxProps {
  defaultValue: any[];
  options: any[];
  selectedValue: any;
  onSelectedOption: any;
  isDisabled: boolean;
  placeholder?: string;
  styles: any;
  required?: boolean;
  onError?: any;
}

export interface InputSelectForFilterProps {
  defaultValue: any[];
  options: any[];
  selectedValue: any;
  onSelectedOption: any;
  isDisabled: boolean;
  placeholder?: string;
  styles: any;
  required?: boolean;
  onError?: any;
}
