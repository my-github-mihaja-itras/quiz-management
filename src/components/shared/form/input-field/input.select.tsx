"use client";

import style from "./input.module.css";
import { UseFormRegister, UseFormUnregister } from "react-hook-form";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import IconDropdown from "../../icons/iconDropdown";
import IconDropup from "../../icons/iconDropup";
import Select, { components } from "react-select";
import { customInputSelectStyle } from "./input.select.constant";
import {
  InputSelectForFilterProps,
  InputSelectMultipleProps,
  InputSelectWithCheckboxProps,
  OptionsType,
} from "./input.interface";
import UseWindowSize from "@/cores/window/window.size";

export const InputCheckbox = ({
  name,
  register,
  unregister,
  fieldName,
  validate,
  onChangeCheck,
  allIselected,
  isKeysWordsPrivileges,
  value,
  readOnly,
}: {
  name: string;
  register: UseFormRegister<any>;
  unregister: UseFormUnregister<any>;
  fieldName: string;
  validate?: any;
  onChangeCheck?: any;
  allIselected: boolean;
  isKeysWordsPrivileges: boolean;
  value?: any;
  readOnly?: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChangeCheck(value);
  };

  const cleanupWhenUnmouted = () => {
    unregister(fieldName as any);
  };

  useEffect(() => {
    if (allIselected || isKeysWordsPrivileges) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [allIselected]);

  useEffect(() => {
    if (isChecked || allIselected) {
      register(fieldName as any, {
        onChange: handleCheckboxChange,
      });
    } else {
      unregister(fieldName as any);
    }
    return cleanupWhenUnmouted();
  }, [isChecked, allIselected]);

  return (
    <>
      <input
        type="checkbox"
        checked={isChecked}
        value={value}
        {...register(fieldName as any, {
          onChange: handleCheckboxChange,
        })}
        readOnly={readOnly}
      />
    </>
  );
};

export const InputSelect = ({
  label,
  register,
  fieldName,
  required,
  onChange,
  optionsValues,
  isDisabled,
  selectedValue,
  readOnly,
  placeholder,
  onError,
}: {
  label?: string;
  register: UseFormRegister<any>;
  fieldName: string;
  required?: boolean;
  onChange?: any;
  isDisabled?: boolean;
  optionsValues: OptionsType[];
  selectedValue?: OptionsType;
  readOnly?: any;
  placeholder?: any;
  onError?: any;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`${style.inputContainer}  
            ${style.formGroup}
            ${isFocused || onChange ? style.formInputFocused : ""}`}
    >
      {label && <label className={style.placeholder}>{label}</label>}
      <select
        {...register(fieldName as any, {
          required: required ? "Champs requis" : false,
          value: selectedValue?.value ? selectedValue?.value : "",
        })}
        disabled={readOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
        ${onError ? style.formInputError : style.formSelect} ${
          onChange && style.formInputNotEmpty
        } `}
        style={selectedValue ? { fontSize: "12px" } : { fontSize: "10px" }}
      >
        {/* Placeholder option */}
        {!selectedValue && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {/* {readOnly && selectedValue && (
          <option value="">{selectedValue?.label}</option>
        )} */}
        {/* {!readOnly && (
          <option value={selectedValue && selectedValue?.value}>
            {selectedValue && selectedValue?.label}
          </option>
        )} */}
        {optionsValues.map((item: OptionsType, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const InputSelectMultiple: React.FC<InputSelectMultipleProps> =
  forwardRef(
    (
      {
        label,
        placeholder,
        options,
        required,
        defaultValue,
        isDisabled = false,
        setValue,
        fieldName,
        onError,
      },
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

      const onSelectedOption = (res: any) => {
        setSelectedOptions(res);
      };
      useEffect(() => {
        setSelectedOptions(defaultValue);
      }, []);

      useEffect(() => {
        if (setValue && selectedOptions) {
          const selectedValues = selectedOptions.map((option) => option.value);
          setValue(fieldName, selectedValues);
        } else {
          const selectedValues = defaultValue.map((option) => option.value);
          setValue(fieldName, selectedValues);
        }
      }, [selectedOptions, setValue, fieldName]);

      return (
        <div
          ref={ref}
          className={` ${
            onError
              ? style.inputDropdownCheckboxError
              : style.inputDropdownCheckbox
          }`}
        >
          {label && <label className={style.label}>{label}</label>}
          <InputSelectWithCheckBox
            defaultValue={defaultValue}
            options={options}
            placeholder={placeholder || ""}
            selectedValue={selectedOptions}
            isDisabled={isDisabled}
            onSelectedOption={onSelectedOption}
            styles={customInputSelectStyle}
            required={required}
            onError={onError}
          />
        </div>
      );
    }
  );

export const InputSelectWithCheckBox = forwardRef<
  HTMLDivElement,
  InputSelectWithCheckboxProps
>(
  (
    {
      defaultValue,
      options,
      selectedValue,
      onSelectedOption,
      isDisabled,
      placeholder,
      styles,
      required = false,
      onError,
    },
    ref
  ) => {
    const [selectedOptions, setSelectedOptions] = useState(defaultValue || []);

    const handleSelectedOption = (selectedOptions: any) => {
      if (Array.isArray(selectedOptions)) {
        const newSelectedOptions = selectedOptions.map((option: any) => {
          return {
            label: option.label,
            alias: option.alias,
            value: option.value,
          };
        });
        setSelectedOptions(newSelectedOptions);
      }
    };

    useEffect(() => {
      onSelectedOption(selectedOptions);
    }, [selectedOptions]);
    const defaultPlaceholder = `${"Sélectionner une option"}`;
    return (
      <div ref={ref} className="select-component">
        <Select
          className={onError ? style.reactSelectError : ""}
          required={required}
          styles={styles}
          defaultValue={defaultValue}
          isDisabled={isDisabled}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          placeholder={`${placeholder || defaultPlaceholder}`}
          value={selectedValue}
          onChange={handleSelectedOption}
          menuPortalTarget={document.body}
          options={options}
          components={{
            NoOptionsMessage: () => (
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "12px",
                  fontFamily: "Roboto",
                }}
              >
                Aucun option a sélectionner
              </div>
            ),
            Option: !isDisabled ? OptionCheckbox : OptionCheckboxDisabled,
            MultiValueLabel: ({ data }) => <span style={{}}>{data.alias}</span>,
          }}
        />
      </div>
    );
  }
);
export const OptionCheckboxDisabled = () => {
  return <></>;
};

export const OptionCheckbox = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}: any) => {
  const [isActive, setIsActive] = useState(false);

  const onChange = () => {};

  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "#e7edfa";
  if (isFocused) bg = "#F2F6FF";
  if (isActive) bg = "#F2F6FF";

  const customStyle = {
    display: "flex ",
    justifyContent: " start",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style: customStyle,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <div className={style.optionSelect}>
        <input type="checkbox" checked={isSelected} onChange={onChange} />
        {children}
      </div>
    </components.Option>
  );
};

export const customDropdownIndicator = ({ innerProps, selectProps }: any) => {
  const { menuIsOpen } = selectProps;

  return (
    <components.DropdownIndicator {...innerProps}>
      {menuIsOpen ? <IconDropup /> : <IconDropdown />}
    </components.DropdownIndicator>
  );
};

/// INPUT TYPE SELECT CUSTOM FOR FILTER COMPONENT

export const InputSelectForFilter = forwardRef<
  HTMLDivElement,
  InputSelectForFilterProps
>(
  (
    {
      defaultValue,
      options,
      selectedValue,
      onSelectedOption,

      isDisabled,
      placeholder,
      styles,
      required = false,
      onError,
    },
    ref
  ) => {
    const [selectedOptions, setSelectedOptions] = useState(selectedValue);

    const handleSelectedOption = (selectedOptions: any) => {
      if (Array.isArray(selectedOptions)) {
        const newSelectedOptions = selectedOptions.map((option: any) => {
          return {
            label: option.label,
            alias: option.alias,
            value: option.value,
          };
        });
        setSelectedOptions(newSelectedOptions);
      }
    };

    useEffect(() => {
      onSelectedOption(selectedOptions);
    }, [selectedOptions]);

    return (
      <div ref={ref} className="select-component">
        <Select
          className={onError ? style.reactSelectError : ""}
          required={required}
          styles={styles}
          defaultValue={defaultValue}
          isDisabled={isDisabled}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          placeholder={placeholder || "Sélectionner une ou plusieurs options"}
          onChange={handleSelectedOption}
          options={options}
          value={selectedValue}
          components={{
            Option: !isDisabled ? OptionCheckbox : OptionCheckboxDisabled,
            MultiValueLabel: ({ data }) => <span style={{}}>{data.alias}</span>,
          }}
        />
      </div>
    );
  }
);
