"use client";

import StudentFormFields from "@/components/form/student.form.fields";
import Loader from "@/components/loader/loader";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import FormFieldsEditable from "@/components/shared/form-fields/form.fields.components";
import Tabs from "@/components/shared/tabs/tabs.components";
import { ActionType } from "@/cores/constant/constant.history";
import UseWindowSize from "@/cores/window/window.size";
import { Student } from "@/services/student/student.models";
import { GetStudentById } from "@/services/student/student.service";
import { EditUserById } from "@/services/user/user-service";
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

const StudentDetail = ({ params }: { params: { quizSessionId: string } }) => {
  const [quizSession, setQuizSession] = useState<QuizSession>();
  const [studentData, setStudentData] = useState<Student | any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formFieldsData, setFormFieldsData] = useState<any>();
  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(true);
  const [userData, setUserData] = useState<Student | any>({});
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

    if (response.status == HttpStatusCode.Ok) {
      setQuizSession(response.data.data);
    }
    getStudentData();
  };

  const getStudentData = async () => {
    const response: ServerResponse = await GetStudentById(
      "66215c9c03b1b6a9b385589c"
    );

    if (response.status === HttpStatusCode.Ok) {
      setDataNotFound(false);
      setIsLoading(false);
      const student: Student = response?.data.data;
      setStudentData(student);
      setFormFieldsData({
        username: student?.user.username,
        photo: student?.user.photo,
      });
      setUserData({ ...student.user });
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

    const user = {
      _id: userData._id,
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
    // const studentData = { timeWork: timeWork };
    const history = {
      action: { name: ActionType.UPDATE_USER },
      user: tokenInfo._id,
      targetId: userData._id,
      entity: "User",
    };
    const response = await EditUserById(user._id, user, history);
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
                              {studentData ? (
                                <StudentFormFields
                                  fieldsIsDisabled={fieldsIsDisabled}
                                  data={studentData}
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
            <Processing title="Résultat Quiz" titleIcon={<IconGear />}>
              <QuizResult quizSession={quizSession} />
            </Processing>
          </>
        )}
      </DetailsSection>
    </>
  );
};

export default StudentDetail;
