"use client";

import style from "./edit.section.module.css";
import { useEffect, useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";

interface EditSection<T> {
  title: string;
  subtitle?: string;
  children: any;
  submitService: any;
  redirectLink?: string;
  isLoading: boolean;
  isFullWidthContent?: boolean;
  onChangeDisable: any;
}

const EditSection: React.FC<EditSection<any>> = ({
  title,
  subtitle,
  children,
  submitService,
  isFullWidthContent,
  onChangeDisable,
}) => {
  const methods = useForm<any>({
    defaultValues: {},
  });
  const [message, setMessage] = useState<ErrorMessage>();
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isDisable, setIsDesable] = useState<boolean>(true);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    await submitService(data);
  };

  const onError: SubmitErrorHandler<any> = (error: any) => {
    setIsSuccess(false);
    const firstErrorMessage = Object.keys(error)
      .map((field) => error[field]?.message)
      .find(Boolean);

    setMessage({
      title: "Information incorrect",
      message: firstErrorMessage || "Validation error occurred",
    });
    setIsOpen(true);
  };

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };
  const changeDesable = () => {
    setIsDesable(!isDisable);
  };
  useEffect(() => {
    onChangeDisable(isDisable);
  }, [isDisable]);
  return (
    <>
      {isOpen && (
        <ErrorModal
          close={closeModal}
          message={message}
          light={true}
          color={isSuccess ? "#0fc3ed" : "#dc3545"}
        ></ErrorModal>
      )}
      <section className={style.containerPage}>
        <div className={style.container}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
              <div className={style.title}>{title}</div>
              {subtitle != "" && (
                <div className={style.subtitle}>{subtitle}</div>
              )}
              <div
                className={`${style.content} ${
                  isFullWidthContent ? style.fullWidth : style.widthAuto
                }`}
              >
                {children}
              </div>

              <>
                <div className={style.action}>
                  {isDisable ? (
                    <a
                      type="button"
                      onClick={changeDesable}
                      className={style.editBtn}
                    >
                      Modifier
                    </a>
                  ) : (
                    <>
                      <button type="submit" className={style.saveBtn}>
                        Enregistrer
                      </button>
                      <button
                        type="button"
                        onClick={changeDesable}
                        className={style.editBtn}
                      >
                        Annuler
                      </button>
                    </>
                  )}
                  {}
                </div>
              </>
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
};

export default EditSection;
