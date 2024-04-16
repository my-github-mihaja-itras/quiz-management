"use client";

import style from "./add.section.module.css";
import { useState } from "react";
import { AddButton } from "@/components/button/add-btn";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";

interface AddSection<T> {
  title: string;
  subtitle?: string;
  children: any;
  submitService: any;
  redirectLink?: string;
  isLoading: boolean;
  isDisableAdd?: boolean;
  isFullWidthContent?: boolean;
}

const AddSection: React.FC<AddSection<any>> = ({
  title,
  subtitle,
  children,
  submitService,
  isDisableAdd,
  isFullWidthContent,
}) => {
  const methods = useForm<any>({
    defaultValues: {},
  });
  const [message, setMessage] = useState<ErrorMessage>();
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    await submitService(data);
  };

  const onError: SubmitErrorHandler<any> = (error: any) => {
    setIsSuccess(false);
    const firstErrorMessage = Object.keys(error).map(field => error[field]?.message).find(Boolean);
    
    setMessage({
      title: "Information incorrect",
      message: firstErrorMessage || "Validation error occurred",
    });
    setIsOpen(true);
  };
  
  

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

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
             {subtitle!="" && <div className={style.subtitle}>{subtitle}</div>}
              <div
                className={`${style.content} ${
                  isFullWidthContent ? style.fullWidth : style.widthAuto
                }`}
              >
                {children}
              </div>
              {isDisableAdd ? (
                <></>
              ) : (
                <div className={style.btnlayout}>
                  <div className={style.btnContainer}>
                    <AddButton
                      colors="#0FC3ED"
                      height={"46px"}
                      width={"200px"}
                      fontSize={"14px"}
                      uppercase={false}
                    >
                      Ajouter
                    </AddButton>
                  </div>
                </div>
              )}
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
};

export default AddSection;
