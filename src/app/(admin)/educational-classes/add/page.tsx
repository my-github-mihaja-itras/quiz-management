"use client";
import React, { useState } from "react";
import Loader from "@/components/loader/loader";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import AddSection from "@/components/shared/add-section/add.section.component";
import style from "./add.module.css";
import { SaveEducationalClasses } from "@/services/educational-classes/educational-classes-service";
import { useRouter } from "next/navigation";
import EducationalClassesFormFields from "@/components/form/educational-classes.form.fields";
import { EducationalClasses } from "@/services/educational-classes/educational-classes.models";

const EducationalClassesAdd = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /// Modal
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();

  const router = useRouter();

  const closeModal = (value: boolean) => {
    setIsOpen(value);
    if (isSuccess) {
      router.push("/educational-classes");
    }
  };

  const EducationalClassesSubmitService = async (data: any) => {
    const {
      courseSelection,
      schoolYearStart,
      schoolYearEnd,
      ...restOfData
    }: EducationalClasses = data;

    if (Number(schoolYearStart) >= Number(schoolYearEnd)) {
      setIsSuccess(false);
      setMessage({
        title: "Erreur",
        message: "L'année de début doit être plus petit que l'année de fin.",
      });
      setIsOpen(true);
    } else {
      const schoolYear = `${schoolYearStart}-${schoolYearEnd}`;

      const flattedCourseSelection = courseSelection.flatMap((item) =>
        item.courses.map((course) => course._id)
      );

      const formattedData = {
        ...restOfData,
        courseSelection,
        schoolYear,
        flattedCourseSelection,
      };

      const response = await SaveEducationalClasses(formattedData);
      if (response.statusText === "Created") {
        setIsSuccess(true);
        setMessage({
          title: "Succès",
          message: "La classe a été créée avec succès",
        });
        setIsOpen(true);
      } else {
        setIsSuccess(false);
        setMessage({
          title: "Information incorrect",
          message: "Veuillez bien verifier tous les informations",
        });
        setIsOpen(true);
      }
    }
  };
  return (
    <div className={style.container}>
      {isLoading && <Loader></Loader>}
      {isOpen && (
        <ErrorModal
          close={closeModal}
          message={message}
          light={true}
          color={isSuccess ? "#0fc3ed" : "#dc3545"}
        ></ErrorModal>
      )}
      <div>
        <AddSection
          title={"Classe"}
          subtitle="Ajout classe"
          redirectLink={"/add"}
          isLoading={false}
          submitService={EducationalClassesSubmitService}
        >
          <div className={style.formContainer}>
            <EducationalClassesFormFields fieldIsDisable={false} />
          </div>
        </AddSection>
      </div>
    </div>
  );
};

export default EducationalClassesAdd;
