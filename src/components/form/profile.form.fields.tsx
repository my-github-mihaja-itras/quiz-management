import { useFormContext } from "react-hook-form";
import style from "./profile.form.field.module.css";
import {
  InputDate,
  InputPhone,
  InputText,
} from "../shared/form/input-field/input-field";
import { Role } from "@/services/role/role.models";
import { Group } from "@/services/group/group.models";

interface UserFieldsProps {
  fieldsIsDisabled: boolean;
  data: UserForm;
}
export interface UserForm {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  gender: string;
  email: string;
  phone: string[];
  birthDate: string;
  birthPlace: string;
  address: string; // AdresseLine1 AdresseLine2&&PostalCode&&City
  city: string;
  postalCode: string;
  photo: string;
  creationDate: string;
  isActive: boolean;
  isDelete: boolean;
  groups: Group[] | any[];
  roles: Role[] | any[];
  cursus: string;
}

export const ProfileFormFields: React.FC<UserFieldsProps> = ({
  fieldsIsDisabled,
  data,
}) => {
  const {
    register,
    watch,
    setValue,
    unregister,
    getValues,
    resetField,
    clearErrors,
    formState: { errors, disabled },
  } = useFormContext<UserForm>();

  return (
    <div className={style.formContainer}>
      <div>
        <div className={style.form}>
          <div className={style.formHeader}>Informations personnelles</div>
          <div className={style.formBody}>
            <div className={`${style.colDiv2} ${style.gap4}`}>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Nom"
                  onChange={data?.lastname}
                  fieldName={"lastname"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.lastname}
                  onError={errors.lastname}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Prénom(s)"
                  fieldName={"firstname"}
                  readOnly={fieldsIsDisabled}
                  onChange={data?.firstname}
                  register={register}
                  value={data?.firstname}
                  onError={errors.firstname}
                />
              </div>
            </div>
            <div className={`${style.colDiv2} ${style.gap4}`}>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputDate
                  label="Date de naissance"
                  onChange={data?.birthDate}
                  fieldName={"birthDate"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.birthDate}
                  onError={errors.birthDate}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Lieu de naissance"
                  onChange={data?.birthPlace}
                  fieldName={"birthPlace"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.birthPlace}
                  onError={errors.birthPlace}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.form}>
          <div className={style.formHeader}>Adresse</div>
          <div className={style.formBody}>
            <div className={`${style.colDiv1} ${style.my5}`}>
              <InputText
                label="Adresse"
                onChange={data?.address}
                fieldName={"address"}
                register={register}
                readOnly={fieldsIsDisabled}
                value={data?.address.split("&&")[0]}
                onError={errors.address}
              />
            </div>
            <div className={`${style.colDiv3} ${style.my5} ${style.gap4}`}>
              <InputText
                label="Ville"
                onChange={getValues("city")}
                fieldName={"city"}
                register={register}
                readOnly={fieldsIsDisabled}
                value={data?.address.split("&&")[2]}
                onError={errors.city}
              />
              <InputText
                label="Code postal"
                onChange={getValues("postalCode")}
                fieldName={"postalCode"}
                register={register}
                readOnly={fieldsIsDisabled}
                value={data?.address.split("&&")[1]}
                onError={errors.postalCode}
              />
            </div>
          </div>
        </div>
        <div className={style.form}>
          <div className={style.formHeader}>Contact</div>
          <div className={style.formBody}>
            <div className={`${style.colDiv1} ${style.my5}`}>
              <InputText
                label="Email"
                onChange={data?.email}
                fieldName={"email"}
                validate={"mail"}
                register={register}
                readOnly={fieldsIsDisabled}
                value={data?.email}
                onError={errors.email}
              />
            </div>
            <div className={`${style.colDiv1} ${style.my5}`}>
              <InputPhone
                label="Téléphone"
                fieldName={"phone"}
                onChange={data?.phone}
                register={register}
                readOnly={fieldsIsDisabled}
                value={getValues("phone") ?? data?.phone}
                getPhone={(response: string[]) => {
                  setValue("phone", response);
                }}
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProfileFormFields;
