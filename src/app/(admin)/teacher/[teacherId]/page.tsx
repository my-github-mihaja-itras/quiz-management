"use client";
import { EditUserById } from "@/services/user/user-service";
import React, { useEffect, useState } from "react";

import Loader from "@/components/loader/loader";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import FormFieldsEditable from "@/components/shared/form-fields/form.fields.components";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import Tabs from "@/components/shared/tabs/tabs.components";
import { Teacher } from "@/services/teacher/teacher.models";
import {
  EditTeacherById,
  GetTeacherById,
} from "@/services/teacher/teacher.service";
import TeacherFormFields from "@/components/form/teacher.form.fields";
import extractTokenInfo from "@/utils/extract.token";
import { ActionType } from "@/cores/constant/constant.history";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import { PersonalType } from "@/services/candidate/candidate-models";
export interface Payloads {}

const TeacherDetail = ({ params }: { params: { teacherId: string } }) => {
  const [teacherData, setTeacherData] = useState<Teacher | any>(); // Initialisé à null plutôt qu'un objet vide
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formFieldsData, setFormFieldsData] = useState<any>();
  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(true);
  const token = getLocalStorageItem("loginAccessToken") || "";
  const tokenInfo: any = extractTokenInfo(token);
  //
  const [userData, setUserData] = useState<PersonalType | any>({});
  const [dataNotFound, setDataNotFound] = useState<boolean>(false);

  /// Modal
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const getTeacherData = async () => {
    const response = await GetTeacherById(params.teacherId);

    if (response.status === 200) {
      setDataNotFound(false);
      setIsLoading(false);
      const teacher: Teacher = response?.data.data;

      setTeacherData(teacher);

      setFormFieldsData({
        username: teacher?.user.username,
        photo: teacher?.user.photo,
      });

      setUserData({ ...teacher.user, workTime: teacher.timeWork });
    } else {
      setDataNotFound(true);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTeacherData();
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
      timeWork,
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
    const teacherData = { timeWork: timeWork };
    const history = {
      action: { name: ActionType.UPDATE_TEACHER },
      user: tokenInfo._id,
      targetId: userData._id,
      entity: "User",
    };
    const response = await EditUserById(user._id, user, history);

    const res = await EditTeacherById(params.teacherId, teacherData);

    if (response.status === 200 && res.status === 200) {
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
                          haveActionButton={true}
                          haveImageProfile={true}
                        >
                          {teacherData ? (
                            <TeacherFormFields
                              fieldsIsDisabled={fieldsIsDisabled}
                              data={teacherData}
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
  );
};

export default TeacherDetail;
