"use client";

import Loader from "@/components/loader/loader";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import FormFieldsEditable from "@/components/shared/form-fields/form.fields.components";
import Tabs from "@/components/shared/tabs/tabs.components";
import { ActionType } from "@/cores/constant/constant.history";
import UseWindowSize from "@/cores/window/window.size";

import { GetStudentById } from "@/services/student/student.service";
import { EditUserById, getUserById } from "@/services/user/user-service";
import extractTokenInfo from "@/utils/extract.token";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import { useEffect, useState } from "react";
import { ServerResponse } from "@/cores/constant/response.constant";
import { HttpStatusCode } from "axios";
import { getQuizSessionById } from "@/services/quiz-session/quiz-session.service";
import QuizResult from "@/components/shared/quizResult/quizResult.component";
import IconGear from "@/components/shared/icons/iconGear";
import Processing from "@/components/shared/processing/processing.component";
import { QuizSession } from "@/services/quiz-session/quiz-session.models";
import UserQuizFormFields from "@/components/form/userQuiz.form.fields";
import { User } from "@/services/user/user.models";
import IconQuiz from "@/components/shared/icons/IconQuiz";

const StudentDetail = ({ params }: { params: { quizSessionId: string } }) => {
  const [quizSession, setQuizSession] = useState<QuizSession>();
  const [userData, setUserData] = useState<User | any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formFieldsData, setFormFieldsData] = useState<any>();
  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(true);

  const [dataNotFound, setDataNotFound] = useState<boolean>(false);
  const token = getLocalStorageItem("loginAccessToken") || "";
  const tokenInfo: any = extractTokenInfo(token);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const getQuizSessionDataById = async () => {
    const response: ServerResponse = await getQuizSessionById(
      params.quizSessionId
    );

    if (response.status === HttpStatusCode.Ok) {
      setQuizSession(response.data.data);
      setDataNotFound(false);
      setIsLoading(false);
      const user: User = response?.data.data;

      setUserData(user);
      setFormFieldsData({
        username: user?.username,
        photo: user?.photo,
      });
    } else {
      setDataNotFound(true);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const getUserData = async (userId: string) => {
    const response: ServerResponse = await getUserById(userId);
    // console.log(response);
    if (response.status === HttpStatusCode.Ok) {
      setDataNotFound(false);
      setIsLoading(false);
      const user: User = response?.data.data;

      setUserData(user);
      setFormFieldsData({
        username: user?.username,
        photo: user?.photo,
      });
    } else {
      setDataNotFound(true);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getQuizSessionDataById();
  }, []);

  const handleChangeEditableFields = () => {
    setFieldsIsEditable(!fieldsIsDisabled);
  };
 

  const screenSize = UseWindowSize();

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
          <>
            <Processing title="Résultats du Quiz" titleIcon={<IconQuiz />}>
              <QuizResult quizSession={quizSession} />
            </Processing>
          </>
        )}
      </DetailsSection>
    </>
  );
};

export default StudentDetail;
