import { useFieldArray, useFormContext } from "react-hook-form";
import style from "./question.form.fields.module.css";
import {
  InputText,
  InputTextArea,
} from "../shared/form/input-field/input-field";
import { useRef, useState } from "react";
import IconDelete from "../shared/icons/iconDelete";
import IconAdd from "../shared/icons/iconAdd";
import extractTokenInfo from "@/utils/extract.token";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import UseWindowSize from "@/cores/window/window.size";
import {
  ChoiceOptions,
  QuestionType,
} from "@/services/question/question.models";

const token = getLocalStorageItem("loginAccessToken") || "";
const tokenInfo: any = extractTokenInfo(token);
interface QuestionFieldsProps {
  fieldsIsDisabled: boolean;
}

export const EMPTY_QUESTION_TO_ADD: ChoiceOptions = {
  choiceOptions: "",
};

export const QuestionFormFields: React.FC<QuestionFieldsProps> = ({
  fieldsIsDisabled,
}) => {
  const [isVisibleLabel, setIsVisibleLabel] = useState<boolean>(false);

  const screenSize = UseWindowSize();

  const {
    register,
    watch,
    getValues,
    setValue,
    control,
    resetField,
    formState: { errors, disabled },
  } = useFormContext<QuestionType>();

  const {
    fields: questionToInsertFields,
    append: questionToInsertAppend,
    remove: questionToInsertRemove,
    prepend,
    swap,
    move,
    insert,
  } = useFieldArray({
    control,
    name: "choice",
  });
  const questionAsked = watch("questionAsked");

  const trueAnswer = watch("trueAnswer");

  const handleAddQuestionTabField = () => {
    questionToInsertAppend({ ...EMPTY_QUESTION_TO_ADD });
  };

  const handleRemoveQuestionTabField = (index: number) => {
    resetField(`choice.${index}.choiceOptions`);
    questionToInsertRemove(index);
  };

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setValue("trueAnswer", Number(event.target.value));
  };

  return (
    <>
      <div className={style.formContainer}>
        <div className={style.form}>
          <div className={style.formBody}>
            <br />
            {screenSize.width >= 736 && (
              <div className={`${style.colDiv} ${style.gap4}`}>
                <div className={`${style.colDiv1} ${style.fieldLabel}`}>
                  Sujet
                </div>
                <div className={`${style.btnIcon}`}></div>
              </div>
            )}
            <div className={`${style.colDiv1} ${style.my5} `}>
              <InputTextArea
                label={`${screenSize.width < 736 ? "Nom" : ""}`}
                onChange={`questionAsked`}
                fieldName={`questionAsked`}
                register={register}
                readOnly={fieldsIsDisabled}
                required={"Champ requis"}
                onError={errors.questionAsked && errors.questionAsked}
              />
            </div>

            {screenSize.width >= 736 && (
              <div className={`${style.colDiv} ${style.gap4}`}>
                <div className={`${style.colDiv1} ${style.fieldLabel}`}>
                  Choix
                </div>
                <div
                  className={`${style.colDiv1} ${style.fieldLabel} ${style.centerField}`}
                >
                  Réponse
                </div>
                <div className={`${style.btnIcon}`}></div>
              </div>
            )}

            {questionToInsertFields.map((questionItem, index) => (
              <>
                <div
                  key={`choice ${index}`}
                  className={`${style.colDiv} ${style.gap4}`}
                >
                  <div className={`${style.colDiv1} ${style.my5}`}>
                    <InputTextArea
                      label={`${screenSize.width < 736 ? "Description" : ""}`}
                      onChange={`choice.${index}.choiceOptions`}
                      fieldName={`choice.${index}.choiceOptions`}
                      register={register}
                      readOnly={fieldsIsDisabled}
                      required={"Champ requis"}
                      onError={errors.choice && errors.choice[index]}
                    />
                  </div>
                  <div className={style.containerRadio}>
                    <input
                      type="radio"
                      value={index}
                      checked={selectedOption === index.toString()}
                      onChange={handleOptionChange}
                      className={style.radioOnError}
                    />
                  </div>
                  <>
                    <div className={`${style.btnIcon} ${style.my5}`}>
                      <div className={style.removeField}>
                        {!fieldsIsDisabled && (
                          <button
                            type="button"
                            onClick={() => handleRemoveQuestionTabField(index)}
                          >
                            <IconDelete />
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                </div>
              </>
            ))}
            {!fieldsIsDisabled && (
              <div className={style.addField}>
                <button
                  type="button"
                  onClick={() => handleAddQuestionTabField()}
                >
                  <IconAdd /> Ajouter une filière
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionFormFields;
