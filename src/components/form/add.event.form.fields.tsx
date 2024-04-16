import { useForm } from "react-hook-form";
import style from "./add.event.form.fields.module.css";
import {
  InputDate,
  InputText,
  InputTime,
} from "../shared/form/input-field/input-field";
import { EventType, eventTypeOption } from "@/services/events/event.interface";
import { InputSelect } from "../shared/form/input-field/input.select";
import { AddButton } from "../button/add-btn";
import { SaveEvent } from "@/services/events/event.service";
import { combineDateTime } from "@/utils/date.utils";
import { HttpStatusCode } from "axios";

export interface SchoolEventFormType {
  name: string;
  description?: string;
  type: EventType;
  isDeleted: boolean;
  startDate: Date;
  endDate: Date;
  startTime?: string;
  endTime?: string;
}

export interface SchoolEventFormFieldsProps {
  onChange: any;
}

const AddEventFormFields: React.FC<SchoolEventFormFieldsProps> = ({
  onChange,
}) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolEventFormType>();

  const name = watch("name");
  const description = watch("description");
  const type = watch("type");
  const starDate = watch("startDate");
  const endDate = watch("endDate");
  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const onSubmit = async (data: any) => {
    let { startDate, startTime, endDate, endTime, ...restOfData } = data;
    const comparingDateToToday = new Date() <= new Date(starDate) && new Date() <= new Date(endDate);
    if (!comparingDateToToday) {
      onChange({
        success: false,
        title: "Erreur",
        message: "Les deux dates doivent être des dates futures",
      });
    }
    else if (startDate > endDate) {
      onChange({
        success: false,
        title: "Erreur",
        message: "Veuillez bien vérifier les deux date",
      });
    } else if (startDate == endDate && startTime >= endTime) {
      onChange({
        success: false,
        title: "Erreur",
        message: "Veuillez bien vérifier l'heure de début et de fin",
      });
    } else {
      startDate = combineDateTime(startDate, startTime);
      endDate = combineDateTime(endDate, endTime);
      const isDeleted = false;
      const eventDataToSubmit = {
        ...restOfData,
        isDeleted,
        startDate,
        endDate,
      };
      const response = await SaveEvent(eventDataToSubmit);
      if (response.status == HttpStatusCode.Created) {
        reset();
        onChange({
          success: true,
          title: "Succès",
          message: "Événement créé avec succès",
        });
      } else {
        onChange({
          success: false,
          title: "Erreur",
          message: "Veuillez contacter le service technique",
        });
      }
    }
  };
  return (
    <>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.formBody}>
            <div className={`${style.colDiv2} ${style.gap4}`}>
              <div>
                <div className={`${style.colDiv1} ${style.my5}`}>
                  <InputText
                    label="Nom"
                    onChange={name}
                    fieldName={"name"}
                    register={register}
                    value={name}
                    readOnly={false}
                  />
                </div>
                <div className={`${style.colDiv1} ${style.my5}`}>
                  <InputSelect
                    label="Type d'évènement"
                    onChange={type}
                    fieldName="type"
                    register={register}
                    optionsValues={eventTypeOption}
                    
                  />
                </div>
              </div>
              <div>
                <div
                  className={`${style.colDivCustom} ${style.my5} ${style.gap0}`}
                >
                  <InputDate
                    label="Date de début"
                    onChange={starDate}
                    fieldName={"startDate"}
                    register={register}
                    value={starDate}
                    onError={errors.startDate}
                  />
                  <InputTime
                    onChange={startTime}
                    label={"Heure de début"}
                    register={register}
                    fieldName={"startTime"}
                    value={startTime}
                    isDisabled={false}
                  />
                </div>
                <div
                  className={`${style.colDivCustom} ${style.my5} ${style.gap0}`}
                >
                  <InputDate
                    label="Date de fin"
                    onChange={endDate}
                    fieldName={"endDate"}
                    register={register}
                    value={endDate}
                    onError={errors.endDate}
                  />
                  <InputTime
                    onChange={endTime}
                    label={"Heure de fin"}
                    register={register}
                    fieldName={"endTime"}
                    value={endTime}
                    isDisabled={false}
                  />
                </div>
              </div>
            </div>
            <div className={`${style.colDiv1} ${style.my2}`}>
              <label className={`${style.textAreaLabel} `}>Description</label>
              <textarea
                readOnly={false}
                {...register("description", {
                  value: description,
                })}
              ></textarea>
            </div>
          </div>
          <div className={style.buttonContent}>
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
        </form>
      </div>
    </>
  );
};

export default AddEventFormFields;
