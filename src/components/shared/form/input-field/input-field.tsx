"use client";

import style from "./input.module.css";
import styleInputField from "./inputField.module.css";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { forwardRef, useEffect, useState } from "react";
import Toggle from "../toggleForm/toggle.form.component";
import IconPickerColor from "../../icons/iconPickerColor";
import IconEyeSlashError from "../../icons/iconEyeSlashError";
import IconEyeSlashBlue from "../../icons/iconEyeSlashBlue";
import IconEyeError from "../../icons/iconEyeError";
import IconEyeSlash from "../../icons/iconEyeSlash";
import IconEyeBlue from "../../icons/iconEyeBlue";
import IconEye from "../../icons/iconEye";

export const InputText = ({
  label,
  register,
  fieldName,
  validate,
  required,
  isDisabled,
  onChange,
  value,
  readOnly,
  defaultValue,
  onError,
}: {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
  validate?: string;
  required?: string;
  isDisabled?: boolean;
  onChange?: any;
  defaultValue?: string;
  type?: any;
  value?: any;
  readOnly?: any;
  onError?: any;
}) => {
  const validationRules: any = {};
  validationRules.required = required != "" ? required : false;
  if (validate === "mail") {
    validationRules.validate = {
      matchPattern: (v: any) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Email invalide",
    };
  }

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`
      ${style.inputContainer}
      ${style.formGroup}
      ${isFocused || onChange ? style.formInputFocused : ""}
      `}
    >
      <label
        className={`${style.placeholder} ${
          isFocused ? style.labelWhenFocused : style.labelWhenNotFocused
        } `}
      >
        {label}
      </label>
      <input
        type="text"
        autoComplete="new-password"
        {...register(fieldName as any, {
          value: value,
          ...validationRules,
        })}
        value={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={readOnly}
        className={`${onError ? style.formInputError : style.formInput} ${
          onChange && style.formInputNotEmpty
        }`}
        style={{ color: readOnly ? "#909090" : "#5c5c5c" }}
      />
      {onError && (
        <span className={style.errorMessage}>
          {onError.message ? onError.message : "Champ requis"}{" "}
        </span>
      )}
    </div>
  );
};

export const InputTextArea = ({
  label,
  register,
  fieldName,
  validate,
  required,
  isDisabled,
  onChange,
  value,
  readOnly,
  defaultValue,
  onError,
}: {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
  validate?: string;
  required?: string;
  isDisabled?: boolean;
  onChange?: any;
  defaultValue?: string;
  type?: any;
  value?: any;
  readOnly?: any;
  onError?: any;
}) => {
  const validationRules: any = {};
  validationRules.required = required != "" ? required : false;
  if (validate === "mail") {
    validationRules.validate = {
      matchPattern: (v: any) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Email invalide",
    };
  }

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <div
        className={`
      ${style.textAreaContainer}
 
      ${style.formGroup}
      ${isFocused || onChange ? style.formInputFocused : ""}
      
      `}
      >
        <label
          className={`${style.placeholder} ${
            isFocused ? style.labelWhenFocused : style.labelWhenNotFocused
          } `}
        >
          {label}
        </label>
        <textarea
          {...register(fieldName as any, {
            value: value,
            ...validationRules,
          })}
          value={defaultValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={readOnly}
          className={`${onError && style.textareaOnError} `}
          style={{ color: readOnly ? "#909090" : "#5c5c5c" }}
        />
      </div>
      {onError && (
        <div className={style.textAreaContainerTextError}>Champ requis</div>
      )}
    </>
  );
};

