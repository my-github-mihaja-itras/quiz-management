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
import {
  passwordResetRequest,
  resetPassword,
} from "@/services/password-reset/password-reset.service";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import Image from "next/image";
import Loader from "@/components/loader/loader";
import { InputField } from "@/components/shared/form/input-field/input-field";

export default function PasswordReset({
  params,
}: {
  params: { token: string };
}) {
  interface PasswordReset {
    token: string;
    password: string;
    confirmPassword: string;
  }
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<PasswordReset>();

  const token = params.token;

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bol, setBol] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const onSubmit: SubmitHandler<PasswordResetDto> = async () => {
    const passwordResData: PasswordResetDto = {
      token: token,
      password: password,
    };

    if (password !== confirmPassword) {
      setErrorMessage(
        "La confirmation du mot de passe est obligatoire et doit être valide."
      );
    } else {
      setErrorMessage("");
      const response = await resetPassword(passwordResData);
      setIsLoading(true);
      if (response.status === 500) {
        setIsLoading(false);
        setErrorMessage(
          "La lien que vous avez cliqué est expirée ou invalide. Veuillez réessayez ou contactez le service technique."
        );
      } else if (response.status === 200) {
        setIsLoading(false);
        clearErrors("password");
        setBol(true);
        setIsOpen(true);
        setMessage({
          title: "Mot de passe réinitialisé",
          message: "Veuillez vous reconnecter pour accéder à votre compte.",
        });
      } else {
        setIsLoading(false);
        setErrorMessage(
          "Une erreur est survenue. Veuillez réessayez ou contactez le service technique."
        );
      }
    }
  };

  const onError: SubmitErrorHandler<PasswordReset> = (error) => {
    const passwordError = error?.password;
    const passwordConfirmError = error?.confirmPassword;

    if (
      passwordError?.type === "required" ||
      passwordConfirmError?.type === "required"
    ) {
      setErrorMessage("Veuillez remplir tous les champs correctement.");
    }
    if (
      passwordError?.type === "minLength" ||
      passwordError?.type === "pattern"
    ) {
      setErrorMessage(
        "Le nouveau mot de passe doit comporter au moins huit caractères, une lettre majuscule, un chiffre et un caractère spécial de type : '-!\"#$%&()*,./:;?@[]^_`{|}~+<=>"
      );
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
                Changez votre mot de passe
              </div>

              <div className={genericStyle.formContent}>
                <InputField
                  label="Nouveau mot de passe"
                  onChange={password}
                  type="password"
                  errors={errors.password && errors.password?.type}
                  register={register("password", {
                    required: "champs requis",
                    minLength: {
                      value: 8,
                      message:
                        "Le mot de passe doit comporter au moins huit caractères",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+={}[\]:;<>,.?~])/,
                      message:
                        "Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial parmi [-!\"#$%&'()*+,./:;<=>?@[\\]^_`{|}~]",
                    },
                  })}
                />
                <InputField
                  label="Confirmation du mot de passe"
                  onChange={confirmPassword}
                  type="password"
                  errors={
                    errors.confirmPassword && errors.confirmPassword?.type
                  }
                  register={register("confirmPassword", {
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
                <FullButton>RÉINITIALISER</FullButton>
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
