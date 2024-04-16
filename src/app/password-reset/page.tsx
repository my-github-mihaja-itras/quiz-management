"use client";

import genericStyle from "@/styles/generic.form.module.css";
import { FullButton } from "@/components/button/button";
import style from "@/app/password-reset/password-reset.module.css";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useState } from "react";

import { useRouter } from "next/navigation";
import {
  PasswordRequestResetDto,
  PasswordResetDto,
} from "@/services/password-reset/password-reset.models";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import Image from "next/image";
import Loader from "@/components/loader/loader";
import { InputField } from "@/components/shared/form/input-field/input-field";
import { passwordResetRequest } from "@/services/password-reset/password-reset.service";

export default function PasswordRequestReset() {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<PasswordRequestResetDto>();

  const email = watch("email", "");
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bol, setBol] = useState<boolean>(false);

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const onSubmit: SubmitHandler<PasswordRequestResetDto> = async () => {
    const passwordReqData: PasswordRequestResetDto = {
      email: email,
    };

    const response = await passwordResetRequest(passwordReqData);
    setIsLoading(true);
    if (response.status === 200) {
      const token = response.data.data;
      setIsLoading(false);
      if (token !== null) {
        clearErrors("email");
        setIsOpen(true);
        setBol(true);
        setMessage({
          title: "Lien de réinitialisation envoyé",
          message:
            "Un e-mail va bientôt vous être envoyé afin de vous permettre de réinitialiser votre mot de passe",
        });
      } else {
        setIsLoading(false);
        setErrorMessage(
          "L'adresse e-mail que vous avez fournie est introuvable. Veuillez la vérifier s'il vous plait. Merci."
        );
      }
    } else if (response.status === 401) {
      setIsLoading(false);
      setErrorMessage(
        "Une erreur est survenue. Veuillez réessayez ou contactez le service technique."
      );
    } else {
      setIsLoading(false);
      setErrorMessage(
        "Une erreur est survenue. Veuillez réessayez ou contactez le service technique."
      );
    }
  };

  const onError: SubmitErrorHandler<PasswordRequestResetDto> = (error) => {
    const emailError = error?.email;

    if (emailError?.type === "required") {
      setErrorMessage("Veuillez remplir tous les champs correctement.");
    }
  };

  return (
    <>
      <div className={style.container}>
        {isLoading && <Loader></Loader>}
        {isOpen && (
          <ErrorModal
            close={closeModal}
            message={message}
            light={true}
            color={"#0FC3ED"}
            success={bol}
            link={"http://localhost:3002/auth"}
          ></ErrorModal>
        )}
        <div className={style.left}>
          <Image
            className={style.logo}
            src="/resources/logo.png"
            alt="logo"
            width={237}
            height={65}
            objectFit="cover"
          />
          <div className={style.backgroundMobile}>
            <Image
              src="/resources/authentificationMobile.png"
              alt="Image"
              className={style.image}
              width={1000}
              height={1000}
              objectFit="cover"
            />
          </div>

          <div className={genericStyle.formContainer}>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div className={genericStyle.formHeader}>
                Mot de passe oublié ?
              </div>
              <div className={genericStyle.textInfo}>
                Veuillez saisir votre email de connexion afin de recevoir le
                lien de réinitialisation de votre mot de passe.
              </div>
              <div className={`${genericStyle.formContent}`}>
                <InputField
                  label="Adresse e-mail"
                  onChange={email}
                  type="email"
                  errors={errors?.email && errors?.email?.type}
                  register={register("email", {
                    required: "champs requis",
                  })}
                />
              </div>

              <div className={genericStyle.formMessage}>
                {errorMessage && (
                  <div
                    dangerouslySetInnerHTML={{ __html: errorMessage || "" }}
                  />
                )}
              </div>

              <div className={genericStyle.formSubmit}>
                <FullButton>RECEVOIR LE LIEN</FullButton>
              </div>
            </form>
          </div>
        </div>
        <div className={style.right}>
          <Image
            src="/resources/background.png"
            alt="Image"
            className={style.image}
            width={1000}
            height={1000}
            objectFit="cover"
          />
        </div>
      </div>{" "}
    </>
  );
}
