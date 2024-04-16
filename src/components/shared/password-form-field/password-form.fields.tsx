"use client"
import { useFormContext } from 'react-hook-form';
import { InputField, InputPassword } from '../form/input-field/input-field';
import style from './password.fields.module.css';
interface FormFieldsEditableProps<T> {
  fieldsIsDisabled?:boolean;
}

const PasswordFormFields: React.FC<FormFieldsEditableProps<any>> = ({
  fieldsIsDisabled  
}) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        unregister,
        setError,
        clearErrors,
        resetField,
        formState: { errors, disabled },
      } = useFormContext<any>();
      const actualPassword = watch("actualPassword", "");
      const password1 = watch("password1", "");
      const password2 = watch("password2", "");
    return (
    <div>
        <div className={style.title}>Changer votre mot de passe</div>
          <div className={style.form}>
            <div className={style.formField}>
                <InputPassword
                  label="Mot de passe"
                  onChange={actualPassword}
                  fieldName={"actualPassword"}
                  readOnly={fieldsIsDisabled}
                  haveValidator={true}
                  register={register}
                  onError={errors.actualPassword}
                />
                <InputPassword
                  label="Mot de passe"
                  onChange={password1}
                  fieldName={"password1"}
                  readOnly={fieldsIsDisabled}
                  register={register}
                  onError={errors.password1}
                />
                <InputPassword
                  label="Mot de passe"
                  onChange={password2}
                  fieldName={"password2"}
                  readOnly={fieldsIsDisabled}
                  register={register}
                  onError={errors.password2}
                /> 
            </div>
          </div>
    </div>
    );
}
export default PasswordFormFields;
