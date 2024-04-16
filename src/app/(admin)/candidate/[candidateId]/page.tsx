"use client";

import { useEffect, useState } from "react";
import {
  GetCandidateById,
  UpdateApplication,
} from "@/services/candidate/candidate-service";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import Tabs from "@/components/shared/tabs/tabs.components";
import FormFieldsEditable from "@/components/shared/form-fields/form.fields.components";
import Loader from "@/components/loader/loader";
import PersonalFormFields from "@/components/form/personal.form.fields";
import DiplomaFormFields from "@/components/form/diploma.form.fields";
import MotivationFormFields from "@/components/form/motivation.form.fields";
import CompetitionFormFields from "@/components/form/competition.form.fields";

import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import Processing from "@/components/shared/processing/processing.component";
import { HistoryType } from "@/components/shared/history/history.constant";
import History, {
  HistoryUser,
} from "@/components/shared/history/history.component";
import { GetHistoryByTargetId } from "@/services/history/history.service";
import { getTime } from "@/utils/date.utils";
import CommentSection from "@/components/shared/comment.section/comment.section";
import StatusCandidate from "@/components/shared/statusCandidate/statusCandidate";
import {
  translateActionName,
  translateEntityName,
} from "@/cores/constant/constant.history";
import { Media } from "react-data-table-component";
import UseWindowSize from "@/cores/window/window.size";
import IconGear from "@/components/shared/icons/iconGear";
import {
  CandidateType,
  PersonalType,
  DiplomaType,
  CertificationType,
  CompetitionResultType,
} from "@/services/candidate/candidate-models";
import { ServerResponse } from "@/cores/constant/response.constant";
import { HttpStatusCode } from "axios";