export const InputNumber = ({
  label,
  register,
  fieldName,
  validate,
  required,
  isDisabled,
  onChange,
  value,
  readOnly,
  onError,
  max,
}: {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
  validate?: any;
  required?: boolean;
  isDisabled?: boolean;
  onChange?: any;
  type?: any;
  value?: number;
  readOnly?: any;
  onError?: any;
  max?: number;
}) => {
  const validationRules: any = {};
  validationRules.required = required ? "Champs requis" : false;
  validationRules.value = value ? value : 0;
  if (validate) {
    validationRules.validate = validate;
  }

  // Add max validation rule
  if (max) {
    validationRules.max = {
      value: max,
      message: `La valeur ne doit pas dépasser ${max}.`,
    };
  }

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
      <label
        className={`${style.placeholder} ${
          isFocused ? style.labelWhenFocused : style.labelWhenNotFocused
        } `}
      >
        {label}
      </label>
      <input
        type="number"
        autoComplete="new-password"
        {...register(fieldName as any, {
          required: required ? "Champs requis" : false,
          value: value ? value : 0,
          max: max,
        })}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={readOnly}
        min={1}
        max={max && (max as any)}
        className={`${onError ? style.formInputError : style.formInput} ${
          onChange && style.formInputNotEmpty
        }`}
      />
      {onError && <span className={style.errorMessage}>{onError.message}</span>}
    </div>
  );
};

export const InputColor = ({
  label,
  register,
  fieldName,
  validate,
  required,
  isDisabled,
  onChange,
  value,
  readOnly,
  onError,
}: {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
  validate?: any;
  required?: boolean;
  isDisabled?: boolean;
  onChange?: any;
  type?: any;
  value?: any;
  readOnly?: any;
  onError?: any;
}) => {
  const validationRules: any = {};
  validationRules.required = required ? required : false;
  if (validate) {
    validationRules.validate = validate;
  }

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <div
        className={`${style.inputContainer}
         
            ${isFocused || onChange ? style.formInputFocused : ""}`}
      >
        <label className={style.placeholder}>{label}</label>
        <div className={style.colorInputContainer}>
          <div className={style.childColorInputContainer}>
            <input
              style={{ backgroundColor: onChange }}
              id={style.inputColor}
              type="color"
              {...register(fieldName as any, {
                required: "Champs requis",
                value: value,
              })}
              disabled={readOnly}
            />
            <label className={style.textInputColor}>{onChange}</label>
          </div>
          <div className={style.containerIcon}>
            <IconPickerColor />
          </div>
        </div>
        {onError && (
          <span className={style.errorMessage}>{onError.message}</span>
        )}
      </div>
    </>
  );
};

