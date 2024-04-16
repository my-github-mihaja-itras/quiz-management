"use client";

import genericStyle from "@/styles/generic.form.module.css";
import style from "@/app/validation/validation.module.css";
import { FullButton } from "@/components/button/button";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { UserValidation } from "@/services/validation-service/validation.models";
import { useState } from "react";
import Image from "next/image";
import extractTokenInfo from "@/utils/extract.token";
import {
  validateCandidate,
} from "@/services/validation-service/validation.service";
import { useRouter } from "next/navigation";
import ErrorModal from "@/components/modal/errorModal";
import Loader from "@/components/loader/loader";
import { Login } from "@/services/login/login.models";
import { FilterMenuByPrivileges, UserRedirection } from "@/utils/guard-utils";
import { InputField } from "@/components/shared/form/input-field/input-field";
import { setLocalStorageItem } from "@/utils/localStorage.utils";
import { GetUserPrivilegesNames } from "@/services/privilege/privilege.service";
import { loginService } from "@/services/login/login.service";
import { User } from "@/services/user/user.models";

export interface ValidationToken {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}
export default function AccountValidation({
  params,
}: {
  params: { token: string };
}) {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<UserValidation>();
  const token = params.token;
  const router = useRouter();
  const tokenInfo: any = extractTokenInfo(token);
  const { username, email, id } = tokenInfo;

  const login = watch("login", "");
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const [errorMessage, setErrorMessage] = useState("");

  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [confirmationMessage, setConfirmationMessage] = useState<{}>();

  const onSubmit: SubmitHandler<UserValidation> = async (data) => {
    // const userExist = await checkUsernameCandidate(data.login);

    if (password !== confirmPassword) {
      setErrorMessage(
        "La confirmation du mot de passe est obligatoire et doit être valide."
      );
    } else {
      setIsLoading(true);
      const response: any = await validateCandidate(id, data);
      if (!response) {
        setIsLoading(false);
        setErrorMessage(
          "Le serveur est coupé, Veuillez contacter le service technique."
        );
      } else {
        if (response.status === 200) {
          const userData: Login = {
            login: data.login,
            password: data.password,
          };

          setIsLoading(true);
          const loginResponse = await loginService(userData);

          if (loginResponse.status === 200) {
            const user: User = loginResponse.data.data.user;

            const now = new Date();
            const tomorrowMidnight = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() + 0,
              3,
              0,
              0,
              0
            );
            setLocalStorageItem(
              "loginAccessToken",
              loginResponse.data.data.token
            );
            setLocalStorageItem(
              "loginAccessTokenExpiration",
              tomorrowMidnight.toUTCString()
            );

            const privilegesNames: string[] = await getPrivileges(user._id);
            setLocalStorageItem(
              "menu",
              JSON.stringify(FilterMenuByPrivileges(privilegesNames))
            ); // store the menu filtered in the local storage

            router.push(
              `http://localhost:3002/${UserRedirection(user.username)}`
            );
          }
        } else {
          setErrorMessage("Une erreur est survenu.");
        }
      }
    }
  };

  const getPrivileges = async (userId: string): Promise<string[]> => {
    const result = await GetUserPrivilegesNames(userId);
    return result;
  };

  const onError: SubmitErrorHandler<UserValidation> = (error) => {
    const loginError = error?.login;
    const passwordError = error?.password;
    const confirmPasswordError = error?.confirmPassword;

    if (
      passwordError?.type === "required" ||
      confirmPasswordError?.type === "required" ||
      loginError?.type === "required"
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

  const closeModal = () => {
    router.push("/auth");
  };

  return (
    <>
      {isLoading && <Loader></Loader>}
      {isOpen && (
        <ErrorModal
          close={closeModal}
          color={"#0FC3ED"}
          message={confirmationMessage}
        ></ErrorModal>
      )}
      <div className={style.container}>
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
          <>
            <div className={genericStyle.formContainer}>
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className={`${genericStyle.formHeader} ${style.header}`}>
                  Création de votre identifiant de connexion et mot de passe
                </div>
                <div className={genericStyle.formContent}>
                  <InputField
                    label="Nouvel identifiant IC"
                    type="text"
                    onChange={username}
                    errors={errors?.login && errors?.login?.type}
                    register={register("login", {
                      required: "champs requis",
                      value: username,
                    })}
                    readOnly={true}
                  />
                  <InputField
                    label="Nouveau mot de passe"
                    type="password"
                    errors={errors.password && errors.password?.type}
                    onChange={password}
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
                    type="password"
                    onChange={confirmPassword}
                    errors={
                      errors.confirmPassword && errors.confirmPassword?.type
                    }
                    register={register("confirmPassword", {
                      required: "champs requis",
                    })}
                  />
                </div>

                <div className={genericStyle.formMessage}>
                  {errorMessage && errorMessage}
                </div>

                <div className={genericStyle.formSubmit}>
                  <FullButton type="submit">SUIVANT</FullButton>
                </div>
              </form>
            </div>
          </>
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
      </div>
    </>
  );
}
