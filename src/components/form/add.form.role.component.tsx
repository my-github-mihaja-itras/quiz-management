import { useEffect, useState } from "react";
import style from "./add.form.role.module.css";
import { useFormContext } from "react-hook-form";
import { getAllGroups } from "@/services/group/group.service";
import { Group } from "@/services/group/group.models";
import { InputColor, InputText } from "../shared/form/input-field/input-field";
import { PrivilegeType } from "@/services/privilege/privilege.models";
import { getAllPrivileges } from "@/services/privilege/privilege.service";
import { UnderlinedTitle } from "../shared/text/text-underline";
import {
  PRIVILEGE_LABEL,
  PRIVILEGE_TITLE,
} from "@/cores/constant/constant.privilege.label";
import { PrivilegeName } from "@/cores/privileges/privileges.interfaces";
import { InputCheckbox } from "../shared/form/input-field/input.select";

export interface tabPrivilege {
  label: string;
  privilege: PrivilegeType[];
  isChecked?: boolean;
}

export interface keysWordsType {
  _id: string;
  name: string;
}

export default function AddFormRole() {
  const privilegeLabel = PRIVILEGE_LABEL;

  const [isLoading, setisLoading] = useState<boolean>(true);

  const [groups, setGroups] = useState<Group[]>([]);

  const [keysWordsGroups, setKeysWordsGroups] = useState<string[]>([]);

  const [keysWordsAll, setKeysWordsAll] = useState<string[]>([]);

  const [keysWordsPrivileges, setKeysWordsPrivileges] = useState<string[]>([]);

  const [privileges, setPrivileges] = useState<PrivilegeType[]>([]);

  let countPrivileges: number = 0;

  const [tabPrivilegesToDisplay, setTabPrivilegesToDisplay] = useState<
    tabPrivilege[]
  >([]);

  const {
    register,
    watch,
    unregister,
    getValues,
    formState: { errors, disabled },
  } = useFormContext<any>();

  const roleName = watch("roleName");

  const roleDescription = watch("roleDescription");

  const roleAlias = watch("roleAlias");

  const roleColor = watch("roleColor", "#5C5C5C");

  const loadGroupAndPrivileges = async () => {
    const groupsRes = await getAllGroups();
    const privilegesRes = await getAllPrivileges();
    const groups = groupsRes.data;
    setGroups(groups);
    const privileges = privilegesRes.data;
    setPrivileges(privileges);
    setisLoading(false);
  };

  const initPrivilegeToTab = () => {
    const result: tabPrivilege[] = [];
    privileges.forEach((tab) => {
      const [, label] = tab.name.split("_");
      const existingTab = result.find((item) => item.label === label);
      if (existingTab) {
        existingTab.privilege.push(tab);
      } else {
        result.push({ label, privilege: [tab] });
      }
    });
    setTabPrivilegesToDisplay(result);
    return result;
  };

  const initPrivilegeWithLabel = (
    tabPrivileges: tabPrivilege[]
  ): tabPrivilege[] => {
    const filteredPrivileges: tabPrivilege[] = [];
    for (const privilege of tabPrivileges) {
      const matchingGroups = privilege.privilege.filter((group) =>
        group.group.some((g) => keysWordsGroups.includes(g._id || ""))
      );
      if (matchingGroups.length > 0) {
        filteredPrivileges.push({
          label: privilege.label,
          privilege: matchingGroups,
          isChecked: false,
        });
      }
    }
    return filteredPrivileges;
  };

  const handleCheckForGroups = (e: any) => {
    const id_selected_group = e.target.value;
    if (keysWordsGroups.includes(id_selected_group)) {
      setKeysWordsGroups(
        keysWordsGroups.filter((key) => key !== id_selected_group)
      );
    } else {
      setKeysWordsGroups([...keysWordsGroups, id_selected_group]);
    }
    setKeysWordsAll([]);
    setKeysWordsPrivileges([]);
  };

  const handleCheckPrivileges = (res: any) => {
    const id_selected = res;
    const isInclude = keysWordsPrivileges.includes(id_selected);
    if (isInclude) {
      setKeysWordsPrivileges(
        keysWordsPrivileges.filter((key) => key !== id_selected)
      );
    } else if (isInclude === false) {
      setKeysWordsPrivileges([...keysWordsPrivileges, id_selected]);
    }
    PrivilegeUpdateCheckAll(id_selected, isInclude);
  };

  const PrivilegeUpdateCheckAll = (id_selected: string, isInclude: boolean) => {
    const tabPrivilege_result = tabPrivilegesToDisplay.filter((tabPrivilege) =>
      tabPrivilege.privilege.some((Object) => Object._id === id_selected)
    );

    const privilege_in_tab: string[] = [];
    tabPrivilege_result[0]?.privilege.map((privilege) => {
      if (privilege?._id) privilege_in_tab.push(privilege._id);
    });

    const privilegeBeforeChecked: string[] = privilege_in_tab.filter(
      (element) => keysWordsPrivileges.includes(element)
    );
    const privilegeAfterChecked: string[] = !isInclude
      ? [...privilegeBeforeChecked, id_selected]
      : privilegeBeforeChecked.filter((element) => element !== id_selected);

    const label_id_selected = tabPrivilege_result[0].label;
    const key_all_without_idSelected = keysWordsAll.filter(
      (element) => element !== label_id_selected
    );

    const isAllCheck = privilegeAfterChecked.length === privilege_in_tab.length;
    if (isAllCheck) {
      setKeysWordsAll([...key_all_without_idSelected, label_id_selected]);
    } else if (isAllCheck === false) {
      setKeysWordsAll(key_all_without_idSelected);
    }
  };

  const handleCheckAll = (e: any) => {
    const label_selected = e.target.value;
    const isInclude = keysWordsAll.includes(label_selected);
    if (isInclude) {
      setKeysWordsAll(keysWordsAll.filter((key) => key !== label_selected));
    } else {
      setKeysWordsAll([...keysWordsAll, label_selected]);
    }
    checkAllUpdatePrivilege(label_selected, isInclude);
  };

  const checkAllUpdatePrivilege = (
    label_selected: string,
    isInclude: boolean
  ) => {
    const tabPrivilege_result = tabPrivilegesToDisplay.filter(
      (tabPrivilege) => tabPrivilege.label === label_selected
    );

    const newPrivilegeIds: string[] = [];
    tabPrivilege_result[0]?.privilege.map((privilege) => {
      if (privilege?._id) newPrivilegeIds.push(privilege._id);
    });

    if (isInclude) {
      setKeysWordsPrivileges(
        keysWordsPrivileges.filter((key) => !newPrivilegeIds.includes(key))
      );
    } else if (!isInclude) {
      setKeysWordsPrivileges([
        ...keysWordsPrivileges,
        ...newPrivilegeIds.filter(
          (element) => !keysWordsPrivileges.includes(element)
        ),
      ]);
    }
  };

  const filterPrivilegesToDisplay = () => {
    const privilegeToTab: tabPrivilege[] = initPrivilegeToTab();
    const privilegeWithLabel: any[] = initPrivilegeWithLabel(privilegeToTab);
    setTabPrivilegesToDisplay(privilegeWithLabel);
  };

  const translatePrivilegeTitle = (key: string): string | undefined => {
    return PRIVILEGE_TITLE[key];
  };

  useEffect(() => {
    loadGroupAndPrivileges();
  }, []);

  useEffect(() => {
    filterPrivilegesToDisplay();
  }, [keysWordsGroups, keysWordsPrivileges]);

  return (
    <>
      <div className={style.layout}>
        <span className={style.childTitle}>Ajout rôle </span>
        <div className={style.containerPage}>
          <div className={style.layoutInput}>
            <div className={style.inputContainer1}>
              <div className={style.inputMedium}>
                <InputText
                  label="Nom rôle"
                  onChange={roleName}
                  fieldName={"roleName"}
                  register={register}
                  value={roleName}
                  required={"Champ requis"}
                  onError={errors.roleName}
                />
              </div>
              <div className={style.inputMedium}>
                <InputText
                  label="Description"
                  onChange={roleDescription}
                  fieldName={"roleDescription"}
                  register={register}
                  value={roleDescription}
                  required={"Champ requis"}
                  onError={errors.roleDescription}
                />
              </div>
            </div>
            <div className={style.inputContainer2}>
              <div className={style.inputMedium}>
                <InputText
                  label="Alias rôle"
                  onChange={roleAlias}
                  fieldName={"roleAlias"}
                  register={register}
                  value={roleAlias}
                  required={"Champ requis"}
                  onError={errors.roleAlias}
                />
              </div>
              <div className={style.inputMedium}>
                <InputColor
                  label="Couleur de bordure et texte"
                  onChange={roleColor}
                  fieldName={"roleColor"}
                  register={register}
                  value={roleColor}
                  required={true}
                  onError={errors.roleColor}
                />
              </div>
            </div>
          </div>

          <div className={style.layoutGroup}>
            <UnderlinedTitle colors={"#0231A8"} underlineColor={"#0FC3ED"}>
              Groupes
            </UnderlinedTitle>
            <div className={style.containeChexBoxGroup}>
              {groups.map((group, indexGroup) => (
                <div
                  className={style.filterItem}
                  key={`filter-checkbox-${indexGroup}`}
                >
                  <input
                    type="checkbox"
                    value={group._id}
                    {...register(`groups.${indexGroup}`)}
                    onChange={handleCheckForGroups}
                  />
                  <span className={style.texCheckBox}>{group.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={style.layoutContainerTabPrivilege}>
            <div className={style.containerTabPrivilege}>
              {tabPrivilegesToDisplay.map((tabPrivilege, index) => (
                <div className={style.tabPrivilege} key={index}>
                  <UnderlinedTitle
                    colors={"#0231A8"}
                    underlineColor={"#0FC3ED"}
                  >
                    {translatePrivilegeTitle(tabPrivilege.label)}
                  </UnderlinedTitle>
                  <div className={style.checkAllContainer}>
                    <input
                      type="checkbox"
                      checked={keysWordsAll.includes(tabPrivilege.label)}
                      value={tabPrivilege.label}
                      onChange={handleCheckAll}
                    />
                    <span className={style.texCheckBox}>Tout sélectionner</span>
                  </div>

                  <div className={style.containeChexBoxPrivileges}>
                    {tabPrivilege.privilege.map((privilege, indexItem) => {
                      const currentCountPrivileges = countPrivileges++;
                      return (
                        <div
                          className={style.filterItem}
                          key={`filter-checkbox-${indexItem}`}
                        >
                          <InputCheckbox
                            name={privilege.name}
                            onChangeCheck={handleCheckPrivileges}
                            allIselected={keysWordsAll.includes(
                              tabPrivilege.label
                            )}
                            isKeysWordsPrivileges={
                              privilege?._id
                                ? keysWordsPrivileges.includes(privilege._id)
                                : false
                            }
                            fieldName={`privileges[${currentCountPrivileges}]`}
                            register={register}
                            unregister={unregister}
                            value={privilege._id}
                          />

                          <span className={style.texCheckBox}>
                            {
                              privilegeLabel[
                                privilege.name as keyof typeof PrivilegeName
                              ]
                            }
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
