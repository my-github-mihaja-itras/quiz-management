"use client";

import { useEffect, useState } from "react";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import Tabs from "@/components/shared/tabs/tabs.components";
import Loader from "@/components/loader/loader";

import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import Processing from "@/components/shared/processing/processing.component";
import { HistoryType } from "@/components/shared/history/history.constant";
import { getDate, getTime } from "@/utils/date.utils";
import {
  ActionType,
  EntityName,
  translateActionName,
  translateEntityName,
} from "@/cores/constant/constant.history";
import { Media } from "react-data-table-component";
import UseWindowSize from "@/cores/window/window.size";
import {
  addMultipleCursusService,
  getHistoryByEntity,
} from "@/services/cursus/cursus.service";
import {
  CursusAndHistory,
  CursusMutipleToInsert,
} from "@/services/cursus/cursus.models";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import { getAllCursus } from "@/services/cursus/cursus.service";
import { CursusType } from "@/services/cursus/cursus.models";
import CursusFormFields from "@/components/form/cursus.form.fields";
import AddEventFormFields from "@/components/form/add.event.form.fields";
import { MessageModalType } from "@/components/modal/modal.interface";
import EventList from "@/components/shared/eventList/eventList.component";
import { SchoolEvent } from "@/services/events/event.interface";
import { GetAllEvent } from "@/services/events/event.service";
import { HttpStatusCode } from "axios";
import IconEvent from "@/components/shared/icons/iconEvent";
import History, {
  HistoryUser,
} from "@/components/shared/history/history.component";
import IconCursus from "@/components/shared/icons/iconCursus";
import IconRegistration from "@/components/shared/icons/iconRegistration";
import RegistrationPeriodFormFields from "@/components/form/registration-period.form.fields";
import { RegistrationPeriod } from "@/services/registration-period/registration-period.model";
import { GetAllRegistrationPeriod } from "@/services/registration-period/registration-period.services";
import FormFieldsEditableCursus from "@/components/shared/form-fields-cursus/form.fields.cursus";

const token = getLocalStorageItem("loginAccessToken") || "";

const tokenInfo: any = extractTokenInfo(token);

