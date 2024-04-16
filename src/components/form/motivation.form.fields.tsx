import { useFormContext } from "react-hook-form";
import style from "./motivation.form.field.module.css";

interface MotivationFieldsProps {
  fieldsIsDisabled: boolean;
  motivationData: string;
}
export interface MotivationForm {
  motivation: string;
}

export const MotivationFormFields: React.FC<MotivationFieldsProps> = ({
  fieldsIsDisabled,
  motivationData,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, disabled },
  } = useFormContext<MotivationForm>();

  const motivation = watch("motivation", motivationData);

  return (
    <div className={style.formContainer}>
      <div className={style.formHeader}>Motivation</div>
      <div className={style.formBody}>
        <textarea
          style={{ whiteSpace: "pre-wrap" }}
          readOnly={fieldsIsDisabled}
          {...register("motivation", {
            value: motivationData,
          })}
        ></textarea>
      </div>
    </div>
  );
};

export default MotivationFormFields;
