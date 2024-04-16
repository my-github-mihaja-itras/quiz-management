"use client";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import { useState } from "react";
import Loader from "@/components/loader/loader";
import { useRouter } from "next/navigation";
import { RoleTypeToInsert } from "@/services/role/role.models";
import EditSection from "@/components/shared/edit-section/edit.section.component";
import EditFormRole from "@/components/form/edit.form.role.component";
import { ActionType } from "@/cores/constant/constant.history";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import { updateRoleById } from "@/services/role/role.service";
import { HttpStatusCode } from "axios";

const RolesAdd: React.FC<any> = ({
  params,
}: {
  params: { roleId: string };
}) => {
  const [isSuccess, setIsSuccess] = useState<Boolean>(false);

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [message, setMessage] = useState<ErrorMessage>();

  const token = getLocalStorageItem("loginAccessToken") || "";

  const tokenInfo: any = extractTokenInfo(token);

  const [fieldsIsDisabled, setFieldsIsDisabled] = useState<boolean>();

  const router = useRouter();

  const updateRoleSubmitService = async (data: any) => {
    const groupArray = initGroupToArray(data);
    const privilegeArray = initPrivilegeToArray(data);
    const history = {
      action: { name: ActionType.UPDATE_ROLE, proof: data.roleName },
      user: tokenInfo._id,
      targetId: data._id,
      entity: "Role",
    };

    if (groupArray.length > 0 && privilegeArray.length > 0) {
      const formaTroleToAdd: RoleTypeToInsert = {
        name: data.roleName,
        alias: data.roleAlias,
        description: data.roleDescription,
        color: data.roleColor,
        groups: groupArray,
        privileges: privilegeArray,
      };

      setIsLoading(true);
      const result = await updateRoleById(data._id, formaTroleToAdd, history);
      if (result.status === HttpStatusCode.Ok) {
        setIsSuccess(true);
        setIsLoading(false);
        setMessage({
          title: "Modification effectué",
          message: " Vos modifications ont bien été enregistrées !",
        });
        setIsOpen(true);
      } else {
        setIsSuccess(false);
        setIsLoading(false);
        setMessage({
          title: "Erreur de la Modification",
          message: " Verifier Vos modifications dans chaque champs !",
        });
        setIsOpen(true);
      }
    } else {
      setIsSuccess(false);
      setIsLoading(false);
      setMessage({
        title: "Erreur de la Modification",
        message: " Verifier Vos modifications dans chaque champs !",
      });
      setIsOpen(true);
    }
  };

  const initGroupToArray = (data: any) => {
    if (Array.isArray(data.groups)) {
      const filteredGroups: any[] = data.groups.filter(
        (element: any) => element !== false
      );
      return filteredGroups;
    }
    return [];
  };

  const initPrivilegeToArray = (data: any) => {
    if (Array.isArray(data.privileges)) {
      const filteredPrivileges: any[] = data.privileges.filter(
        (element: any) => element !== false
      );
      return filteredPrivileges;
    }
    return [];
  };

  const closeModal = () => {
    const link = isSuccess ? `/roles` : `${params.roleId}`;
    router.push(link);
    setIsOpen(false);
  };
  const getOnChangeDisable = (onChangeDisable: boolean) => {
    setFieldsIsDisabled(onChangeDisable);
  };
  return (
    <div className="">
      {isLoading && <Loader></Loader>}
      {isOpen && (
        <ErrorModal
          close={closeModal}
          message={message}
          lighwt={true}
          color={isSuccess ? "#0fc3ed" : "#dc3545"}
        ></ErrorModal>
      )}
      <EditSection
        title={"Rôle"}
        redirectLink={"/add"}
        isLoading={false}
        isFullWidthContent={true}
        onChangeDisable={getOnChangeDisable}
        submitService={updateRoleSubmitService}
      >
        <EditFormRole
          roleId={params.roleId}
          fieldsIsDisabled={fieldsIsDisabled as boolean}
        />
      </EditSection>
    </div>
  );
};
export default RolesAdd;
