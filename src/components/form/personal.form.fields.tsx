import { useFormContext } from "react-hook-form";
import style from "./personal.form.field.module.css";
import {
  InputDate,
  InputPhone,
  InputSwitch,
  InputText,
} from "../shared/form/input-field/input-field";
import { useEffect, useState } from "react";
import Toggle from "../shared/form/toggleForm/toggle.form.component";
import { Role } from "@/services/role/role.models";
import { Group } from "@/services/group/group.models";
import { getAllRoles } from "@/services/role/role.service";
import { getAllGroups } from "@/services/group/group.service";
import {
  InputSelect,
  InputSelectMultiple,
} from "../shared/form/input-field/input.select";
import { genderOption } from "./user.form.fields";

interface PersonalFieldsProps {
  fieldsIsDisabled: boolean;
  personalData: PersonalForm;
}
export interface PersonalForm {
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

export const PersonalFormFields: React.FC<PersonalFieldsProps> = ({
  fieldsIsDisabled,
  personalData,
}) => {
  const [groupsOptions, setGroupsOptions] = useState<any[]>([]);
  const [rolesOptions, setRolesOptions] = useState<any[]>([]);
  const [isActive, setIsActive] = useState<boolean | undefined>(
    personalData.isActive
  );
  //
  const loadGroupAndRoles = async () => {
    const rolesRes = await getAllRoles();
    const groupsRes = await getAllGroups();
    const roles = rolesRes.data;
    const groups = groupsRes.data;
    setGroupsOptions(
      groups.map((Group: Group) => {
        return {
          label: Group.name,
          alias: Group.alias,
          value: Group._id,
        };
      })
    );
    setRolesOptions(
      roles.map((Role: Role) => {
        return {
          label: Role.name,
          alias: Role.alias,
          value: Role._id,
        };
      })
    );
  };

  // Rechargement de la page apres chaque load
  useEffect(() => {
    loadGroupAndRoles();
  }, []);

  const {
    register,
    watch,
    setValue,
    unregister,
    getValues,
    formState: { errors, disabled },
  } = useFormContext<PersonalForm>();

  const cursus = watch("cursus", "Développement Full Stack");

  const handleToggleChange = (isChecked: boolean) => {
    setIsActive(isChecked);
  };

  return (
    <div className={style.formContainer}>
      <div className={style.form}>
        <div className={style.formHeader}>Compte utilisateur</div>
        <div className={style.formBody}>
          <div className={`${style.colDiv2} ${style.gap4}`}>
            <div>
              <div className={`${style.colDiv1} ${style.my5} `}>
                <InputText
                  label="Identifiant IC"
                  onChange={personalData.username}
                  fieldName={"username"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={personalData.username}
                  required={"Champ requis"}
                  onError={errors.username}
                  isDisabled={true}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Email"
                  onChange={personalData.email}
                  fieldName={"email"}
                  validate={"mail"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={personalData.email}
                  onError={errors.email}
                />
              </div>

              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSwitch
                  label="Statut"
                  register={register}
                  handleChange={handleToggleChange}
                  fieldName="isActive"
                  isChecked={isActive ?? false}
                  readOnly={fieldsIsDisabled}
                  required={false}
                  checkedValue={isActive ? "Actif" : "Inactif"}
                />
              </div>
            </div>
            <div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelectMultiple
                  isDisabled={fieldsIsDisabled}
                  label="Groupe"
                  defaultValue={personalData?.groups.map((group) => ({
                    label: group.name,
                    alias: group.alias,
                    value: group._id,
                  }))}
                  fieldName="groups"
                  options={groupsOptions}
                  setValue={setValue}
                  required={true}
                />
              </div>

              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelectMultiple
                  isDisabled={fieldsIsDisabled}
                  label="Rôle"
                  defaultValue={personalData?.roles.map((role) => ({
                    label: role.name,
                    alias: role.alias,
                    value: role._id,
                  }))}
                  fieldName="roles"
                  options={rolesOptions}
                  setValue={setValue}
                  required={true}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelect
                  label="Filière"
                  onChange={cursus}
                  fieldName="cursus"
                  register={register}
                  readOnly={fieldsIsDisabled}
                  selectedValue={{
                    label: "Développement Full Stack",
                    value: "Développement Full Stack",
                  }}
                  optionsValues={[
                    {
                      label: "Développement Full Stack",
                      value: "Développement Full Stack",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.form}>
        <div className={style.formHeader}>Informations personnelles</div>
        <div className={style.formBody}>
          <div className={`${style.colDiv2} ${style.gap4}`}>
            <div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelect
                  label="Civilité"
                  onChange={personalData?.gender}
                  fieldName="gender"
                  register={register}
                  readOnly={true}
                  selectedValue={
                    personalData.gender === "MALE"
                      ? { label: "M.", value: "MALE" }
                      : { label: "Mme", value: "FEMALE" }
                  }
                  optionsValues={genderOption}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Nom"
                  onChange={personalData.lastname}
                  fieldName={"lastname"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={personalData.lastname}
                  onError={errors.lastname}
                />
              </div>

              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Prénom(s)"
                  fieldName={"firstname"}
                  readOnly={fieldsIsDisabled}
                  onChange={personalData.firstname}
                  register={register}
                  value={personalData.firstname}
                  onError={errors.firstname}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputPhone
                  label="Téléphone"
                  fieldName={"phone"}
                  onChange={getValues("phone")}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={getValues("phone") ?? personalData.phone}
                  getPhone={(response: string[]) => {
                    setValue("phone", response);
                    // console.log(response[0]);
                  }}
                />
              </div>
            </div>
            <div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputDate
                  label="Date de naissance"
                  onChange={personalData.birthDate}
                  fieldName={"birthDate"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={personalData?.birthDate}
                  onError={errors.birthDate}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Lieu de naissance"
                  onChange={personalData.birthPlace}
                  fieldName={"birthPlace"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={personalData.birthPlace}
                  onError={errors.phone}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Adresse"
                  onChange={getValues("address")}
                  fieldName={"address"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={personalData.address.split("&&")[0]}
                  onError={errors.address}
                />
              </div>
              <div className={`${style.colDiv2} ${style.my5} ${style.gap1}`}>
                <InputText
                  label="Ville"
                  onChange={getValues("city")}
                  fieldName={"city"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={personalData.address.split("&&")[2]}
                  onError={errors.city}
                />
                <InputText
                  label="Code postal"
                  onChange={getValues("postalCode")}
                  fieldName={"postalCode"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={personalData.address.split("&&")[1]}
                  onError={errors.postalCode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFormFields;