export const InputDate = ({
  label,
  register,
  fieldName,
  validate,
  required,
  isDisabled,
  isBirthdate,
  onChange,
  value,
  readOnly,
  onError,
}: {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
  validate?: any;
  required?: boolean;
  isDisabled?: boolean;
  isBirthdate?: boolean;
  onChange?: any;
  type?: any;
  value?: any;
  readOnly?: any;
  onError?: any;
  handleChange?: any;
  minDate?: any;
}) => {
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 17,
    today.getMonth(),
    today.getDate()
  );
  const seventyYearsAgo = new Date(
    today.getFullYear() - 70,
    today.getMonth(),
    today.getDate()
  );

  const formattedInitialDate = value
    ? new Date(value).toLocaleDateString()
    : "";

  const validationRules: any = {};
  validationRules.required = required ? required : false;
  if (validate) {
    validationRules.validate = validate;
  }

  if (isBirthdate) {
    validationRules.min = {
      value: seventyYearsAgo.toISOString().substr(0, 10),
      message: "Date de naissance invalide",
    };
    validationRules.max = {
      value: eighteenYearsAgo.toISOString().substr(0, 10),
      message: "Date de naissance invalide",
    };
  }

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  return (
    <div
      className={`${style.inputContainer}
            ${style.formGroup}
            ${isFocused || onChange ? style.formInputFocused : ""}`}
    >
      <label className={style.placeholder}>{label}</label>
      <input
        type={isFocused || onChange ? "date" : "text"}
        autoComplete="new-password"
        {...register(fieldName as any, {
          required: "Champs requis",
          value:
            value && isValidDate(value)
              ? new Date(value).toISOString().substr(0, 10)
              : "",
          ...validationRules,
        })}
        defaultValue={formattedInitialDate}
        disabled={readOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${onError ? style.formInputError : style.formInput} ${
          onChange && style.formInputNotEmpty
        }`}
      />
      {onError && <span className={style.errorMessage}>{onError.message}</span>}
    </div>
  );
};

export const InputDateTime = ({
  label,
  register,
  fieldName,
  validate,
  required,
  isDisabled,
  onChange,
  value,
  readOnly,
  onError,
}: {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
  validate?: any;
  required?: boolean;
  isDisabled?: boolean;
  onChange?: any;
  type?: any;
  value?: any;
  readOnly?: any;
  onError?: any;
  handleChange?: any;
  minDate?: any;
}) => {
  //
  const formattedInitialDate = value
    ? new Date(value).toLocaleDateString()
    : "";

  const validationRules: any = {};
  validationRules.required = required ? required : false;
  if (validate) {
    validationRules.validate = validate;
  }
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  return (
    <div
      className={`${style.inputContainer}
            ${style.formGroup}
            ${isFocused || onChange ? style.formInputFocused : ""}`}
    >
      <label className={style.placeholder}>{label}</label>
      <input
        type={isFocused || onChange ? "datetime-local" : "text"}
        autoComplete="new-password"
        {...register(fieldName as any, {
          required: "Champs requis",
          value:
            value && isValidDate(value)
              ? new Date(value).toISOString().substr(0, 10)
              : "",
        })}
        defaultValue={formattedInitialDate}
        disabled={readOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${onError ? style.formInputError : style.formInput} ${
          onChange && style.formInputNotEmpty
        }`}
      />
      {onError && <span className={style.errorMessage}>{onError.message}</span>}
    </div>
  );
};

export const InputTime = ({
  label,
  register,
  fieldName,
  validate,
  required,
  isDisabled,
  onChange,
  value,
  onError,
}: {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
  validate?: any;
  required?: boolean;
  isDisabled?: boolean;
  onChange?: any;
  type?: any;
  value?: any;
  onError?: any;
  handleChange?: any;
  minDate?: any;
}) => {
  // const formattedInitialDate = value
  //   ? new Date(value).toLocaleDateString()
  //   : "";

  const validationRules: any = {};
  validationRules.required = required ? required : false;
  if (validate) {
    validationRules.validate = validate;
  }
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
      <label className={style.placeholder}>{label}</label>
      <input
        type={isFocused || onChange ? "time" : "text"}
        autoComplete="new-password"
        {...register(fieldName as any, {
          required: "Champs requis",
        })}
        defaultValue={value}
        disabled={isDisabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${onError ? style.formInputError : style.formInput} ${
          onChange && style.formInputNotEmpty
        }`}
      />
      {onError && <span className={style.errorMessage}>{onError.message}</span>}
    </div>
  );
};

export const InputDateFilter = ({
  label,
  register,
  fieldName,
  validate,
  required,
  isDisabled,
  onChange,
  value,
  readOnly,
  onError,
  handleChange,
  minDate,
}: {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
  validate?: any;
  required?: boolean;
  isDisabled?: boolean;
  onChange?: any;
  type?: any;
  value?: any;
  readOnly?: any;
  onError?: any;
  handleChange?: any;
  minDate?: any;
}) => {
  //

  const formattedInitialDate = value
    ? new Date(value).toLocaleDateString()
    : "";

  const validationRules: any = {};
  validationRules.required = required ? required : false;
  if (validate) {
    validationRules.validate = validate;
  }
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
      <label className={style.placeholder}>{label}</label>
      <input
        type="date"
        autoComplete="new-password"
        {...register(fieldName as any, {
          required: "Champs requis",
          value: value ? new Date(value).toISOString().substr(0, 10) : "",
        })}
        defaultValue={formattedInitialDate}
        onChange={handleChange}
        disabled={readOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${onError ? style.formInputError : style.formInput} ${
          onChange && style.formInputNotEmpty
        }`}
      />
      {onError && <span className={style.errorMessage}>{onError.message}</span>}
    </div>
  );
};

