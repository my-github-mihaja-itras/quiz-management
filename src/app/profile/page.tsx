"use client";
import { EditUserById, GetUserById } from "@/services/user/user-service";
import React, { ComponentType, useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import Details from "@/components/shared/details/details.components";
import UseGuard from "@/components/routGuard/routGuard";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import Tabs from "@/components/shared/tabs/tabs.components";
import { HistoryType } from "@/components/shared/history/history.constant";
import { GetHistoryByTargetId } from "@/services/history/history.service";
import extractTokenInfo from "@/utils/extract.token";
import ProfileFormFields from "@/components/form/profile.form.fields";
import DetailsProfile from "@/components/shared/details-profile/details.profile.components";
import ProfileFormFieldsEditable from "@/components/shared/profile-form-field/profile-form.fields.components";
import PasswordFormFields from "@/components/shared/password-form-field/password-form.fields";
import { ActionType } from "@/cores/constant/constant.history";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import { Login } from "@/services/login/login.models";
import { loginService } from "@/services/login/login.service";
import {
  passwordResetRequest,
  resetPassword,
} from "@/services/password-reset/password-reset.service";
import {
  PasswordRequestResetDto,
  PasswordResetDto,
} from "@/services/password-reset/password-reset.models";
import { User } from "@/services/user/user.models";

export interface Payloads {}

const UserDetail = () => {
  const [userData, setUserData] = useState<User | any>(); // Initialisé à null plutôt qu'un objet vide
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formFieldsData, setFormFieldsData] = useState<any>();
  const token = getLocalStorageItem("loginAccessToken") || "";
  const tokenInfo: any = extractTokenInfo(token);

  const [dataNotFound, setDataNotFound] = useState<boolean>(false);

  //History state
  const [historyData, setHistoryData] = useState<HistoryType[]>([]);

  /// Modal
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(true);

  const [message, setMessage] = useState<ErrorMessage>();

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const getUserData = async () => {
    const response = await GetUserById(tokenInfo._id);

    if (response.status === 200) {
      setDataNotFound(false);
      setIsLoading(false);
      const userData = response.data.data;

      setUserData(userData);
      setFormFieldsData({
        username: userData.username,
        photo: userData.photo,
      });
    } else {
      setDataNotFound(true);
      setIsLoading(false);
    }
  };

  const getHistoryData = async () => {
    const response = await GetHistoryByTargetId(tokenInfo._id);

    if (response.statusText === "OK") {
      setHistoryData(response.data.data);
    }
  };

  useEffect(() => {
    getUserData();
    getHistoryData();
  }, []);

  const handleChangeEditableFields = () => {
    setFieldsIsEditable(!fieldsIsDisabled);
  };

  const PersonalSubmitService = async (data: User) => {
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
      city,
      postalCode,
      photo,
      phone,
      isActive,
    } = data;

    let isActiveUpdate;
    if (typeof isActive === "undefined") {
      isActiveUpdate = isActive;
    } else {
      isActiveUpdate = isActive;
    }

    const userData = {
      _id: tokenInfo._id,
      username,
      email,
      groups,
      roles,
      gender,
      lastname,
      firstname,
      birthDate,
      birthPlace,
      address: `${address}&&${postalCode}&&${city}`,
      photo,
      phone,
      isActive: isActiveUpdate,
    };
    const history = {
      action: { name: ActionType.UPDATE_USER },
      user: tokenInfo._id,
      targetId: tokenInfo._id,
      entity: "User",
    };

    const response = await EditUserById(tokenInfo._id, userData, history);
    if (response.status === 200) {
      setIsSuccess(true);
      setFieldsIsEditable(!fieldsIsDisabled);
      setMessage({
        title: "Modification effectué",
        message: "Les mises à jour ont été effectuées avec succès.",
      });
      setIsOpen(true);
    }
  };

  const PasswordSubmitService = async (data: any) => {
    const { actualPassword, password1, password2 } = data;
    const userLogin: Login = {
      login: userData.email,
      password: actualPassword,
    };
    const loginResponse = await loginService(userLogin);

    if (loginResponse.status === 200 && password1 === password2) {
      const passwordReqData: PasswordRequestResetDto = {
        email: userData.email,
      };
      const requestPasswordReset = await passwordResetRequest(passwordReqData);

      const token = requestPasswordReset.data.data;
      if (token !== null) {
        const passwordResData: PasswordResetDto = {
          token: token,
          password: password1,
        };

        const response = await resetPassword(passwordResData);

        if (response.status === 200) {
          setFieldsIsEditable(!fieldsIsDisabled);
          setIsSuccess(true);
          setMessage({
            title: "Modification effectué",
            message: "Les mises à jour ont été effectuées avec succès.",
          });
          setIsOpen(true);
        }
      }
    }
    if (loginResponse.status === 401 || password1 !== password2) {
      setIsSuccess(false);
      setMessage({
        title: "Mot de passe",
        message:
          "le mot de passe et la confirmation du mot de passe ne correspondent pas.",
      });
      setIsOpen(true);
    }
  };

  return (
    <DetailsProfile>
      {isOpen && (
        <ErrorModal
          close={closeModal}
          message={message}
          color={isSuccess ? "#0fc3ed" : "#dc3545"}
        ></ErrorModal>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Details>
            {!dataNotFound ? (
              <Tabs
                tabsConstant={[
                  {
                    label: "Infos persos",
                    content: (
                      <>
                        <span
                          style={{
                            color: "#585858",
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "normal",
                          }}
                        >
                          Photo de profil
                        </span>
                        <p
                          style={{
                            color: "#79797B",
                            fontFamily: "Roboto",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "30px",
                            paddingBottom: "15px",
                          }}
                        >
                          Veuillez choisir une photo au format PNG, JPG, JPEG
                          (Taille de fichier Max. 5 Mo)
                        </p>
                        {formFieldsData && (
                          <ProfileFormFieldsEditable
                            handleChangeEditableFields={
                              handleChangeEditableFields
                            }
                            fieldsIsDisabled={fieldsIsDisabled}
                            formData={formFieldsData}
                            submitService={PersonalSubmitService}
                            haveActionButton={true}
                            haveImageProfile={true}
                          >
                            {userData ? (
                              <ProfileFormFields
                                fieldsIsDisabled={fieldsIsDisabled}
                                data={userData}
                              />
                            ) : (
                              <Loader />
                            )}
                          </ProfileFormFieldsEditable>
                        )}
                      </>
                    ),
                  },
                  {
                    label: "Mot de passe",
                    content: (
                      <>
                        <ProfileFormFieldsEditable
                          handleChangeEditableFields={
                            handleChangeEditableFields
                          }
                          fieldsIsDisabled={fieldsIsDisabled}
                          formData={formFieldsData}
                          submitService={PasswordSubmitService}
                          haveActionButton={true}
                          haveImageProfile={false}
                        >
                          <PasswordFormFields
                            fieldsIsDisabled={fieldsIsDisabled}
                          />
                        </ProfileFormFieldsEditable>
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
        </>
      )}
    </DetailsProfile>
  );
};

export default UseGuard(UserDetail as ComponentType<any>);