const SettingPage = ({ params }: { params: { candidateId: string } }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [formFieldsData, setFormFieldsData] = useState<any>();

  const [cursusData, setCursusData] = useState<CursusType[] | any>();

  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [cursusIsModified, setCursusIsModified] = useState<boolean>(false);

  const [registrationPeriodIsModified, setRegistrationPeriodIsModified] =
    useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<number>(0);

  const [message, setMessage] = useState<ErrorMessage>();

  const [cursusHistoryData, setCursusHistoryData] = useState<HistoryType[]>([]);

  const [registrationPeriodHistoryData, setRegistrationPeriodHistoryData] =
    useState<HistoryType[]>([]);

  const [eventListData, setEventListData] = useState<SchoolEvent[]>([]);

  const [registrationPeriodData, setRegistrationPeriodData] = useState<
    RegistrationPeriod[]
  >([]);

  const closeModal = (value: boolean) => {
    setIsOpen(value);
    setCursusIsModified(false);
    setRegistrationPeriodIsModified(!registrationPeriodIsModified);
    setIsSuccess(false);
  };

  const getCursus = async () => {
    const cursusRes = await getAllCursus();

    if (cursusRes) {
      setIsLoading(false);
      setCursusData(cursusRes.data);
    }
  };

  const getRegistrationPeriodData = async () => {
    const response = await GetAllRegistrationPeriod();
    if (response.status == HttpStatusCode.Ok) {
      setRegistrationPeriodData(response.data.data);
    }
  };

  const getEvent = async () => {
    const response = await GetAllEvent();

    if (response.status === HttpStatusCode.Ok) {
      setEventListData(response.data.data);
    }
  };

  const getCursusHistoryData = async () => {
    const response = await getHistoryByEntity(EntityName.CURSUS);
    if (response.status === HttpStatusCode.Ok) {
      setCursusHistoryData(response.data.data);
    }
  };

  const getRegistrationPeriodHistoryData = async () => {
    const response = await getHistoryByEntity(EntityName.REGISTRATION_PERIOD);
    if (response.status === HttpStatusCode.Ok) {
      setRegistrationPeriodHistoryData(response.data.data);
    }
  };

  const getOnChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const handleChangeEditableFields = () => {
    setFieldsIsEditable(!fieldsIsDisabled);
  };

  const AddCursusSubmitService = async (data: CursusMutipleToInsert) => {
    const newCursus: CursusAndHistory[] = getNewCursus(data);
    const modifiedCursus: CursusAndHistory[] = checkOldCursusIsModified(data);
    const result: CursusAndHistory[] = [...modifiedCursus, ...newCursus];

    if (result.length > 0) {
      const response = await addMultipleCursusService(result);
      if (response.status === HttpStatusCode.Ok) {
        setCursusIsModified(true);
        setIsOpen(true);
        setMessage({
          title: "Modification effectué",
          message: "Les mises à jour ont été effectuées avec succès.",
        });
      } else {
        setCursusIsModified(false);
        setIsOpen(true);
        setMessage({
          title: "Erreur",
          message: "Une erreur c'est produit lors de la modification.",
        });
      }
    }
  };

  const getNewCursus = (
    cursusMultiple: CursusMutipleToInsert
  ): CursusAndHistory[] => {
    return cursusMultiple.cursusToInsert.filter(
      (cursusAndHistory) => cursusAndHistory.history
    );
  };

  const checkOldCursusIsModified = (
    cursusMultiple: CursusMutipleToInsert
  ): CursusAndHistory[] => {
    const modifiedCursus: CursusAndHistory[] = [];
    cursusMultiple.cursusToInsert.map((newCursus) => {
      cursusData.map((oldCursus: CursusType) => {
        if (oldCursus._id === newCursus.cursus._id) {
          if (
            oldCursus.name != newCursus.cursus.name ||
            oldCursus.description != newCursus.cursus.description
          ) {
            newCursus.history = {
              action: {
                name: ActionType.UPDATE_CURSUS,
                proof: newCursus.cursus.name,
              },
              user: tokenInfo._id,
              targetId: newCursus.cursus._id ? newCursus.cursus._id : "",
              entity: EntityName.CURSUS,
            };

            modifiedCursus.push(newCursus);
          }
        }
      });
    });
    return modifiedCursus;
  };

  const onAddEventChange = (response: MessageModalType) => {
    setIsSuccess(response.success as boolean);
    setMessage({
      title: response?.title as string,
      message: response.message as string,
    });
    setIsOpen(true);
  };

  const tabsConstant = [
    {
      label: "Question",
      content: (
        <>
          <FormFieldsEditableCursus
            handleChangeEditableFields={handleChangeEditableFields}
            fieldsIsDisabled={fieldsIsDisabled}
            formData={formFieldsData}
            submitService={AddCursusSubmitService}
            haveActionButton={true}
            haveImageProfile={false}
          >
            <CursusFormFields
              fieldsIsDisabled={fieldsIsDisabled}
              cursusData={cursusData}
            />
          </FormFieldsEditableCursus>
        </>
      ),
    },
  ];

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

  const CursusHistoryColumn = [
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
        );
      },
    },
    {
      name: "Date",
      selector: (row: HistoryType) => row?.createdAt,
      sortable: true,
      width: "145px",
      style: { ...columnStyles, ...responsiveColumnStyles },
      hide: Media.SM || Media.MD,
      cell: (row: HistoryType) => {
        let date: string | undefined = undefined;

        if (row?.createdAt) {
          date = new Date(row.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        }
        const time = getTime(row?.createdAt);
        return (
          <div style={{ color: "5C5C5C", fontFamily: "Roboto" }}>
            {date}, {time}
          </div>
        );
      },
    },
  ];

  const RegistrationPeriodHistoryColumn = [
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
        );
      },
    },
    {
      name: "Date",
      selector: (row: HistoryType) => row?.createdAt,
      sortable: true,
      width: "140px",
      style: { ...columnStyles, ...responsiveColumnStyles },
      hide: Media.SM || Media.MD,
      cell: (row: HistoryType) => {
        let date: string | undefined = undefined;

        if (row?.createdAt) {
          date = new Date(row.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        }
        const time = getTime(row?.createdAt);
        return (
          <div style={{ color: "5C5C5C", fontFamily: "Roboto" }}>
            {date}, {time}
          </div>
        );
      },
    },
  ];

  const EventListColumn = [
    {
      name: "Nom",
      selector: (row: SchoolEvent) => row?.name,
      sortable: true,
      left: true,
    },
    {
      name: "Date de début",
      selector: (row: SchoolEvent) => row?.startDate,
      sortable: true,
      hide: Media.MD || Media.SM,
      cell: (row: any) => {
        const date = getDate(row?.startDate);
        const time = getTime(row?.startDate);
        return (
          <div>
            {date} <span style={{ color: "#B4B4B4" }}> {time} </span>
          </div>
        );
      },
    },
    {
      name: "Date de fin",
      selector: (row: SchoolEvent) => row?.endDate,
      sortable: true,
      left: true,
      hide: Media.MD || Media.SM,
      cell: (row: any) => {
        const date = getDate(row?.endDate);
        const time = getTime(row?.endDate);
        return (
          <div>
            {date} <span style={{ color: "#B4B4B4" }}> {time} </span>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getCursus();
    getCursusHistoryData();
    getRegistrationPeriodData();
    getRegistrationPeriodHistoryData();
  }, [cursusIsModified, registrationPeriodIsModified]);

  useEffect(() => {
    getEvent();
  }, [isOpen]);

  return (
    <DetailsSection>
      {isOpen && (
        <ErrorModal
          close={closeModal}
          message={message}
          color={isSuccess || cursusIsModified ? "#0fc3ed" : "#dc3545"}
        ></ErrorModal>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Details>
            <Tabs tabsConstant={tabsConstant} onChangePage={getOnChangeTab} />
          </Details>

          {activeTab == 0 ? (
            <Processing title="Quiz" titleIcon={<IconCursus />}>
              <History
                columns={CursusHistoryColumn}
                data={cursusHistoryData}
                minHeight="73vh"
              />
            </Processing>
          ) : activeTab == 1 ? (
            <>
              <Processing title="Inscriptions" titleIcon={<IconRegistration />}>
                <History
                  columns={RegistrationPeriodHistoryColumn}
                  data={registrationPeriodHistoryData}
                  minHeight="73vh"
                />
              </Processing>
            </>
          ) : (
            <Processing title="Évènements" titleIcon={<IconEvent />}>
              <>
                <EventList columns={EventListColumn} data={eventListData} />
              </>
            </Processing>
          )}
        </>
      )}
    </DetailsSection>
  );
};

export default SettingPage;