export const InputPhone = ({
  label,
  register,
  // setValue,
  getPhone,
  fieldName,
  onChange,
  required,
  value,
  isDisabled,
  readOnly,
}: {
  label: string;
  value: string[];
  fieldName: string;
  register: UseFormRegister<any>;
  getPhone: any;
  // setValue: UseFormSetValue<any>;
  required?: boolean;
  isDisabled?: boolean;
  onChange?: any;
  readOnly?: any;
}) => {
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState("");
  const UNIVERSAL_PHONE_REGEX =
    /^((034)|(033)|(032)|(039)|(038)|(020)|(\+261?((33)|(32)|(34)|(39)|(38)|(20))))[0-9]{7,7}$/;
  const handleAddPhoneNumber = (value: any) => {
    if (value && UNIVERSAL_PHONE_REGEX.test(value)) {
      setPhoneNumbers((prevNumbers) => [...prevNumbers, value]);
      // setValue(fieldName, [...phoneNumbers]);
      setInputValue("");
    }
  };

  const handleRemovePhoneNumber = (phoneNumberToRemove: string) => {
    setPhoneNumbers((prevNumbers) =>
      prevNumbers.filter((phoneNumber) => phoneNumber !== phoneNumberToRemove)
    );
  };

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  useEffect(() => {
    getPhone([...phoneNumbers]);
  }, [phoneNumbers]);

  return (
    <div
      className={`${style.inputContainer}
            ${style.formGroup}
            ${isFocused || onChange ? style.formInputFocused : ""}`}
    >
      <label className={style.placeholder}>{label}</label>
      <div className={`${style.valueWrapper} ${style.inputPhoneFocused}`}>
        {phoneNumbers?.map((phone, index) => (
          <div key={index} className={style.chipContainer}>
            <p>{phone}</p>
            {!readOnly && (
              <button
                className={style.chipBtn}
                type="button"
                onClick={() => handleRemovePhoneNumber(phone)}
              >
                &times;
              </button>
            )}
          </div>
        ))}
        {phoneNumbers.length < 2 && (
          <input
            type="text"
            style={{
              height: "35px",
              border: "none",
            }}
            onBlur={handleBlur}
            disabled={readOnly}
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
              handleAddPhoneNumber(event.target.value);
            }}
            onFocus={handleFocus}
          />
        )}
      </div>
    </div>
  );
};

export const InputPassword = ({
  label,
  register,
  fieldName,
  validate,
  required,
  isDisabled,
  onChange,
  value,
  haveValidator,
  readOnly,
  onError,
}: {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
  validate?: any;
  required?: boolean;
  isDisabled?: boolean;
  onChange?: any;
  type?: any;
  haveValidator?: boolean;
  value?: any;
  readOnly?: any;
  onError?: any;
}) => {
  const validationRules: any = {};
  validationRules.required = required ? required : false;
  if (validate) {
    validationRules.validate = validate;
  }

  const [isText, setIsText] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handlePassword = () => {
    setIsText(!isText);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`${style.inputContainer}
            ${style.formGroupPass}
            ${isFocused || onChange ? style.formInputFocused : ""}`}
    >
      <label
        className={`${style.placeholder} ${
          isFocused ? style.labelWhenFocused : style.labelWhenNotFocused
        } `}
      >
        {label}
      </label>
      <input
        type={isText ? "text" : "password"}
        autoComplete="new-password"
        {...register(fieldName as any, {
          required: "Champs requis",
          value: value,
          ...(haveValidator
            ? {}
            : {
                minLength: {
                  value: 8,
                  message:
                    "Le mot de passe doit comporter au moins huit caractères",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+={}[\]:;<>,.?~])/,
                  message:
                    "Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial parmi [-!\"#$%&'()*+,./:;<=>?@[\\]^_`{|}~]",
                },
              }),
        })}
        // readOnly={readOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={readOnly}
        className={`${onError ? style.formInputError : style.formInput} ${
          onChange && style.formInputNotEmpty
        }`}
      />
      <span onClick={handlePassword}>
        {onError ? (
          isText ? (
            <IconEyeSlashError />
          ) : (
            <IconEyeError />
          )
        ) : isText ? (
          isFocused ? (
            <IconEyeSlashBlue />
          ) : (
            <IconEyeSlash />
          )
        ) : isFocused ? (
          <IconEyeBlue />
        ) : (
          <IconEye />
        )}
      </span>
      {/* {onError && <span className={style.errorMessage}>{onError.message}</span>} */}
    </div>
  );
};

