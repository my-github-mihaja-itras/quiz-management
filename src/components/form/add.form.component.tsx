import style from "@/components/form/add.form.module.css";
import { useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

export interface InputFieldType {
  label: string;
  inputType: string;
  name: any;
  required: boolean;
  value?: string;
  placeholder?: string;
  register?: {};
  selectData?: SelectFieldType[];
}

export interface SelectFieldType {
  label: string;
  value: string;
}
interface AddFormComponentProps<T> {
  title: string;
  inputFields: InputFieldType[];
  handleOpenForm?: ((isOpen: boolean) => void) | undefined;
  dispatchService?: any;
}

const AddFormComponent: React.FC<AddFormComponentProps<any>> = ({
  title,
  inputFields,
  handleOpenForm,
  dispatchService,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<any> = async (data) => {
    dispatchService(data);
  };

  const onError: SubmitErrorHandler<any> = (error) => {};

  const handleCancel = (formIsOpen: boolean) => {
    reset();
    if (handleOpenForm) {
      handleOpenForm(formIsOpen);
    }
  };
  return (
    <>
      <div className={style.formTitle}>{title}</div>
      <form
        className={style.formContainer}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {inputFields.map((field, index) => (
          <div key={`${field?.inputType}-${index}`} className={style.formField}>
            <label className={style.label}>{field?.label}</label>
            {field?.inputType === "select" ? (
              <>
                <select
                  className={
                    errors[field?.name] && errors[field?.name]
                      ? style.inputError
                      : style.input
                  }
                  {...register(field.name, { required: field.required })}
                >
                  {field?.selectData?.map((option, i) => (
                    <option key={`select-data-${i}`} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
                {errors[field?.name]?.type === "required" && (
                  <div className={style.errorMessage}>Champ requis</div>
                )}
              </>
            ) : (
              <>
                <input
                  className={
                    errors[field?.name] && errors[field?.name]
                      ? style.inputError
                      : style.input
                  }
                  type={field?.inputType || "text"}
                  value={field?.value}
                  placeholder={field?.placeholder}
                  {...field?.register}
                  {...register(field?.name, {
                    required: field?.required,
                  })}
                />

                {errors[field?.name]?.type === "required" && (
                  <div className={style.errorMessage}>Champ requis</div>
                )}
              </>
            )}
          </div>
        ))}
        <div className={style.formButton}>
          <button className={style.confirmButton} type="submit">
            Ajouter
          </button>
          <button
            className={style.cancelButton}
            type="button"
            onClick={() => handleCancel(formIsOpen)}
          >
            Annuler
          </button>
        </div>
      </form>
    </>
  );
};

export default AddFormComponent;
