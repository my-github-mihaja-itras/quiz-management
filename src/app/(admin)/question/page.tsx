"use client";

import { useEffect, useState } from "react";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import Tabs from "@/components/shared/tabs/tabs.components";
import Loader from "@/components/loader/loader";

import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import Processing from "@/components/shared/processing/processing.component";
import { HistoryType } from "@/components/shared/history/history.constant";
import { getTime } from "@/utils/date.utils";
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
import CursusFormFields from "@/components/form/question.form.fields";
import { HttpStatusCode } from "axios";
import History, {
  HistoryUser,
} from "@/components/shared/history/history.component";
import IconCursus from "@/components/shared/icons/iconCursus";
import FormFieldsEditableCursus from "@/components/shared/form-fields-cursus/form.fields.cursus";
import {
  ChoiceOptions,
  QuestionType,
  QuestionTypeToInsert,
} from "@/services/question/question.models";
import { addQuestionService } from "@/services/question/question.service";

const token = getLocalStorageItem("loginAccessToken") || "";

const tokenInfo: any = extractTokenInfo(token);

const SettingPage = ({ params }: { params: { candidateId: string } }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [formFieldsData, setFormFieldsData] = useState<any>();

  const [cursusData, setCursusData] = useState<CursusType[] | any>();

  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [cursusIsModified, setCursusIsModified] = useState<boolean>(false);

  const [registrationPeriodIsModified, setRegistrationPeriodIsModified] =
    useState<boolean>(false);

  const [message, setMessage] = useState<ErrorMessage>();

  const [cursusHistoryData, setCursusHistoryData] = useState<HistoryType[]>([]);

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

  const getCursusHistoryData = async () => {
    const response = await getHistoryByEntity(EntityName.CURSUS);
    if (response.status === HttpStatusCode.Ok) {
      setCursusHistoryData(response.data.data);
    }
  };

  const handleChangeEditableFields = () => {
    setFieldsIsEditable(!fieldsIsDisabled);
  };

  const AddCursusSubmitService = async (data: any) => {
    console.log(" ================= add Question");
    console.log(data);
    console.log(" ================= add Question");
    const question: QuestionTypeToInsert = {
      ...data,
      choice: getAllChoice(data.choice),
    };

    const response = await addQuestionService(question);

    // if (result.length > 0) {
    //   const response = await addMultipleCursusService(result);
    //   if (response.status === HttpStatusCode.Ok) {
    //     setCursusIsModified(true);
    //     setIsOpen(true);
    //     setMessage({
    //       title: "Modification effectué",
    //       message: "Les mises à jour ont été effectuées avec succès.",
    //     });
    //   } else {
    //     setCursusIsModified(false);
    //     setIsOpen(true);
    //     setMessage({
    //       title: "Erreur",
    //       message: "Une erreur c'est produit lors de la modification.",
    //     });
    //   }
    // }
  };
  const getAllChoice = (choiceOptions: ChoiceOptions[]) => {
    let tab: string[] = [];
    choiceOptions.map((choiceOptions) => {
      tab.push(choiceOptions.choiceOptions);
    });
    return tab;
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

  const tabsConstant = [
    {
      label: "CREATION QUESTION",
      content: (
        <>
          <FormFieldsEditableCursus
            handleChangeEditableFields={handleChangeEditableFields}
            fieldsIsDisabled={false}
            formData={formFieldsData}
            submitService={AddCursusSubmitService}
            haveActionButton={true}
            haveImageProfile={false}
          >
            <CursusFormFields fieldsIsDisabled={fieldsIsDisabled} />
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

  useEffect(() => {
    getCursus();
    getCursusHistoryData();
  }, [cursusIsModified, registrationPeriodIsModified]);

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
            <Tabs tabsConstant={tabsConstant} />
          </Details>

          <Processing title="Quiz" titleIcon={<IconCursus />}>
            <History
              columns={CursusHistoryColumn}
              data={cursusHistoryData}
              minHeight="73vh"
            />
          </Processing>
        </>
      )}
    </DetailsSection>
  );
};

export default SettingPage;