const CandidateDetailPage = ({ params,}: { params: { candidateId: string };}) => {
  const [candidateData, setCandidateData] = useState<CandidateType | any>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  //
  const [dataNotFound, setDataNotFound] = useState<boolean>(false);

  //
  const [formFieldsData, setFormFieldsData] = useState<any>();

  const [userData, setUserData] = useState<PersonalType | any>({});
  const [diplomaData, setDiplomaData] = useState<DiplomaType | any>([]);
  const [certificationData, setCertificationData] = useState<
    CertificationType[] | any
  >([]);
  const [competitionResultData, setCompetitionResultData] = useState<
    CompetitionResultType | any
  >({});
  const [motivationData, setMotivationData] = useState<string>("");

  const [onChangeHistory, setOnChangeHistory] = useState(false);

  //
  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();

  //History state
  const [historyData, setHistoryData] = useState<HistoryType[]>([]);

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const getCandidateData = async () => {
    const response: ServerResponse = await GetCandidateById(params.candidateId);
    if (response.status === HttpStatusCode.Ok) {
      setDataNotFound(false);
      setIsLoading(false);
      const candidate: CandidateType = response?.data.data;
      setFormFieldsData({
        _id: candidate?._id,
        status: candidate?.applicationStatus,
        username: candidate?.user.username,
        photo: candidate?.user.photo,
      });

      setCandidateData(candidate);
      setUserData(candidate?.user);
      setDiplomaData(candidate?.diploma[0]);
      setCertificationData(candidate?.certification);
      setCompetitionResultData(candidate?.competitionResult);
      setMotivationData(candidate?.motivation);
    } else {
      setDataNotFound(true);
      setIsLoading(false);
    }
  };

  const getHistoryData = async () => {
    const response: ServerResponse = await GetHistoryByTargetId(
      params.candidateId
    );

    if (response.status === HttpStatusCode.Ok) {
      setHistoryData(response.data.data);
    }
  };
  const getOnChangeHistory = () => {
    setOnChangeHistory(!onChangeHistory);
  };
  useEffect(() => {
    getCandidateData();
    getHistoryData();
  }, [onChangeHistory]);

  const handleChangeEditableFields = () => {
    setFieldsIsEditable(!fieldsIsDisabled);
  };

  const ApplicationSubmitService = async (data: any) => {
    const {
      username,
      email,
      groups,
      roles,
      cursus,
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
      ...restOfData
    } = data;

    let isActiveUpdate;

    if (typeof isActive === "undefined") {
      isActiveUpdate = candidateData.user.isActive;
    } else {
      isActiveUpdate = isActive;
    }

    const userData = {
      _id: candidateData.user._id,
      username,
      email,
      groups,
      roles,
      cursus,
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

    let formattedCertifications;
    if (restOfData.certification) {
      formattedCertifications = restOfData.certification.map((cert: any) => ({
        ...cert,
        startDate: cert.startDate,
        endDate: cert.endDate,
      }));
    }

    const updatedData = {
      user: userData,
      ...restOfData,
      certification: formattedCertifications,
    };

    const response: ServerResponse = await UpdateApplication(
      params.candidateId,
      updatedData
    );

    if (response.status === HttpStatusCode.Ok) {
      setFieldsIsEditable(!fieldsIsDisabled);
      setIsSuccess(true);
      setMessage({
        title: "Modification effectué",
        message: "Les mises à jour ont été effectuées avec succès.",
      });
      setIsOpen(true);
    }
  };

  const tabsConstant = [
    {
      label: "Infos persos",
      content: (
        <>
          {formFieldsData && (
            <FormFieldsEditable
              handleChangeEditableFields={handleChangeEditableFields}
              fieldsIsDisabled={fieldsIsDisabled}
              formData={formFieldsData}
              submitService={ApplicationSubmitService}
              haveActionButton={false}
              haveImageProfile={true}
            >
              <PersonalFormFields
                fieldsIsDisabled={fieldsIsDisabled}
                personalData={userData}
              />
            </FormFieldsEditable>
          )}
        </>
      ),
    },
    {
      label: "Parcours",
      content: (
        <>
          <FormFieldsEditable
            handleChangeEditableFields={handleChangeEditableFields}
            fieldsIsDisabled={fieldsIsDisabled}
            formData={formFieldsData}
            submitService={ApplicationSubmitService}
            haveActionButton={false}
            haveImageProfile={false}
          >
            <DiplomaFormFields
              fieldsIsDisabled={fieldsIsDisabled}
              diplomaData={diplomaData}
              certificationData={certificationData}
            />
          </FormFieldsEditable>
        </>
      ),
    },
    {
      label: "Motivations",
      content: (
        <>
          <FormFieldsEditable
            handleChangeEditableFields={handleChangeEditableFields}
            fieldsIsDisabled={fieldsIsDisabled}
            formData={formFieldsData}
            submitService={ApplicationSubmitService}
            haveActionButton={false}
            haveImageProfile={false}
          >
            <MotivationFormFields
              fieldsIsDisabled={fieldsIsDisabled}
              motivationData={motivationData}
            />
          </FormFieldsEditable>
        </>
      ),
    },
    {
      label: "Bootcamp",
      content: (
        <>
          <FormFieldsEditable
            handleChangeEditableFields={handleChangeEditableFields}
            fieldsIsDisabled={fieldsIsDisabled}
            formData={formFieldsData}
            submitService={ApplicationSubmitService}
            haveActionButton={false}
            haveImageProfile={false}
          >
            <CompetitionFormFields
              fieldsIsDisabled={fieldsIsDisabled}
              competitionResultData={userData}
            />
          </FormFieldsEditable>
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
          color={"#0FC3ED"}
        ></ErrorModal>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Details>
            {!dataNotFound ? (
              <Tabs tabsConstant={tabsConstant} />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                Le compte du candidat n'est pas trouvé
              </div>
            )}
          </Details>
          <Processing title="Traitement" titleIcon={<IconGear />}>
            <>
              <StatusCandidate
                onChangeHistory={getOnChangeHistory}
                personalData={formFieldsData}
                isAccepted={false}
              />
              <CommentSection
                candidateId={params.candidateId}
                onChangeHistory={getOnChangeHistory}
              />
              <History
                columns={HistoryColumn}
                data={historyData}
                minHeight="230px"
              />
            </>
          </Processing>
        </>
      )}
    </DetailsSection>
  );
};

export default CandidateDetailPage;
