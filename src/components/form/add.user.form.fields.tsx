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
  InputPassword,
} from "../shared/form/input-field/input-field";
import { OptionsType } from "../shared/form/input-field/input.interface";
import {
  InputSelectMultiple,
  InputSelect,
} from "../shared/form/input-field/input.select";
import { posteOption } from "@/services/user/user.models";
import { getCount } from "@/services/count/count.service";

export interface Props{
  defaultUsername:string,
  posteCategory:OptionsType,
  defaultGroupOption:Group[]
}
export const AddUserFormFields = ({posteCategory,defaultGroupOption,defaultUsername}:Props) => {
  const [groupsOptions, setGroupsOptions] = useState<Group[]>([]);
  const [rolesOptions, setRolesOptions] = useState<any[]>([]);


  const {
    register,
    watch,
    setValue,
    getValues,
    reset,
    setError,
    clearErrors,
    resetField,
    formState: { errors, disabled },
  } = useFormContext<any>();

  const [isActive, setIsActive] = useState<boolean | undefined>(false);

  const username = watch("username");

  const email = watch("email");

  const groups = watch("groups", []);

  const roles = watch("roles", []);

  // const isActive = watch("isActive");

  const password1 = watch("password1");

  const password2 = watch("password2");

  const gender = watch("gender");

  const lastname = watch("lastname");

  const firstname = watch("firstname");

  const birthDate = watch("birthDate");

  const birthPlace = watch("birthPlace");

  const poste = watch("poste",'');

  const phone = watch("phone", []);

  const addressLine = watch("addressLine");

  const city = watch("city");

  const postalCode = watch("postalCode");

  register("address", { required: true });
  {
    addressLine &&
      city &&
      postalCode &&
      setValue("address", addressLine + "&&" + postalCode + "&&" + city);
  }

  const loadGroup = async () => {
    const groupsRes = await getAllGroups();
    const groups = groupsRes?.data;

    setGroupsOptions(
      groups?.filter((groups: { name: string;alias:string; })=>(groups.alias!=="ETU")).map((Group: Group) => {
        return {
          label: Group.name,
          alias: Group.alias,
          value: Group._id,
        };
      })
    );

  }


  const loadRoleByGroupId = async (selectedGroups: string[]) => {
    if (selectedGroups.length === 0) {
      setRolesOptions([]);
    }

    const rolesRes = await getAllRoles();
    const allRoles = rolesRes?.data;

    const filteredRoles = allRoles.filter((role: Role) => {
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

  const handleToggleChange = (isChecked: boolean) => {
    setIsActive(isChecked);
  };

  const genderOption: OptionsType[] = [
    { label: "M.", value: "MALE" },
    { label: "Mme", value: "FEMALE" },
  ];

  const resetForm = () => {
    setValue("username", defaultUsername);
    setValue("email", ""); 
    setValue("groups", defaultGroupOption.map(group => group._id)); 
    setValue("roles", []); 
    setValue("password1", ""); 
    setValue("password2", ""); 
    setValue("gender", ""); 
    setValue("lastname", ""); 
    setValue("firstname", ""); 
    setValue("birthDate", ""); 
    setValue("birthPlace", "");
    setValue("poste", ""); 
    setValue("phone", ""); 
    setValue("addressLine", "");
    setValue("city", ""); 
    setValue("postalCode", "");
  };

  useEffect(() => {
    loadGroup();
    loadRoleByGroupId(groups);
  }, [poste, groups]);

  useEffect(() => {
    resetForm()
  }, [defaultUsername]);

  return (
    <div className={style.formContainer} style={{paddingRight:"16px"}}>
      <div className={style.form}>
        <div className={style.formHeader}>Compte utilisateur</div>
        <div className={style.formBody}>
          <div className={`${style.colDiv2} ${style.gap4}`}>
            <div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Identifiant IC"
                  onChange={username}
                  fieldName={"username"}
                  register={register}
                  value={defaultUsername}
                  required={"Champ requis"}
                  onError={errors.username}
                  readOnly={true}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                    label="Poste"
                    onChange={posteCategory === posteOption[3] ? posteOption[3].label : poste}
                    fieldName={"poste"}
                    register={register}
                    value={poste}
                    defaultValue={posteCategory === posteOption[3] ? posteOption[3].label: poste}
                    required={posteCategory === posteOption[3] ? "":"Champ requis"}
                    onError={errors.poste}
                    readOnly={posteCategory === posteOption[3] ? true : false}
                  />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Email"
                  onChange={email}
                  fieldName={"email"}
                  register={register}
                  required={"Champ requis"}
                  validate={"mail"}
                  value={email}
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
                  required={false}
                  checkedValue={isActive ? "Actif" : "Inactif"}
                />
              </div>
            </div>
            <div className={style.inputGroupTwo}>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelectMultiple
                isDisabled={false}
                label="Groupe"
                defaultValue={defaultGroupOption.map((group: Group) => ({
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
              <div
                className={`${style.colDiv1} ${style.my5} ${style.marginTop}`}
              >
                <InputSelectMultiple
                  isDisabled={false}
                  label="Rôles"
                  defaultValue={roles.map((role: Role) => ({
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
                <InputPassword
                  label="Mot de passe"
                  onChange={password1}
                  fieldName={"password1"}
                  register={register}
                  onError={errors.password1}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputPassword
                  label="Confirmation du mot de passe"
                  onChange={password2}
                  fieldName={"password2"}
                  register={register}
                  onError={errors.password2}
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
                  onChange={gender}
                  fieldName="gender"
                  register={register}
                  selectedValue={
                    gender === "MALE"
                      ? { label: "M.", value: "MALE" }
                      : gender === "FEMALE"
                      ? { label: "Mme", value: "FEMALE" }
                      : { label: "", value: "" }
                  }
                  optionsValues={genderOption}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Nom"
                  onChange={lastname}
                  fieldName={"lastname"}
                  register={register}
                  required={"Champ requis"}
                  value={lastname}
                  onError={errors.lastname}
                />
              </div>

              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Prénom(s)"
                  fieldName={"firstname"}
                  onChange={firstname}
                  register={register}
                  required={"Champ requis"}
                  value={firstname}
                  onError={errors.firstname}
                />
              </div>
              <div
                className={`${style.colDiv1} ${style.my5} ${style.marginTop}`}
              >
                <InputPhone
                  label="Téléphone"
                  fieldName={"phone"}
                  onChange={phone}
                  required={true}
                  register={register}
                  value={getValues("phone") || phone}
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
                  onChange={birthDate}
                  fieldName={"birthDate"}
                  register={register}
                  value={birthDate}
                  isBirthdate={true}
                  onError={errors.birthDate}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Lieu de naissance"
                  onChange={birthPlace}
                  fieldName={"birthPlace"}
                  register={register}
                  required={"Champ requis"}
                  value={birthPlace}
                  onError={errors.birthPlace}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Adresse"
                  onChange={addressLine}
                  fieldName={"addressLine"}
                  register={register}
                />
              </div>
              <div className={`${style.colDiv2} ${style.my5} ${style.gap1}`}>
                <InputText
                  label="Ville"
                  onChange={city}
                  fieldName={"city"}
                  register={register}
                  onError={errors.city}
                />
                <InputText
                  label="Code postal"
                  onChange={postalCode}
                  fieldName={"postalCode"}
                  register={register}
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

export default AddUserFormFields;
