import { useForm } from "react-hook-form";
import style from "./registration-period.form.fields.module.css";
import { useState } from "react";
import { InputDate, InputSwitch } from "../shared/form/input-field/input-field";
import { isoDateStringToDate } from "@/utils/date.utils";
import { HttpStatusCode } from "axios";
import { RegistrationPeriod } from "@/services/registration-period/registration-period.model";
import { EditRegistrationPeriodById } from "@/services/registration-period/registration-period.services";
import { ActionType, EntityName } from "@/cores/constant/constant.history";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";

export interface RegistrationPeriodFormType {
  startDate: Date;
  endDate: Date;
  isOpen?: boolean;
}

export interface RegistrationPeriodFormFieldsProps {
  onChange: any;
  data: RegistrationPeriod;
}

const RegistrationPeriodFormFields: React.FC<
  RegistrationPeriodFormFieldsProps
> = ({ onChange, data }) => {
  const {
    register,
    watch,
    setValue,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors, disabled },
  } = useForm<RegistrationPeriodFormType>();

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const [isOpen, setIsOpen] = useState<boolean | undefined>(data?.isOpen);
  const [fieldsIsDisable, setFieldsIsDisable] = useState<boolean>(true);
  const registrationPeriodId = data._id;

  const token = getLocalStorageItem("loginAccessToken") || "";
  const tokenInfo: any = extractTokenInfo(token);

  const onSubmit = async (data: any) => {
    let { startDate, endDate, isOpen } = data;
    const dateNow = isoDateStringToDate(new Date().toISOString()).replaceAll(
      "/",
      "-"
    );

    const history = {
      action: { name: ActionType.UPDATE_REGISTRATION_PERIOD },
      user: tokenInfo._id,
      targetId: registrationPeriodId,
      entity: EntityName.REGISTRATION_PERIOD,
    };

    if (startDate > endDate) {
      setIsOpen(false);
      onChange({
        success: false,
        title: "Erreur",
        message: "Veuillez bien vérifier les deux date",
      });
    } else if ((dateNow < startDate || dateNow > endDate) && isOpen) {
      onChange({
        success: false,
        title: "Erreur",
        message:
          "Le période d'inscription ne doit pas être ouvert que le jour-J",
      });
    } else {
      const dataToUpdate = {
        registrationPeriod: { startDate, endDate, isOpen: isOpen },
        history,
      };

      const response = await EditRegistrationPeriodById(
        registrationPeriodId as string,
        dataToUpdate
      );
      if (response.status == HttpStatusCode.Ok) {
        setFieldsIsDisable(!fieldsIsDisable);
        onChange({
          success: true,
          title: "Succès",
          message: "La période d'inscription a été modifié avec succès",
        });
      } else {
        onChange({
          success: false,
          title: "Erreur",
          message: "Veuillez contacter le service technique",
        });
      }
    }
  };

  const handleToggleChange = (isChecked: boolean) => {
    setIsOpen(isChecked);
  };

  const handleChangeDisabledFields = () => {
    setFieldsIsDisable(!fieldsIsDisable);
  };

  return (
    <>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.formBody}>
            <div className={`${style.colDivCustom} ${style.my5} ${style.gap2}`}>
              <InputDate
                label="Date de début"
                onChange={data?.startDate}
                fieldName={"startDate"}
                register={register}
                value={data?.startDate}
                onError={errors.startDate}
                readOnly={fieldsIsDisable}
              />
              <InputDate
                label="Date de fin"
                onChange={data?.endDate}
                fieldName={"endDate"}
                register={register}
                value={data?.endDate}
                onError={errors.endDate}
                readOnly={fieldsIsDisable}
              />
              <InputSwitch
                label="Statut"
                register={register}
                handleChange={handleToggleChange}
                fieldName="isOpen"
                isChecked={isOpen ?? false}
                readOnly={fieldsIsDisable}
                required={false}
                checkedValue={isOpen ? "Ouvert" : "Fermé"}
              />
            </div>
          </div>

          <div className={style.action}>
            {fieldsIsDisable ? (
              <a
                type="button"
                onClick={handleChangeDisabledFields}
                className={style.editBtn}
              >
                Modifier
              </a>
            ) : (
              <>
                <button type="submit" className={style.saveBtn}>
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={handleChangeDisabledFields}
                  className={style.editBtn}
                >
                  Annuler
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationPeriodFormFields;
