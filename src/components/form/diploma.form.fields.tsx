import { useFormContext } from "react-hook-form";
import style from "./diploma.form.field.module.css";
import { forwardRef, useState } from "react";

import FileNameText from "./filename.component";
import { InputText, InputDate } from "../shared/form/input-field/input-field";
import { InputSelect } from "../shared/form/input-field/input.select";
import { OptionsType } from "../shared/form/input-field/input.interface";
import { CertificationType, DiplomaType } from "@/services/candidate/candidate-models";

interface DiplomaFieldsProps {
  fieldsIsDisabled: boolean;
  diplomaData: DiplomaType;
  certificationData: CertificationType[];
}
export interface DiplomaForm {
  diploma: [
    {
      _id: string;
      name: string;
      obtentionYear: string;
      option: string;
      school: string;
      attachement: string;
    }
  ];
  certification: [
    {
      _id: string;
      name: string;
      startDate: Date;
      endDate: Date;
      institution: string;
      attachement: string;
    }
  ];
}

const DiplomaFormFields: React.ForwardRefRenderFunction<
  any,
  DiplomaFieldsProps
> = ({ fieldsIsDisabled, diplomaData, certificationData }, ref) => {
  const [disable, setDisable] = useState<boolean>(fieldsIsDisabled);
  const obtentionYear = setYear();
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, disabled },
  } = useFormContext<DiplomaForm>();

  const diplomaId = watch("diploma.0._id", diplomaData._id);
  const diplomaName = watch("diploma.0.name", diplomaData.name);
  const diplomaObtentionYear = watch(
    "diploma.0.obtentionYear",
    diplomaData.obtentionYear
  );
  const diplomaOption = watch("diploma.0.option", diplomaData.option);
  const diplomaSchool = watch("diploma.0.school", diplomaData.school);
  const diplomaFilename = watch(
    "diploma.0.attachement",
    diplomaData.attachement
  );

  return (
    <div className={style.formContainer}>
      <div className={style.form}>
        <div className={style.formHeader}>1. Etudes secondaires</div>
        <div className={style.formBody}>
          <div className={`${style.colDiv2} ${style.gap4}`}>
            <div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Diplôme"
                  onChange={diplomaName}
                  fieldName={"diploma.0.name"}
                  register={register}
                  readOnly={fieldsIsDisabled}
                  value={diplomaData.name}
                  onError={errors.diploma?.[0]?.name}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Établissement d’origine"
                  fieldName={"diploma.0.school"}
                  onChange={diplomaSchool}
                  readOnly={fieldsIsDisabled}
                  register={register}
                  value={diplomaData.school}
                  onError={errors.diploma?.[0]?.school}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <FileNameText
                  label="Pièce jointe"
                  filename={diplomaData.attachement}
                  readonly={false}
                  {...register("diploma.0.attachement", {
                    value: diplomaData?.attachement?.toString(),
                  })}
                />
              </div>
            </div>
            <div>
              <div>
                <div className={`${style.colDiv1} ${style.my5}`}>
                  <InputText
                    label="Série"
                    onChange={diplomaOption}
                    fieldName={"diploma.0.option"}
                    register={register}
                    readOnly={fieldsIsDisabled}
                    value={diplomaData.option}
                    onError={errors.diploma?.[0]?.option}
                  />
                </div>
                <div className={`${style.colDiv1} ${style.my5}`}>
                  <InputSelect
                    label="Année d’obtention"
                    onChange={diplomaObtentionYear}
                    fieldName="diploma.0.obtentionYear"
                    register={register}
                    readOnly={fieldsIsDisabled}
                    selectedValue={{
                      label: diplomaData.obtentionYear,
                      value: diplomaData.obtentionYear,
                    }}
                    optionsValues={obtentionYear}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {certificationData &&
        certificationData.map((certification, index) => (
          <div className={style.form} key={`certification-${index}`}>
            <div className={style.formHeader}>{index + 2} .Autre formation</div>
            <div className={style.formBody}>
              <div className={`${style.colDiv2} ${style.gap4}`}>
                <div>
                  <div className={`${style.colDiv1} ${style.my5}`}>
                    <InputText
                      label="Formation"
                      onChange={certification.name}
                      fieldName={`certification.${index}.name`}
                      register={register}
                      readOnly={fieldsIsDisabled}
                      value={certification.name}
                      onError={errors.certification?.[index]?.name}
                    />
                  </div>
                  <div className={`${style.colDiv1} ${style.my5}`}>
                    <InputText
                      label="Établissement d’origine"
                      fieldName={`certification.${index}.institution`}
                      onChange={certification?.institution}
                      readOnly={fieldsIsDisabled}
                      register={register}
                      value={certification?.institution}
                      onError={errors.certification?.[index]?.institution}
                    />
                  </div>
                  <div className={`${style.colDiv1} ${style.my5}`}>
                    <FileNameText
                      label="Pièce jointe"
                      filename={certification.attachement}
                      readonly={false}
                      {...register(
                        `certification.${index}.attachement` as any,
                        {
                          value: certification?.attachement?.toString(),
                        }
                      )}
                    />
                  </div>{" "}
                </div>
                <div>
                  <div className={`${style.colDiv1} ${style.my5}`}>
                    <InputDate
                      label="Date de début"
                      onChange={certification.startDate}
                      fieldName={`certification.${index}.startDate`}
                      register={register}
                      readOnly={fieldsIsDisabled}
                      value={certification?.startDate}
                      onError={errors.certification?.[index]?.startDate}
                    />
                  </div>
                  <div className={`${style.colDiv1} ${style.my5}`}>
                    <InputDate
                      label="Date de fin"
                      onChange={certification.endDate}
                      fieldName={`certification.${index}.endDate`}
                      register={register}
                      readOnly={fieldsIsDisabled}
                      value={certification?.endDate}
                      onError={errors.certification?.[index]?.endDate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default forwardRef(DiplomaFormFields);

export const diplomaOptions: OptionsType[] = [
  {
    label: "A",
    value: "A",
  },
  {
    label: "C",
    value: "C",
  },
  {
    label: "D",
    value: "D",
  },
  {
    label: "OSE",
    value: "OSE",
  },
  {
    label: "S",
    value: "S",
  },
  {
    label: "L",
    value: "L",
  },
  {
    label: "Technique",
    value: "Technique",
  },
  {
    label: "Autre",
    value: "Autre",
  },
];
const currentYear = new Date().getFullYear();

export const setYear = () => {
  return Array.from({ length: currentYear - 2004 }, (_, index) => {
    return {
      label: (currentYear - index).toString(),
      value: (currentYear - index).toString(),
    };
  });
};
