import { useFormContext } from "react-hook-form";
import style from "./personal.form.field.module.css";
import {
  InputDate,
  InputNumber,
  InputPhone,
  InputSwitch,
  InputText,
} from "../shared/form/input-field/input-field";
import { useEffect, useState } from "react";
import { Role } from "@/services/role/role.models";
import { Group } from "@/services/group/group.models";
import { getAllRoles } from "@/services/role/role.service";
import { getAllGroups } from "@/services/group/group.service";
import { Administration } from "@/services/administration/administration.model";
import { OptionsType } from "../shared/form/input-field/input.interface";
import {
  InputSelect,
  InputSelectMultiple,
} from "../shared/form/input-field/input.select";

interface AdministrationFieldsProps {
  fieldsIsDisabled: boolean;
  data: Administration | any;
}
export interface AdministrationForm {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  gender: string;
  email: string;
  birthDate: string;
  birthPlace: string;
  address: string; // AdresseLine1 AdresseLine2&&PostalCode&&City
  city: string;
  postalCode: string;
  photo: string;
  poste: string;
  phone: string[];
  creationDate: string;
  isActive: boolean;
  isDelete: boolean;
  groups: Group[] | any[];
  roles: Role[] | any[];
  cursus: string;
  position: string;
}

export const AdministrationFormFields: React.FC<AdministrationFieldsProps> = ({
  fieldsIsDisabled,
  data,
}) => {
  const [groupsOptions, setGroupsOptions] = useState<any[]>([]);
  const [rolesOptions, setRolesOptions] = useState<any[]>([]);
  const [isActiveStatut, setIsActiveStatut] = useState<boolean | undefined>(
    data?.user?.isActive as boolean
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
    resetField,
    getValues,
    formState: { errors, disabled },
  } = useFormContext<AdministrationForm>();

  const handleToggleChange = (isChecked: boolean) => {
    setIsActiveStatut(isChecked);
  };

  const genderOption: OptionsType[] = [
    { label: "M.", value: "MALE" },
    { label: "Mme", value: "FEMALE" },
  ];
  
  return (
    <div className={style.formContainer}>
      <div className={style.form}>
        <div className={style.formHeader}>Compte utilisateur</div>
        <div className={style.formBody}>
          <div className={`${style.colDiv2} ${style.gap4}`}>
            <div>
              <div className={`${style.colDiv2} ${style.my5}  ${style.gap1}`}>
                <InputText
                  label="Identifiant IC"
                  onChange={data?.user?.username}
                  fieldName={"username"}
                  register={register}
                  readOnly={true}
                  value={data?.user?.username}
                  required={"Champ requis"}
                  onError={errors.username}
                />
                <InputSwitch
                  label="Statut du compte"
                  register={register}
                  handleChange={handleToggleChange}
                  fieldName="isActive"
                  isChecked={isActiveStatut ?? false}
                  readOnly={fieldsIsDisabled}
                  required={false}
                  checkedValue={isActiveStatut ? "Actif" : "Inactif"}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Email"
                  onChange={data?.user?.email}
                  fieldName={"email"}
                  required={"Champ requis"}
                  validate={"email"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.user?.email}
                  onError={errors.email}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelectMultiple
                  isDisabled={fieldsIsDisabled}
                  label="Groupe"
                  defaultValue={data?.user?.groups.map((group: Group) => ({
                    label: group.name,
                    alias: group.alias,
                    value: group._id,
                  }))}
                  fieldName="groups"
                  options={groupsOptions}
                  required={true}
                  setValue={setValue}
                  onError={errors.groups}
                />
              </div>
            </div>
            <div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelectMultiple
                  isDisabled={fieldsIsDisabled}
                  label="Rôles"
                  defaultValue={data?.user?.roles.map((role: any) => ({
                    label: role.name,
                    alias: role.alias,
                    value: role._id,
                  }))}
                  fieldName="roles"
                  options={rolesOptions}
                  setValue={setValue}
                  required={true}
                  onError={errors.roles}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                    label="Poste"
                    onChange={data?.position}
                    fieldName={"poste"}
                    required={"Champ requis"}
                    register={register}
                    readOnly={fieldsIsDisabled}
                    value={data?.position}
                    onError={errors.poste}
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
                  onChange={data?.user?.gender}
                  fieldName="gender"
                  register={register}
                  readOnly={fieldsIsDisabled}
                  selectedValue={
                    data?.user?.gender === "MALE"
                      ? { label: "M.", value: "MALE" }
                      : { label: "Mme", value: "FEMALE" }
                  }
                  optionsValues={genderOption}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Nom"
                  onChange={data?.user?.lastname}
                  fieldName={"lastname"}
                  register={register}
                  required={"Champ requis"}
                  readOnly={fieldsIsDisabled}
                  value={data.user?.lastname}
                  onError={errors.lastname}
                />
              </div>

              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Prénom(s)"
                  fieldName={"firstname"}
                  readOnly={fieldsIsDisabled}
                  onChange={data?.user?.firstname}
                  required={"Champ requis"}
                  register={register}
                  value={data?.user?.firstname}
                  onError={errors.firstname}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputPhone
                  label="Téléphone"
                  fieldName={"phone"}
                  onChange={data?.user?.phone}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={getValues("phone") || data.user?.phone}
                  getPhone={(response: string[]) => {
                    setValue("phone", response);
                  }}
                />
              </div>
            </div>
            <div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputDate
                  label="Date de naissance"
                  onChange={data?.user?.birthDate}
                  fieldName={"birthDate"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.user?.birthDate}
                  onError={errors.birthDate}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Lieu de naissance"
                  onChange={data?.user?.birthPlace}
                  fieldName={"birthPlace"}
                  register={register}
                  required={"Champ requis"}
                  readOnly={fieldsIsDisabled}
                  value={data?.user?.birthPlace}
                  onError={errors.phone}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Adresse"
                  onChange={data?.user?.address}
                  fieldName={"address"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.user?.address.split("&&")[0]}
                  onError={errors.address}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Ville et code postal"
                  onChange={data?.user?.address}
                  fieldName={"city"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={`${data?.user?.address.split("&&")[2]} ${
                    data?.user?.address.split("&&")[1]
                  }`}
                  onError={errors.city}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdministrationFormFields;
