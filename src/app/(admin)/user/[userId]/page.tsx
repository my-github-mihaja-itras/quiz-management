"use client";
import { EditUserById, GetUserById } from "@/services/user/user-service";
import React, { ComponentType, useEffect, useState } from "react";

import Loader from "@/components/loader/loader";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import UseGuard from "@/components/routGuard/routGuard";
import FormFieldsEditable from "@/components/shared/form-fields/form.fields.components";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import Tabs from "@/components/shared/tabs/tabs.components";
import UserFormFields from "@/components/form/user.form.fields";
import Processing from "@/components/shared/processing/processing.component";
import { HistoryType } from "@/components/shared/history/history.constant";
import History, {
  HistoryUser,
} from "@/components/shared/history/history.component";
import {
  ActionType,
  translateActionName,
  translateEntityName,
} from "@/cores/constant/constant.history";
import { Media } from "react-data-table-component";
import { getTime } from "@/utils/date.utils";
import { GetHistoryByTargetId } from "@/services/history/history.service";
import extractTokenInfo from "@/utils/extract.token";
import UseWindowSize from "@/cores/window/window.size";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import { User } from "@/services/user/user.models";
export interface Payloads {}

const UserDetail = ({ params }: { params: { userId: string } }) => {
  const [userData, setUserData] = useState<User | any>(); // Initialisé à null plutôt qu'un objet vide
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formFieldsData, setFormFieldsData] = useState<any>();
  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(true);

  const [onChangeHistory, setOnChangeHistory] = useState(false);
  //
  const [dataNotFound, setDataNotFound] = useState<boolean>(false);

  const token = getLocalStorageItem("loginAccessToken") || "";

  const tokenInfo: any = extractTokenInfo(token);

  //History state
  const [historyData, setHistoryData] = useState<HistoryType[]>([]);

  /// Modal
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const getUserData = async () => {
    const response = await GetUserById(params.userId);

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
    const response = await GetHistoryByTargetId(params.userId);

    if (response.statusText === "OK") {
      setHistoryData(response.data.data);
    }
  };

  useEffect(() => {
    getUserData();
    getHistoryData();
  }, [onChangeHistory]);

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
      _id: params.userId,
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
      targetId: params.userId,
      entity: "User",
    };

    const response = await EditUserById(params.userId, userData, history);
    if (response.status === 200) {
      setOnChangeHistory(!onChangeHistory);
      setFieldsIsEditable(!fieldsIsDisabled);
      setIsSuccess(true);
      setMessage({
        title: "Modification effectué",
        message: "Les mises à jour ont été effectuées avec succès.",
      });
      setIsOpen(true);
    }
  };

  const columnStyles = {
    width: "auto",
    minWidth: "100px",
  };

  /* Médias queries pour ajuster la largeur des colonnes en fonction de la largeur de l'écran */
  const responsiveColumnStyles = {
    "@media only screen and (max-width: 767px)": {
      width: "100%",
      padding: "0",
    },
    "@media only screen and (min-width: 768px) and (max-width: 991px)": {
      width: "50%",
    },
    "@media only screen and (min-width: 992px) and (max-width: 1199px)": {
      width: "33%",
    },
    "@media only screen and (min-width: 1200px)": {
      width: "25%",
    },
  };

  // To get the screen size
  const screenSize = UseWindowSize();

  const HistoryColumn = [
    {
      name: "Utilisateur",
      selector: (row: HistoryType) => row?.user?._id,
      sortable: true,
      width: screenSize.width < 600 ? "100%" : "160px",
      style: { ...columnStyles, ...responsiveColumnStyles },

      cell: (row: HistoryType) => {
        let date: string | undefined = undefined;
        const actionName = translateActionName(row?.action?.name);
        const entityName = translateEntityName(row?.action?.name);

        if (row?.createdAt) {
          date = new Date(row.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        }
        const time = getTime(row?.createdAt);

        return screenSize.width < 600 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "130px",
              }}
            >
              <HistoryUser
                photo={row?.user?.photo}
                name={row?.user?.firstname}
              />
              <div
                style={{
                  color: "5C5C5C",
                  fontFamily: "Roboto",
                  paddingLeft: "28px",
                  width: "130px",
                }}
              >
                {date}, {time}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                {`a ${actionName} ${entityName}`}
                {row?.action?.proof && (
                  <>
                    :{" "}
                    <span
                      style={{
                        color: "#5C5C5C",
                        fontFamily: "Roboto",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                      }}
                    >
                      "{row?.action?.proof}"
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <HistoryUser photo={row?.user?.photo} name={row?.user?.firstname} />
        );
      },
    },
    {
      name: "Action",
      selector: (row: HistoryType) => row?.action.name,
      sortable: true,
      hide: Media.SM || Media.MD,
      style: { ...columnStyles, ...responsiveColumnStyles },
      cell: (row: HistoryType) => {
        const actionName = translateActionName(row?.action?.name);
        const entityName = translateEntityName(row?.action?.name);
        return (
          <div>
            {row?.targetId === row.user?._id
              ? "a modifié son profil"
              : `a ${actionName} ${entityName}`}
            {row?.action?.proof && (
              <>
                :{" "}
                <span
                  style={{
                    color: "#5C5C5C",
                    fontFamily: "Roboto",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  "{row?.action?.proof}"
                </span>
              </>
            )}
          </div>
        );
      },
    },
    {
      name: "Date",
      selector: (row: HistoryType) => row?.createdAt,
      sortable: true,
      width: "145px",
      style: { ...columnStyles, ...responsiveColumnStyles },
      hide: Media.MD || Media.SM,
      cell: (row: HistoryType) => {
        const date = new Date(row?.createdAt as any).toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        );

        const time = getTime(row?.createdAt);
        return (
          <div style={{ color: "5C5C5C", fontFamily: "Roboto" }}>
            {date}, {time}
          </div>
        );
      },
    },
  ];

  return (
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
        <>
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
                            haveActionButton={true}
                            haveImageProfile={true}
                          >
                            {userData ? (
                              <UserFormFields
                                fieldsIsDisabled={fieldsIsDisabled}
                                data={userData}
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
          <Processing title="Historique">
            <>
              <History
                columns={HistoryColumn}
                data={historyData}
                minHeight="690px"
              />
            </>
          </Processing>
        </>
      )}
    </DetailsSection>
  );
};

export default UseGuard(UserDetail as ComponentType<any>);
