"use client";
import React, { ComponentType, useEffect, useState } from "react";

import Loader from "@/components/loader/loader";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import FormFieldsEditable from "@/components/shared/form-fields/form.fields.components";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import Tabs from "@/components/shared/tabs/tabs.components";
import {
  EditAdministrationById,
  GetAdministrationById,
} from "@/services/administration/administration.service";
import AdministrationFormFields from "@/components/form/administration.form.fields";
import { User } from "@/services/user/user.models";
import { ActionType } from "@/cores/constant/constant.history";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";

export interface Payloads {}

const UserDetail = ({ params }: { params: { adminId: string } }) => {
  const [adminData, setAdminData] = useState<User | any>(); // Initialisé à null plutôt qu'un objet vide
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formFieldsData, setFormFieldsData] = useState<any>();
  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(true);

  const [dataNotFound, setDataNotFound] = useState<boolean>(false);

  /// Modal
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();
  const token = getLocalStorageItem("loginAccessToken") || "";

  const tokenInfo: any = extractTokenInfo(token);

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const getUserData = async () => {
    const response = await GetAdministrationById(params.adminId);
    if (response.status === 200) {
      setDataNotFound(false);
      setIsLoading(false);
      const userData = response.data.data;

      setAdminData(userData);
      setFormFieldsData({
        username: userData?.user.username,
        photo: userData?.user.photo,
      });
    } else {
      setDataNotFound(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleChangeEditableFields = () => {
    setFieldsIsEditable(!fieldsIsDisabled);
  };

  const PersonalSubmitService = async (data: any) => {
    const {
      username,
      email,
      groups,
      roles,
      gender,
      lastname,
      firstname,
      birthDate,
      birthPlace,
      address,
      photo,
      isActive,
      poste,
      city,
      phone,
    } = data;

    let isActiveUpdate;
    if (typeof isActive === "undefined") {
      isActiveUpdate = isActive;
    } else {
      isActiveUpdate = isActive;
    }

    const userData = {
      _id: adminData?.user._id,
      username,
      email,
      groups,
      roles,
      gender,
      lastname,
      firstname,
      birthDate,
      birthPlace,
      address: `${address}&&${city.split(" ")[0]}&&${city.split(" ")[1]}`,
      phone,
      photo,
      isActive: isActiveUpdate,
    };

    const updatedData = {
      _id:params.adminId,
      user: userData,
      position:poste,
    };

    const history = {
      action: { name: ActionType.UPDATE_ADMIN },
      user: tokenInfo._id,
      targetId: adminData.user._id,
      entity: "Administration",
    };

    const response = await EditAdministrationById(params.adminId, updatedData,history);

    if (response.status === 200) {
      setFieldsIsEditable(!fieldsIsDisabled);
      setIsSuccess(true);
      setMessage({
        title: "Modification effectué",
        message: "Les mises à jour ont été effectuées avec succès.",
      });
      setIsOpen(true);
    }
  };
  return (
    <>
      <DetailsSection>
        {isOpen && (
          <ErrorModal
            close={closeModal}
            message={message}
            color={"#0FC3ED"}
          ></ErrorModal>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <Details>
            {!dataNotFound ? (
              <Tabs
                tabsConstant={[
                  {
                    label: "Infos persos",
                    content: (
                      <>
                        {formFieldsData && (
                          <FormFieldsEditable
                            handleChangeEditableFields={
                              handleChangeEditableFields
                            }
                            fieldsIsDisabled={fieldsIsDisabled}
                            formData={formFieldsData}
                            submitService={PersonalSubmitService}
                            haveImageProfile={true}
                            haveActionButton={true}
                          >
                            {adminData ? (
                              <AdministrationFormFields
                                fieldsIsDisabled={fieldsIsDisabled}
                                data={adminData}
                              />
                            ) : (
                              <Loader />
                            )}
                          </FormFieldsEditable>
                        )}
                      </>
                    ),
                  },
                ]}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                Le compte d'utilisateur n'est pas trouvé
              </div>
            )}
          </Details>
        )}
      </DetailsSection>
    </>
  );
};

export default UserDetail;
