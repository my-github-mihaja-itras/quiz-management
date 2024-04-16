"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./addSession.module.css";
import {
  InputDate,
  InputSwitch,
  InputTime,
} from "../form/input-field/input-field";
import { useEffect, useState } from "react";

import { InputSelectWithCheckBox } from "../form/input-field/input.select";
import { getAllEducationalClasses } from "@/services/educational-classes/educational-classes-service";
import { HttpStatusCode } from "axios";
import { EducationalClasses } from "@/services/educational-classes/educational-classes.models";
import { Course } from "@/services/course/course.model";
import { customInputSelectStyle } from "../form/input-field/input.select.constant";
import { ActionType, EntityName } from "@/cores/constant/constant.history";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import { EditSessionType, Session } from "@/services/session/session.model";
import {
  GetOccupiedClassesByCourseId,
  SaveSession,
  editSessionById,
} from "@/services/session/session.service";
import {
  CompareTimeMessageType,
  checkSessionConflict,
  compareTime,
} from "@/utils/date.utils";
import { editCourseById } from "@/services/course/course.service";

export interface SessionType {
  date: Date;
  isExam: boolean;
  start: any;
  end: any;
  occupiedClasses?: string[];
}

export interface SessionFormProps {
  courseId: string;
  courseData: Course;
  onAddedStatus: any;
  editSessionData?: EditSessionType;
}

