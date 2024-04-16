"use client";
import AddSection from "@/components/shared/add-section/add.section.component";
import AddFormRole from "@/components/form/add.form.role.component";
import { addRoleService } from "@/services/role/role.service";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import { useState } from "react";
import Loader from "@/components/loader/loader";
import { useRouter } from "next/navigation";
import { RoleTypeToInsert } from "@/services/role/role.models";

const RolesAdd: React.FC<any> = () => {
  const [isSuccess, setIsSuccess] = useState<Boolean>(false);

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [message, setMessage] = useState<ErrorMessage>();

  const router = useRouter();

  const addRoleSubmitService = async (data: any) => {
    const groupArray = initGroupToArray(data);
    const privilegeArray = initPrivilegeToArray(data);

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
      const result = await addRoleService(formaTroleToAdd);
      if (result.status === 201) {
        setIsSuccess(true);
        setIsLoading(false);
        setMessage({
          title: "Ajout effectué",
          message: " Vos modifications ont bien été enregistrées !",
        });
        setIsOpen(true);
      } else {
        setIsSuccess(false);
        setIsLoading(false);
        setMessage({
          title: "Erreur de l'ajout ",
          message: " Verifier Vos modifications dans chaque champs !",
        });
        setIsOpen(true);
      }
    } else {
      setIsSuccess(false);
      setIsLoading(false);
      setMessage({
        title: "Erreur de l'ajout ",
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
    const link = isSuccess ? "/roles" : "/roles/add";
    router.push(link);
    setIsOpen(false);
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
      <AddSection
        title={"Rôles"}
        redirectLink={"/add"}
        isLoading={false}
        isFullWidthContent={true}
        submitService={addRoleSubmitService}
      >
        <AddFormRole/> 
      </AddSection>
    </div>
  );
};
export default RolesAdd;
