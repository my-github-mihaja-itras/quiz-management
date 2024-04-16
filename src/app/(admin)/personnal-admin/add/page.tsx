"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import AddUserFormFields from "@/components/form/add.user.form.fields";
import AddSection from "@/components/shared/add-section/add.section.component";
import { saveUsers, checkUserDuplication } from "@/services/user/user-service";
import ProfileImageUpload from "@/components/uploadFile/profile.image.upload";
import style from "./add.module.css";
import { getCount } from "@/services/count/count.service";
import { createUserDto, posteOption } from "@/services/user/user.models";
import { createAdministrationDto } from "@/services/administration/administration.model";
import { createTeacherDto } from "@/services/teacher/teacher.models";
import { saveAdministrationUser } from "@/services/administration/administration.service";
import { saveTeacher } from "@/services/teacher/teacher.service";
import { Group } from "@/services/group/group.models";
import { getAllGroups } from "@/services/group/group.service";

const administrationAdd = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formFieldsData, setFormFieldsData] = useState<any>();

  /// Modal
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();
  const [photo, setPhoto] = useState<string>();
  const [defaultGroupsOptions, setDefaultGroupsOptions] = useState<Group[]>([]);
  const [defaultUsername, setDefaultUsername] = useState<string>("");


  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const loadGroup = async () => {
    const groupsRes = await getAllGroups();
    const groups = groupsRes?.data;


    setDefaultGroupsOptions(groups?.filter((groups: { name: string;alias:string; })=>(groups.alias==="ADM")));
  }
  const loadUsername = async ()=>{
    const countsRes = await getCount();
    const usernameCount = countsRes?.data.data;
    const paddedSuffix = String((usernameCount.countAdministrationValue + 1)).padStart(4, '0');
    const formattedUsername = `ADM-${paddedSuffix}`;
    setDefaultUsername(formattedUsername);
  }

  const PersonalSubmitService = async (data: any) => {
    const userData: any = {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        address: data.address,
        birthDate: data.birthDate,
        birthPlace: data.birthPlace,
        password1: data.password1,
        password2: data.password2,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        poste: data.poste,
        photo: photo,
        groups: data.groups,
        roles: data.roles,
        isActive: data.isActive,
        creationDate: new Date().toDateString(),
    };

    if (
        userData.phone.length < 1 ||
        userData.groups.length < 1 ||
        userData.roles.length < 1
    ) {
        setIsSuccess(false);
        setMessage({
            title: "Oups !",
            message: "Tous les champs sont obligatoires",
        });
        setIsLoading(false);
        setIsOpen(true);
    } else if (userData.password1 !== userData.password2) {
        setIsSuccess(false);
        setMessage({
            title: "Oups !",
            message: "Les mots de passe sont différents",
        });
        setIsLoading(false);
        setIsOpen(true);
    } else {
        setFormFieldsData({
            username: data.username,
            photo: data.photo,
        });
        const userDataToInsert: createUserDto = {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            address: data.address,
            birthDate: data.birthDate,
            birthPlace: data.birthPlace,
            password: data.password1,
            email: data.email,
            gender: data.gender,
            phone: data.phone,
            photo: photo,
            groups: data.groups,
            roles: data.roles,
            isActive: data.isActive,
            creationDate: new Date().toDateString(),
        };
        const isDuplicated = await checkUserDuplication(userDataToInsert);

        if (isDuplicated) {
            setIsSuccess(false);
            setMessage({
                title: "Oups !",
                message: "Cette adresse email est déjà utilisée. Veuillez utiliser une autre adresse email.",
            });
            setIsLoading(false);
            setIsOpen(true);
        } else {
            setIsSuccess(true);
            const response = await saveUsers(userDataToInsert);

            if (response.statusText === "Created") {
                const administrationData: createAdministrationDto = {
                    user: response.data.data._id,
                    position: data.poste
                }
                const postResponse = await saveAdministrationUser(administrationData);
                if (postResponse.statusText === "Created") {
                    setIsSuccess(true);
                    setMessage({
                        title: "Succès",
                        message: "Utilisateur créé avec succès en tant que personnel administratif.",
                    });
                    setIsOpen(true);
                    loadUsername()
                }
            }
        }
    }
};

  useEffect(()=>{
    loadGroup()
    loadUsername()
  },[])
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
      <div className={style.addSection}>
        <AddSection
          title={"Utilisateurs"}
          subtitle={"Ajout utilisateur"}
          redirectLink={"/add"}
          isLoading={false}
          submitService={PersonalSubmitService}
        >
          <div className={style.formContainer}>
            <div className={style.imageContainer}>
              <center>
                <ProfileImageUpload
                  readOnly={false}
                  onUploaded={(uploadedData: { file: any }) =>
                    setPhoto(uploadedData.file)
                  }
                  defaultValue={"defaultPdp.jpg"}
                />
              </center>
            </div>
            {defaultGroupsOptions.length>0 && (<AddUserFormFields
              defaultGroupOption={defaultGroupsOptions}
              posteCategory={posteOption[0]}
              defaultUsername={defaultUsername}
            />
            )}
          </div>
        </AddSection>
      </div>
    </div>
  );
};

export default administrationAdd;