export const SessionForm = ({
  courseId,
  courseData,
  onAddedStatus,
  editSessionData,
}: SessionFormProps) => {
  const [isExam, setIsExam] = useState<boolean>(
    editSessionData?.isExam ?? false
  );

  const token = getLocalStorageItem("loginAccessToken") || "";
  const tokenInfo: any = extractTokenInfo(token);
  const courseSession = courseData.session.map((session) => session._id);


  const [educationalClassesOption, setEducationalClassesOption] = useState<
    any[]
  >([]);

  // State for selectedOptions
  const [selectedOptions, setSelectedOptions] = useState([]);

  // educationalCLasses list option
  const loadEducationalClassesOption = async () => {
    const response = await getAllEducationalClasses();

    if (response.status === HttpStatusCode.Ok) {
      const educationalClasses: EducationalClasses[] = response.data.data;

      const educationalClassesFiltered: any = educationalClasses.filter(
        (educationalClass) => {
          return educationalClass.flattedCourseSelection.includes(courseId);
        }
      );

      setEducationalClassesOption(
        educationalClassesFiltered.map(
          (educationalClasse: EducationalClasses) => {
            return {
              label: educationalClasse.name,
              value: educationalClasse._id,
              alias: educationalClasse.name,
            };
          }
        )
      );

      setSelectedOptions(
        educationalClassesFiltered.map(
          (educationalClasse: EducationalClasses) => {
            return {
              label: educationalClasse.name,
              value: educationalClasse._id,
              alias: educationalClasse.name,
            };
          }
        )
      );
    }
  };

  // Handle select Option results
  const handleSelectedOption = (selectedOptions: any) => {
    setSelectedOptions(selectedOptions);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    resetField,
    watch,
    getValues,
    setError,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<SessionType>();
  const sessionDate = watch("date");

  const start = watch("start");

  const end = watch("end");

  const onSubmit: SubmitHandler<any> = async (data) => {
    const occupiedClasses = [
      ...selectedOptions.map((classe: any) => {
        return classe.value;
      }),
    ];
    const sessions = { ...data, occupiedClasses };

    const response = await GetOccupiedClassesByCourseId(courseId);

    if (response.status === HttpStatusCode.Ok) {
      const courseSessionId = courseData.session.map((session) => session._id);
      const newSession = {
        date: sessionDate,
        start: start,
        end: end,
      };
      const sessionsData = editSessionData
        ? courseData.session.filter((e) => e._id !== editSessionData?._id)
        : response.data.data.sessions;
      const sessionIsOnConflit = checkSessionConflict(newSession, sessionsData);

      if (sessionIsOnConflit) {
        onAddedStatus({
          success: false,
          message: {
            title: "Erreur",
            message: "Une séance est déjà prévue à cet intervalle d'heure.",
          },
        });
      } else {
        const dateTimeString = sessionDate + " " + start;
        const sessionDateTime = new Date(dateTimeString);
        const comparingTime = compareTime(start, end);
        const comparingDateToToday = new Date() <= new Date(sessionDateTime);
        if (!comparingTime.error && comparingDateToToday === true) {
          if(editSessionData){
            const response = await editSessionById(editSessionData._id,sessions);
            setIsExam(false);
            setSelectedOptions([]);
            reset();
    
            const sessionId = response.data.data._id;
            const sessionData = [...courseSession, sessionId];
            const session = { session: sessionData };
            console.log(sessionData);
            
            if (response.status === HttpStatusCode.Ok) {
              onAddedStatus({
                success: true,
                message: {
                  title: "Séance modifiée",
                  message: "La séance a été modifiée avec succès.",
                },
              });
            } else {
              onAddedStatus({
                success: false,
                message: {
                  title: "Erreur",
                  message: "Une erreur c'est produit lors de la modification.",
                },
              });
            } 
          } else{
          const response = await SaveSession(sessions);
          setIsExam(false);
          reset();

          const sessionId = response.data.data._id;
          const sessionData = [...courseSessionId, sessionId];
          const session = { session: sessionData };
          if (response.status === HttpStatusCode.Created) {
            const history = {
              action: { name: ActionType.UPDATE_COURSE },
              user: tokenInfo._id,
              targetId: courseId,
              entity: EntityName.COURSE,
            };
            const courseUpdateDate = { course: session, history };
            const sessionResponse = await editCourseById(
              courseId,
              courseUpdateDate
            );
            onAddedStatus({
              success: true,
              message: {
                title: "Séance ajoutée",
                message: "La séance a été ajoutée avec succès.",
              },
            });
          } else {
            onAddedStatus({
              success: false,
              message: {
                title: "Erreur",
                message: "Une erreur c'est produit lors de l'ajout.",
              },
            });
          }
        } 
        } else if (
          comparingTime.error &&
          comparingTime.type === CompareTimeMessageType.MIN
        ) {
          onAddedStatus({
            success: false,
            message: {
              title: "Erreur",
              message: "L'heure d'une séance doit être minimum une heure.",
            },
          });
        } else if (comparingDateToToday === false) {
          onAddedStatus({
            success: false,
            message: {
              title: "Erreur",
              message: "La date ou l'heure que vous entrez est déjà passé.",
            },
          });
        } else if (
          comparingTime.error &&
          comparingTime.type === CompareTimeMessageType.MAX
        ) {
          onAddedStatus({
            success: false,
            message: {
              title: "Erreur",
              message:
                "L'heure de début doit être plus petit que l'heure de fin.",
            },
          });
        } else if (
          comparingTime.error &&
          comparingTime.type === CompareTimeMessageType.EQUAL
        ) {
          onAddedStatus({
            success: false,
            message: {
              title: "Erreur",
              message:
                "L'heure de début et l'heure de fin doit être different.",
            },
          });
        } else if (
          comparingTime.error &&
          comparingTime.type === CompareTimeMessageType.OVER
        ) {
          onAddedStatus({
            success: false,
            message: {
              title: "Erreur",
              message:
                "L'heure de début et l'heure de fin doit être dans l'horaire de travail.",
            },
          });
        }
      }
    } else {
      onAddedStatus({
        success: false,
        message: {
          title: "Erreur",
          message: "Une erreur c'est produit lors de l'ajout.",
        },
      });
    }
  };

  useEffect(() => {
    loadEducationalClassesOption();
  }, []);

  const handleToggleChange = (isChecked: boolean) => {
    setIsExam(isChecked);
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formBody}>
          <div className={style.title}>
            {editSessionData ? "Modifier séance" : "Ajout séance"}
          </div>
          <div className={style.courseTitle}>
            {courseData && courseData.name}
          </div>
          <div>
            <div className={`${style.colDiv1} ${style.my5}`}>
              <InputDate
                label={"Date du séance"}
                onChange={sessionDate}
                fieldName={"date"}
                register={register}
                value={editSessionData?.date || sessionDate}
              />
            </div>
            <div className={`${style.colDiv2} ${style.my5}  ${style.gap1}`}>
              <InputTime
                onChange={start}
                label={"Heure de début"}
                register={register}
                fieldName={"start"}
                value={editSessionData?.start || start}
                isDisabled={false}
              />
              <InputTime
                onChange={end}
                label={"Heure de fin"}
                register={register}
                fieldName={"end"}
                value={editSessionData?.end || end}
              />
            </div>
          </div>
          <div>
            <div className={`${style.colDiv1} ${style.my5}`}>
              <InputSwitch
                label={"Examen"}
                register={register}
                fieldName={"isExam"}
                isChecked={isExam}
                handleChange={handleToggleChange}
                checkedValue={isExam ? "Oui" : "Non"}
              />
            </div>
            <div className={`${style.colDiv1}  ${style.inputCustom}`}>
              <label className={style.placeholder}>Participants</label>
              <InputSelectWithCheckBox
                defaultValue={[]}
                options={educationalClassesOption}
                selectedValue={selectedOptions}
                onSelectedOption={handleSelectedOption}
                isDisabled={false}
                required={true}
                styles={customInputSelectStyle}
              />
            </div>
          </div>
        </div>
        <div className={style.btnAction}>
          <button className={style.btn}>
            {editSessionData ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
};