export const InputSwitch = ({
  label,
  register,
  fieldName,
  validate,
  required,
  isDisabled,
  handleChange,
  isChecked,
  readOnly,
  checkedValue,
}: {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
  validate?: any;
  required?: boolean;
  isDisabled?: boolean;
  handleChange?: any;
  isChecked: boolean;
  readOnly?: any;
  checkedValue: string;
}) => {
  return (
    <div className={`${style.toggleContainer}`}>
      <label className={style.togglePlaceholder}>{label}</label>
      <div className={style.toggleInput}>
        <span>{checkedValue}</span>
        <Toggle
          defaultChecked={isChecked}
          onChange={handleChange}
          fieldName={fieldName}
          register={register}
          readOnly={readOnly}
          required={required}
        />
      </div>
    </div>
  );
};

export const InputField = forwardRef(
  ({ label, type, errors, value, register, readOnly, onChange }: any, ref) => {
    const [isText, setIsText] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handlePassword = () => {
      setIsText(!isText);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <div
        className={`${styleInputField.formInput} ${
          errors && styleInputField.formInputError
        }`}
      >
        {type === "password" ? (
          <>
            <div
              className={`${styleInputField.inputContainer}
            ${styleInputField.formGroup}
            ${
              (!readOnly && isFocused) || onChange
                ? styleInputField.formInputFocused
                : ""
            }`}
            >
              <label
                className={`${styleInputField.placeholder} ${
                  errors && styleInputField.placeholderError
                }`}
              >
                {label}
              </label>
              <input
                type={isText ? "text" : "password"}
                value={value}
                {...register}
                autoComplete="new-password"
                onFocus={handleFocus}
                readOnly={readOnly}
                onBlur={handleBlur}
                className={`${styleInputField.formInput} ${
                  onChange && styleInputField.formInputNotEmpty
                }`}
              />
              <span onClick={handlePassword}>
                {errors ? (
                  isText ? (
                    <IconEyeSlashError />
                  ) : (
                    <IconEyeError />
                  )
                ) : isText ? (
                  isFocused ? (
                    <IconEyeSlashBlue />
                  ) : (
                    <IconEyeSlash />
                  )
                ) : isFocused ? (
                  <IconEyeBlue />
                ) : (
                  <IconEye />
                )}
              </span>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${styleInputField.inputContainer}
            ${styleInputField.formGroup}
            ${isFocused || onChange ? styleInputField.formInputFocused : ""}`}
            >
              <label className={styleInputField.placeholder}>{label}</label>
              <input
                type={type || "text"}
                value={value}
                autoComplete="new-password"
                {...register}
                readOnly={readOnly}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${
                  readOnly
                    ? styleInputField.readOnly
                    : styleInputField.formInput
                } ${onChange && styleInputField.formInputNotEmpty}`}
              />
            </div>
          </>
        )}
      </div>
    );
  }
);
