"use client";

import { useState } from "react";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import Tabs from "@/components/shared/tabs/tabs.components";
import Loader from "@/components/loader/loader";

import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import Processing from "@/components/shared/processing/processing.component";
import { HistoryType } from "@/components/shared/history/history.constant";
import { getTime } from "@/utils/date.utils";
import {
  translateActionName,
  translateEntityName,
} from "@/cores/constant/constant.history";
import { Media } from "react-data-table-component";
import UseWindowSize from "@/cores/window/window.size";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import {
  QuestionFormFields,
} from "@/components/form/question.form.fields";
import { HttpStatusCode } from "axios";
import History, {
  HistoryUser,
} from "@/components/shared/history/history.component";
import IconCursus from "@/components/shared/icons/iconCursus";
import FormFieldsEditableCursus from "@/components/shared/form-fields-cursus/form.fields.cursus";
import {
  ChoiceOptions,
  QuestionTypeToInsert,
} from "@/services/question/question.models";
import { addQuestionService } from "@/services/question/question.service";

const token = getLocalStorageItem("loginAccessToken") || "";

const tokenInfo: any = extractTokenInfo(token);

const SettingPage = ({ params }: { params: { candidateId: string } }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formFieldsData, setFormFieldsData] = useState<any>();

  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [errorOnSubmit, setErrorOnSubmit] = useState<boolean>(false);

  const [registrationPeriodIsModified, setRegistrationPeriodIsModified] =
    useState<boolean>(false);

  const [message, setMessage] = useState<ErrorMessage>();

  const [cursusHistoryData, setCursusHistoryData] = useState<HistoryType[]>([]);

  const closeModal = (value: boolean) => {
    setIsOpen(value);
    setRegistrationPeriodIsModified(!registrationPeriodIsModified);
    setIsSuccess(false);
  };

  const handleChangeEditableFields = () => {
    setFieldsIsEditable(!fieldsIsDisabled);
  };

  const AddCursusSubmitService = async (data: any) => {
    // console.log(" ================= add Question");
    // console.log(data);
    // console.log(" ================= add Question");
    const question: QuestionTypeToInsert = {
      ...data,
      choice: getAllChoice(data.choice),
    };
    if (data.trueAnswer != null) {
      const response = await addQuestionService(question);
      if (response.status === HttpStatusCode.Created) {
        setIsSuccess(true);
        setIsOpen(true);
        setMessage({
          title: "Ajout effectué",
          message: "Votre question a bien été enregistrée !",
        });
        setErrorOnSubmit(false);
      } else {
        setIsSuccess(false);
        setIsOpen(true);
        setMessage({
          title: "Erreur",
          message: "Veuillez bien verifier vos informations !",
        });
      }
    } else {
      setErrorOnSubmit(true);
      setIsSuccess(false);
      setIsOpen(true);
      setMessage({
        title: "Erreur",
        message: "Veuillez bien verifier vos informations !",
      });
    }
  };
  const getAllChoice = (choiceOptions: ChoiceOptions[]) => {
    let tab: string[] = [];
    choiceOptions.map((choiceOptions) => {
      tab.push(choiceOptions.choiceOptions);
    });
    return tab;
  };

  const tabsConstant = [
    {
      label: "Création Question",
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
            <QuestionFormFields
              fieldsIsDisabled={fieldsIsDisabled}
              errorOnSubmit={errorOnSubmit}
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

  return (
    <DetailsSection>
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
            <Tabs tabsConstant={tabsConstant} />
          </Details>

          {/* <Processing title="Quiz" titleIcon={<IconCursus />}>
            <History
              columns={CursusHistoryColumn}
              data={cursusHistoryData}
              minHeight="73vh"
            />
          </Processing> */}
        </>
      )}
    </DetailsSection>
  );
};

export default SettingPage;
