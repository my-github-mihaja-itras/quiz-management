"use client";
import style from "./statusCandidate.module.css";
import { ApplicationStatus } from "@/cores/constant/constant.application";
import { useEffect, useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ChangeApplicationStatus } from "@/services/candidate/candidate-service";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import { OptionsType } from "../form/input-field/input.interface";
import { InputSelect } from "../form/input-field/input.select";
import ConfirmModal from "@/components/modal/confirmModal";
import { EducationalClasses } from "@/services/educational-classes/educational-classes.models";
import { getAllEducationalClasses } from "@/services/educational-classes/educational-classes-service";
import { useRouter } from "next/navigation";
import filterStatus from "@/utils/shared.utils";
import { ServerResponse } from "@/cores/constant/response.constant";
import { HttpStatusCode } from "axios";

interface PersonalFieldsProps {
  personalData: PersonalForm;
  onChangeHistory: any;
  isAccepted: boolean;
}

export interface PersonalForm {
  _id: string;
  status: string;
  username: string;
}

export interface Payloads {
  _id: string;
  user: any;
  username: string;
}

const StatusCandidate: React.FC<PersonalFieldsProps> = ({
  personalData,
  onChangeHistory,
  isAccepted,
}) => {
  const methods = useForm<Payloads>({
    defaultValues: {},
  });

  const [statusOptions, setStatusOptions] = useState<OptionsType>({
    label: "aucun",
    value: personalData?.status,
  });

  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(false);
  const [isChangeStatus, setIsChangeStatus] = useState<Boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();
  const [modalMessage, setModalMessage] = useState<any>();
  const [dataForRequest, setDataForRequest] = useState<any>();
  const [educationalClassOptions, setEducationalClassOptions] = useState<
    OptionsType[]
  >([]);

  const handleStatusOptions = () => {
    switch (personalData?.status) {
      case ApplicationStatus.UNREAD:
        setStatusOptions({
          label: "Non lu",
          value: ApplicationStatus.UNREAD,
        });
        break;
      case ApplicationStatus.IN_PROCESSING:
        setStatusOptions({
          label: "En traitement",
          value: ApplicationStatus.IN_PROCESSING,
        });
        break;
      case ApplicationStatus.REGISTRATED_FOR_COMPETITION:
        setStatusOptions({
          label: "Inscrit au Bootcamp",
          value: ApplicationStatus.REGISTRATED_FOR_COMPETITION,
        });
        break;
      case ApplicationStatus.ACCEPTED_FOR_INTERVIEW:
        setStatusOptions({
          label: "En attente d'entretien",
          value: ApplicationStatus.ACCEPTED_FOR_INTERVIEW,
        });
        break;
      case ApplicationStatus.INTERVIEWED:
        setStatusOptions({
          label: "Interviewé",
          value: ApplicationStatus.INTERVIEWED,
        });
        break;
      case ApplicationStatus.REQUEST_ACCEPTED:
        setStatusOptions({
          label: "Accepté",
          value: ApplicationStatus.REQUEST_ACCEPTED,
        });
        break;
      default:
        setStatusOptions({
          label: "Aucun status",
          value: "UNDEFINED",
        });
        break;
    }
  };

  const loadClasses = async () => {
    const classesRes = await getAllEducationalClasses();
    const classes = classesRes?.data.data;

    setEducationalClassOptions(
      classes?.map((classeType: EducationalClasses) => {
        return {
          label: classeType.name,
          value: classeType._id,
        };
      })
    );
  };
  const [applicationStatusOptions,setApplicationStatusOptions]= useState<OptionsType[]>  ([
    {
      label: "Non lu",
      value: ApplicationStatus.UNREAD,
    },
    {
      label: "En traitement",
      value: ApplicationStatus.IN_PROCESSING,
    },
    {
      label: "Inscrit au Bootcamp",
      value: ApplicationStatus.REGISTRATED_FOR_COMPETITION,
    },
    {
      label: "En attente d'entretien",
      value: ApplicationStatus.ACCEPTED_FOR_INTERVIEW,
    },
    {
      label: "Interviewé",
      value: ApplicationStatus.INTERVIEWED,
    },
    {
      label: "Accepté",
      value: ApplicationStatus.REQUEST_ACCEPTED,
    },
    {
      label: "Refusé",
      value: ApplicationStatus.REQUEST_REFUSED,
    },
  ]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (
      personalData?.status === ApplicationStatus.REQUEST_ACCEPTED &&
      isAccepted === true
    ) {
      setIsOpenModal(true);
      setModalMessage({
        title: "Confirmation",
        message: "Voulez vous vraiment assigner cette classe à cette candidat",
        status: false,
        confirmText: "Ajouter",
      });
      setDataForRequest(data);
    } else {
      if (data.applicationStatus === personalData.status) {
        return null;
      }
      if (data.applicationStatus === ApplicationStatus.REQUEST_ACCEPTED) {
        setIsOpenModal(true);
        setModalMessage({
          title: "Confirmation",
          message: "Voulez vous vraiment accepter cette candidature",
          status: false,
          confirmText: "Accepter",
        });
        setDataForRequest(data);
      }
      if (data.applicationStatus !== ApplicationStatus.REQUEST_ACCEPTED) {
        const response: ServerResponse = await ChangeApplicationStatus(
          personalData._id,
          data
        );

        if (response.status === HttpStatusCode.Ok) {
          setIsChangeStatus(!isChangeStatus);
          setIsOpen(true);
          setMessage({
            title: "Modification effectué",
            message: "Changement de statut effectué avec succès.",
          });
        }
      }
    }
  };
  const onError: SubmitErrorHandler<any> = (error: any) => {
    console.log(error);
  };
  const closeModal = (value: boolean) => {
    setIsOpenModal(value);
  };
  const closeErrorModal = (value: boolean) => {
    setIsOpen(value);
  };
  const handleChangeStatusConfirmation = async () => {
    const response = await ChangeApplicationStatus(
      personalData._id,
      dataForRequest
    );
    if (response.status === 200) {
      setIsChangeStatus(!isChangeStatus);
      setIsOpenModal(false);
      setIsOpen(true);
      setMessage({
        title: "Modification effectué",
        message: "Changement effectué avec succès.",
      });
    }
  };
  useEffect(() => {
    handleStatusOptions();
    onChangeHistory();
    loadClasses();
    setApplicationStatusOptions(applicationStatusOptions)
  }, [isChangeStatus]);
  return (
    <>
      {isOpen && (
        <ErrorModal
          close={closeErrorModal}
          message={message}
          color={"#0FC3ED"}
        ></ErrorModal>
      )}
      {isOpenModal && (
        <ConfirmModal
          close={closeModal}
          message={modalMessage}
          handleConfirmation={handleChangeStatusConfirmation}
        />
      )}
      <div className={style.container}>
        <h1>{isAccepted ? "Classe" : "Statut"} du candidat</h1>
        <br />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <div className={style.content}>
              {personalData.status && isAccepted ? (
                <InputSelect
                  onChange={"educationalClasse"}
                  fieldName="educationalClasse"
                  register={methods.register}
                  optionsValues={educationalClassOptions}
                />
              ) : (
                <InputSelect
                  onChange={personalData?.status}
                  fieldName="applicationStatus"
                  register={methods.register}
                  selectedValue={statusOptions}
                  optionsValues={applicationStatusOptions}
                  readOnly={
                    personalData?.status === ApplicationStatus.REQUEST_ACCEPTED
                      ? true
                      : false
                  }
                />
              )}
              <button type="submit" className={style.editBtn}>
                {isAccepted ? "Ajouter" : "Modifier"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default StatusCandidate;
