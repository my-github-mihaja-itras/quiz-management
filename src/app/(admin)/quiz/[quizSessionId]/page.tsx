"use client";

import StudentFormFields from "@/components/form/student.form.fields";
import Loader from "@/components/loader/loader";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import CourseTab from "@/components/shared/courseTab/courseTab.component";
import DetailsSection from "@/components/shared/details-section/details.section.components";
import Details from "@/components/shared/details/details.components";
import FormFieldsEditable from "@/components/shared/form-fields/form.fields.components";
import Tabs from "@/components/shared/tabs/tabs.components";
import { ActionType } from "@/cores/constant/constant.history";
import UseWindowSize from "@/cores/window/window.size";
import { CoursSelection } from "@/services/educational-classes/educational-classes.models";
import { Student } from "@/services/student/student.models";
import { GetStudentById } from "@/services/student/student.service";
import { EditTeacherById } from "@/services/teacher/teacher.service";
import { EditUserById } from "@/services/user/user-service";
import extractTokenInfo from "@/utils/extract.token";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import { useEffect, useState } from "react";
import { Session } from "@/services/session/session.model";
import { getSessionByClassId } from "@/services/session/session.service";
import { getAllCourse } from "@/services/course/course.service";
import { ServerResponse } from "@/cores/constant/response.constant";
import { HttpStatusCode } from "axios";

const StudentDetail = ({ params }: { params: { studentId: string } }) => {
  const [studentData, setStudentData] = useState<Student | any>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formFieldsData, setFormFieldsData] = useState<any>();
  const [fieldsIsDisabled, setFieldsIsEditable] = useState<boolean>(true);

  //
  const [userData, setUserData] = useState<Student | any>({});
  const [dataNotFound, setDataNotFound] = useState<boolean>(false);
  const [allCourseData, setAllCourseData] = useState<CoursSelection[] | any>();
  const token = getLocalStorageItem("loginAccessToken") || "";
  const tokenInfo: any = extractTokenInfo(token);

  /// Modal
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();

  const closeModal = (value: boolean) => {
    setIsOpen(value);
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
    getStudentData();
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

  const courseColumn = [
    {
      name: "Unité Enseignement",
      selector: (row: CoursSelection) => row?.label,
      maxWidth: screenSize.width < 1000 ? "110px" : "300px",
      sortable: true,
      cell: (row: CoursSelection) => {
        const label = row?.label;
        return <div>{label}</div>;
      },
    },
    {
      name: "Crédit",
      selector: (row: CoursSelection) => row?.credit,
      maxWidth: screenSize.width < 1000 ? "110px" : "300px",
      sortable: true,
      cell: (row: CoursSelection) => {
        const credit = row?.credit;
        return <div>{credit.toString()}</div>;
      },
    },
    {
      name: "Cours",
      selector: (row: CoursSelection) => row?.courses,
      maxWidth: screenSize.width < 1000 ? "110px" : "300px",
      sortable: true,
      cell: (row: CoursSelection) => {
        const studentCourseIds = studentData?.registratedCourse?.map(
          (course: { course: any }) => course.course._id
        );
        const obligatoryCourse =
          studentData?.educationalClasses?.courseSelection.map(
            (course: { courses: any }) => {
              if (course.courses.length === 1) {
                return course.courses[0]._id;
              }
            }
          );
        const courseName = row?.courses
          .map((course) => {
            if (
              studentCourseIds?.includes(course._id) === true ||
              obligatoryCourse?.includes(course._id) === true
            ) {
              return course.name;
            }
          })
          .filter((course) => course !== undefined);
        return (
          <div
            style={
              courseName[0] !== undefined
                ? {}
                : { color: "red", fontSize: "13px" }
            }
          >
            {courseName[0] !== undefined ? courseName : "Non sélectionné"}
          </div>
        );
        // return <div>{allcourse}</div>
      },
    },
  ];

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
        )}
      </DetailsSection>
    </>
  );
};

export default StudentDetail;
