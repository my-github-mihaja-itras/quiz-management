"use client";

import { SubmitHandler, useFormContext } from "react-hook-form";
import { InputDate, InputPhone, InputText } from "../input-field/input-field";
import style from "./edit-form.module.css";
import { Field, InputType } from "../form.interfaces";
import { InputSelect } from "../input-field/input.select";

export interface Props {
  fields: Field;
}

export default function CustomFormFields({ fields }: Props) {
  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const value = "";

  const fieldToRender = (field: any, index: number) => {
    const { type, ...fieldProp } = field;
    switch (type) {
      case "InputText":
        return (
          <InputText
            key={index}
            {...fieldProp}
            onChange={value}
            register={register}
            isDisabled={fields.disabled}
          />
        );
      case "InputSelect":
        return (
          <InputSelect
            key={index}
            {...fieldProp}
            register={register}
            onChange={value}
            isDisabled={fields.disabled}
          />
        );
      case "InputDate":
        return (
          <InputDate
            key={index}
            {...fieldProp}
            register={register}
            onChange={value}
            isDisabled={fields.disabled}
          />
        );
      case "InputPhone":
        return (
          <InputPhone
            key={index}
            {...fieldProp}
            setValue={setValue}
            register={register}
            onChange={value}
            isDisabled={fields.disabled}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={style.fields}>
      {fields.content.map((field: any, index: number) =>
        fieldToRender(field, index)
      )}
    </div>
  );
}
