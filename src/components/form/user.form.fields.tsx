import { useFormContext } from "react-hook-form";
import style from "./personal.form.field.module.css";
import { useEffect, useState } from "react";
import { Role } from "@/services/role/role.models";
import { Group } from "@/services/group/group.models";
import { getAllRoles } from "@/services/role/role.service";
import { getAllGroups } from "@/services/group/group.service";
import {
  InputText,
  InputSwitch,
  InputPhone,
  InputDate,
} from "../shared/form/input-field/input-field";
import { OptionsType } from "../shared/form/input-field/input.interface";
import {
  InputSelect,
  InputSelectMultiple,
} from "../shared/form/input-field/input.select";

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

export const UserFormFields: React.FC<UserFieldsProps> = ({
  fieldsIsDisabled,
  data,
}) => {
  const [groupsOptions, setGroupsOptions] = useState<any[]>([]);
  const [rolesOptions, setRolesOptions] = useState<any[]>([]);
  const [isActive, setIsActive] = useState<boolean | undefined>(data?.isActive);
  //

  const {
    register,
    watch,
    setValue,
    unregister,
    getValues,
    clearErrors,
    setError,
    getFieldState,
    formState: { errors, disabled },
  } = useFormContext<UserForm>();

  const loadGroup = async () => {
    const groupsRes = await getAllGroups();
    const groups = groupsRes?.data;

    setGroupsOptions(
      groups?.map((Group: Group) => {
        return {
          label: Group.name,
          alias: Group.alias,
          value: Group._id,
        };
      })
    );
  };

  const loadRoleByGroupId = async (selectedGroups: string[]) => {
    if (selectedGroups.length === 0) {
      setRolesOptions([]);
    }

    const rolesRes = await getAllRoles();
    const allRoles = rolesRes?.data;

    const filteredRoles = allRoles.filter((role: Role) => {
      // console.log(selectedGroups);
      return role.groups.some((group: any) => selectedGroups.includes(group));
    });

    setRolesOptions(
      filteredRoles.map((Role: Role) => {
        return {
          label: Role.name,
          alias: Role.alias,
          value: Role._id,
        };
      })
    );
  };
  const groups = watch("groups", [data.groups.map((e) => e._id)]);

  useEffect(() => {
    loadGroup();
    loadRoleByGroupId(groups as string[]);
  }, [groups]);

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
                  onChange={data?.username}
                  fieldName={"username"}
                  register={register}
                  readOnly={true}
                  value={data?.username}
                  required={"Champ requis"}
                  onError={errors.username}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Email"
                  onChange={data?.email}
                  fieldName={"email"}
                  validate={"mail"}
                  required={"Champ requis"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.email}
                  onError={errors.email}
                />
              </div>

              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSwitch
                  label="Statut du compte"
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
              {" "}
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelectMultiple
                  isDisabled={fieldsIsDisabled}
                  label="Groupe"
                  defaultValue={data?.groups.map((group: Group) => ({
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
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelectMultiple
                  isDisabled={fieldsIsDisabled}
                  label="Rôles"
                  defaultValue={data?.roles.map((role: Role) => ({
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
              {/* <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelect
                  label="Parcours / Poste"
                  onChange={"poste"}
                  fieldName="poste"
                  register={register}
                  readOnly={fieldsIsDisabled}
                  selectedValue={{
                    label: "Professeur",
                    value: "Professeur",
                  }}
                  optionsValues={posteOption}
                />
              </div> */}
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
                  onChange={data?.gender}
                  fieldName="gender"
                  register={register}
                  readOnly={fieldsIsDisabled}
                  selectedValue={
                    data?.gender === "MALE"
                      ? { label: "M.", value: "MALE" }
                      : { label: "Mme", value: "FEMALE" }
                  }
                  optionsValues={genderOption}
                />
              </div>
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
            <div>
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
              <div className={`${style.colDiv2} ${style.my5} ${style.gap1}`}>
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
        </div>
      </div>
    </div>
  );
};

export default UserFormFields;


export const genderOption: OptionsType[] = [
  { label: "M.", value: "MALE" },
  { label: "Mme", value: "FEMALE" },
];
