"use client";

import genericStyle from "@/styles/generic.form.module.css";
import { FullButton } from "@/components/button/button";
import style from "./auth.module.css";

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { Login } from "@/services/login/login.models";
import { loginService } from "@/services/login/login.service";

import { useRouter } from "next/navigation";
import Loader from "@/components/loader/loader";
import { FilterMenuByPrivileges, UserRedirection } from "@/utils/guard-utils";
import { CountextType, Privileges } from "@/context/privileges.context";
import { InputField } from "@/components/shared/form/input-field/input-field";
import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage.utils";
import { User } from "@/services/user/user.models";
import { GetUserPrivilegesNames } from "@/services/privilege/privilege.service";
import { ServerResponse } from "@/cores/constant/response.constant";
import { HttpStatusCode } from "axios";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<Login>();

  const login = watch("login", "");
  const password = watch("password", "");
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLink, setIsLink] = useState(false);

  // context that store the privileges values
  const { privilegesContext, setPrivilegesContext }: CountextType =
    useContext(Privileges);

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const onSubmit: SubmitHandler<Login> = async () => {
    const userData: Login = {
      login: login,
      password: password,
    };

    setIsLoading(true);
    const response: ServerResponse = await loginService(userData);

    if (response.status === HttpStatusCode.Ok) {
      const user: User = response.data.data.user;

      if (!user.isActive) {
        removeLocalStorageItem("loginAccessToken");
        setIsLink(true);
        const reactivePath = "/password-reset/reactivation";
        setIsLoading(false);
        setErrorMessage(
          `Votre compte a été temporairement désactivé en raison d'un nombre excessif de tentatives de connexion. Pour réactiver votre compte, veuillez cliquer sur <a className="${genericStyle.link}" href="${reactivePath}">ce lien</a> .`
        );
        const failedCount = user.failedConnectionCount;
        if (failedCount && failedCount >= 5) {
          setErrorMessage(
            `Votre compte a été temporairement désactivé en raison d'un nombre excessif de tentatives de connexion. Pour réactiver votre compte, veuillez cliquer sur <a className="${genericStyle.link}" href="${reactivePath}">ce lien</a> .`
          );
        }
      } else {
        const failedCount = user.failedConnectionCount;
        if (failedCount && failedCount >= 5) {
        }
        // setIsLoading(false);
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
        setLocalStorageItem("loginAccessToken", response.data.data.token);
        setLocalStorageItem(
          "loginAccessTokenExpiration",
          tomorrowMidnight.toUTCString()
        );

        const privilegesNames: string[] = await getPrivileges(user._id);

        // privileges value setter
        if (privilegesNames) {
          setPrivilegesContext(["this", "this", "this"]);
        }

        setLocalStorageItem(
          "menu",
          JSON.stringify(FilterMenuByPrivileges(privilegesNames))
        ); // store the menu filtered in the local storage

        router.push(UserRedirection(user.username));
      }
    } else if (response.status === 401) {
      setIsLoading(false);
      removeLocalStorageItem("loginAccessToken");
      setError("password", { type: "custom", message: "custom message" });
      setError("login", { type: "custom", message: "custom message" });
      setErrorMessage(
        "Vos identifiants sont incorrects. Réessayez ou cliquez sur “Mot de passe oublié” pour les réinitialiser."
      );
    } else {
      setErrorMessage(
        "Une erreur s'est produite. Veuillez réessayer plus tard."
      );
    }
  };

  const getPrivileges = async (userId: string): Promise<string[]> => {
    const result = await GetUserPrivilegesNames(userId);
    return result;
  };

  const onError: SubmitErrorHandler<Login> = (error) => {
    const loginError = error?.login;
    const passwordError = error?.password;
    setIsLoading(false);
    if (passwordError?.type === "required" || loginError?.type === "required") {
      setErrorMessage("Veuillez remplir tous les champs correctement.");
    }
  };
  return (
    <>
      <div className={genericStyle.formContainer}>
        {isLoading && <Loader></Loader>}
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={`${genericStyle.formHeader} ${style.header}`}>
            Welcome Innovator !
          </div>
          <div className={genericStyle.formContent}>
            <InputField
              label="Identifiant IC ou adresse e-mail"
              type="text"
              onChange={login}
              errors={errors?.login && errors?.login?.type}
              register={register("login", {
                required: "champs requis",
              })}
            />
            <InputField
              label="Mot de passe"
              type="password"
              onChange={password}
              errors={errors.password && errors.password?.type}
              register={register("password", {
                required: "champs requis",
              })}
            />
          </div>

          <div className={genericStyle.formMessage}>
            {errorMessage && (
              <div dangerouslySetInnerHTML={{ __html: errorMessage || "" }} />
            )}
          </div>

          <div className={genericStyle.formSubmit}>
            <FullButton>SE CONNECTER</FullButton>
          </div>
          <div className={genericStyle.texteCenter}>
            <a href={"/password-reset"}>Mot de passe oublié ?</a>
          </div>
        </form>
      </div>
    </>
  );
}
