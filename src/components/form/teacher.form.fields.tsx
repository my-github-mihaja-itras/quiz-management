import { useFormContext } from "react-hook-form";
import style from "./personal.form.field.module.css";
import { useEffect, useState } from "react";
import { Role } from "@/services/role/role.models";
import { Group } from "@/services/group/group.models";
import { getAllRoles } from "@/services/role/role.service";
import { getAllGroups } from "@/services/group/group.service";
import { Teacher } from "@/services/teacher/teacher.models";
import { InputText, InputSwitch, InputNumber, InputPhone, InputDate } from "../shared/form/input-field/input-field";
import { OptionsType } from "../shared/form/input-field/input.interface";
import { InputSelectMultiple, InputSelect } from "../shared/form/input-field/input.select";

interface TeacherFieldsProps {
  fieldsIsDisabled: boolean;
  data: Teacher;
}
export interface TeacherForm {
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
  phone: string[];
  creationDate: string;
  isActive: boolean;
  isDelete: boolean;
  groups: Group[] | any[];
  roles: Role[] | any[];
  cursus: string;
  timeWork: number;
}

export const TeacherFormFields: React.FC<TeacherFieldsProps> = ({
  fieldsIsDisabled,
  data,
}) => {
  const [groupsOptions, setGroupsOptions] = useState<any[]>([]);
  const [rolesOptions, setRolesOptions] = useState<any[]>([]);
  const [isActive, setIsActive] = useState<boolean | undefined>(
    data?.user.isActive
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
  } = useFormContext<TeacherForm>();

  const handleToggleChange = (isChecked: boolean) => {
    setIsActive(!isChecked);
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
                  onChange={data?.user.username}
                  fieldName={"username"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.user.username}
                  required={"Champ requis"}
                  onError={errors.username}
                  isDisabled={true}
                />
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
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Email"
                  onChange={data?.user.email}
                  fieldName={"email"}
                  validate={"mail"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.user.email}
                  onError={errors.email}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelectMultiple
                    isDisabled={fieldsIsDisabled}
                    label="Groupe"
                    defaultValue={data?.user.groups.map((group: Group) => ({
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
                    label="Roles"
                    defaultValue={data?.user.roles.map((role: any) => ({
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
                  onChange={data?.user?.email}
                  fieldName={"poste"}
                  // required={"Champ requis"}
                  validate={"poste"}
                  register={register}
                  defaultValue="Enseignant"
                  readOnly={true}
                />
              </div>{" "}
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputNumber
                  label="Heure de travail"
                  onChange={data?.timeWork}
                  fieldName={"timeWork"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.timeWork}
                  onError={errors.timeWork}
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
                  onChange={data?.user.gender}
                  fieldName="gender"
                  register={register}
                  readOnly={fieldsIsDisabled}
                  selectedValue={
                    data?.user.gender === "MALE"
                      ? { label: "M.", value: "MALE" }
                      : { label: "Mme", value: "FEMALE" }
                  }
                  optionsValues={genderOption}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Nom"
                  onChange={data?.user.lastname}
                  fieldName={"lastname"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data.user.lastname}
                  onError={errors.lastname}
                />
              </div>

              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Prénom(s)"
                  fieldName={"firstname"}
                  readOnly={fieldsIsDisabled}
                  onChange={data?.user.firstname}
                  register={register}
                  value={data?.user.firstname}
                  onError={errors.firstname}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputPhone
                  label="Téléphone"
                  fieldName={"phone"}
                  onChange={data?.user.phone}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={getValues('phone') || data.user.phone}
                  getPhone={(response: string[])=>{
                    setValue('phone', response)
                    // console.log(response[0]);
                  }}
                />
              </div>
            </div>
            <div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputDate
                  label="Date de naissance"
                  onChange={data?.user.birthDate}
                  fieldName={"birthDate"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.user.birthDate}
                  onError={errors.birthDate}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Lieu de naissance"
                  onChange={data?.user.birthPlace}
                  fieldName={"birthPlace"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.user.birthPlace}
                  onError={errors.phone}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Adresse"
                  onChange={data?.user.address}
                  fieldName={"address"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.user.address.split("&&")[0]}
                  onError={errors.address}
                />
              </div>
              <div className={`${style.colDiv2} ${style.my5} ${style.gap1}`}>
              <InputText
                  label="Ville"
                  onChange={getValues('city')}
                  fieldName={"city"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.user.address.split("&&")[2]}
                  onError={errors.city}                />
                <InputText
                  label="Code postal"
                  onChange={getValues('postalCode')}
                  fieldName={"postalCode"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={data?.user.address.split("&&")[1]}
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

export default TeacherFormFields;
