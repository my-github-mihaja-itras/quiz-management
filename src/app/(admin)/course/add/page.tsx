"use client";

import AddCourseForm from "@/components/form/add.form.course.component";
import style from "./add.module.css";
import Loader from "@/components/loader/loader";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import AddSection from "@/components/shared/add-section/add.section.component";
import { createCourseDto } from "@/services/course/course.model";
import { saveCourse } from "@/services/course/course.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HttpStatusCode } from "axios";
import { ServerResponse } from "@/cores/constant/response.constant";

const courseAdd = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /// Modal
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();

  const router = useRouter();

  const closeModal = (value: boolean) => {
    setIsOpen(value);
    if (isSuccess) {
      router.push("/course");
    }
  };

  const courseSubmitService = async (data: any) => {
    const courseData: createCourseDto = {
      name: data.name,
      code: data.code,
      teacher: data.teacher,
      semester: data.semester,
      session: [],
    };
    const response: ServerResponse = await saveCourse(courseData);

    if (response.status === HttpStatusCode.Created) {
      setIsSuccess(true);
      setMessage({
        title: "Succès",
        message: "Cours créé avec succès",
      });
      setIsOpen(true);
    } else {
      setIsSuccess(false);
      setMessage({
        title: "Erreur",
        message: "Veuillez bien verifier vos informations",
      });
      setIsOpen(true);
    }
  };

  return (
    <>
      {isLoading && <Loader></Loader>}
      {isOpen && (
        <ErrorModal
          close={closeModal}
          message={message}
          light={true}
          color={isSuccess ? "#0fc3ed" : "#dc3545"}
        ></ErrorModal>
      )}
      <div className={style.addSection}>
        <AddSection
          title="Cours"
          isLoading={false}
          submitService={courseSubmitService}
          subtitle="Ajout Cours"
        >
          <div className={style.formContainer}>
            <AddCourseForm />
          </div>
        </AddSection>
      </div>
    </>
  );
};
export default courseAdd;
