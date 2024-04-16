import { useFormContext } from "react-hook-form";
import style from "./personal.form.field.module.css";
import { useEffect, useState } from "react";
import { Role } from "@/services/role/role.models";
import { Group } from "@/services/group/group.models";
import { getAllRoles } from "@/services/role/role.service";
import { getAllGroups } from "@/services/group/group.service";
import { Student } from "@/services/student/student.models";
import { InputText, InputSwitch, InputPhone, InputDate } from "../shared/form/input-field/input-field";
import { OptionsType } from "../shared/form/input-field/input.interface";
import { InputSelectMultiple, InputSelect } from "../shared/form/input-field/input.select";

interface StudentFieldsProps {
  fieldsIsDisabled: boolean;
  data: Student;
}
export interface StudentForm {
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
  registrationNumber: string;
  educationalClasses: {
    _id: string;
    name: string;
    cursus: {
      _id: string;
      name: string;
    };
  };
  schoolYear: string;
}

export const StudentFormFields: React.FC<StudentFieldsProps> = ({
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
  } = useFormContext<StudentForm>();

  const handleToggleChange = (isChecked: boolean) => {
    setIsActive(isChecked);
  };

  const posteOption: OptionsType[] = [
    {
      label: "Chef du département",
      value: "Chef du département",
    },
    {
      label: "Technicien",
      value: "Technicien",
    },
    {
      label: "Secrétaire",
      value: "Secrétaire",
    },
    {
      label: "Professeur",
      value: "Professeur",
    },
    {
      label: "Stagiaire",
      value: "Stagiaire",
    },
  ];

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
                  readOnly={true}
                  value={data?.user.username}
                  required={"Champ requis"}
                  onError={errors.username}
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
                  required={"Champ requis"}
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
                <InputText
                  label="Matricule"
                  onChange={data?.registrationNumber}
                  fieldName={"registrationNumber"}
                  register={register}
                  // readOnly={fieldsIsDisabled}
                  readOnly={true}
                  value={data?.registrationNumber}
                  onError={errors.registrationNumber}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelectMultiple
                  isDisabled={fieldsIsDisabled}
                  label="Roles"
                  defaultValue={data?.user.roles.map((role) => ({
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
                    label="Classe"
                    onChange={data?.educationalClasses.name}
                    fieldName={"educationalClasses"}
                    register={register}
                    // readOnly={fieldsIsDisabled}
                    readOnly={true}
                    value={data?.educationalClasses.name}
                    onError={errors?.educationalClasses}
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
                  value={getValues("phone") ?? data?.user.phone}
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

export default StudentFormFields;
