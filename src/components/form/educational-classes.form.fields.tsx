import { useFieldArray, useFormContext } from "react-hook-form";
import style from "./educational-classes.form.field.module.css";
import { useEffect, useState } from "react";

import { InputText, InputNumber } from "../shared/form/input-field/input-field";
import { OptionsType } from "../shared/form/input-field/input.interface";
import {
  InputSelectMultiple,
  InputSelect,
} from "../shared/form/input-field/input.select";
import IconAdd from "../shared/icons/iconAdd";
import IconDelete from "../shared/icons/iconDelete";
import { CursusType } from "@/services/cursus/cursus.models";
import { getAllCursus } from "@/services/cursus/cursus.service";
import { getAllCourse } from "@/services/course/course.service";
import { Course } from "@/services/course/course.model";
import {
  CoursSelection,
  EducationalClasses,
} from "@/services/educational-classes/educational-classes.models";

export const EMPTY_COURSE_SELECTION = {
  label: "",
  credit: 0,
  courses: [],
};

export interface EducationalClassesDataForEditFields
  extends EducationalClasses {}

export interface EducationalClassesFormFieldsProps {
  editableData?: EducationalClassesDataForEditFields;
  fieldIsDisable: boolean;
}

export interface CoursSelectionTransformed {
  _id?: string;
  label: string;
  credit: Number;
  courses: Course[];
}

const EducationalClassesFormFields: React.FC<
  EducationalClassesFormFieldsProps
> = ({ editableData, fieldIsDisable }) => {
  const [cursusOption, setCursusOption] = useState<OptionsType[]>([]);
  const [coursesOption, setCoursesOption] = useState<OptionsType[]>([]);

  const [courseSelectionData, setCourseSelectionData] = useState<
    CoursSelectionTransformed[]
  >([]);

  const {
    register,
    watch,
    setValue,
    control,
    resetField,
    formState: { errors, disabled },
  } = useFormContext<EducationalClasses>();

  const cursus = watch("cursus");

  const name = watch("name");

  const schoolYear = watch("schoolYear");

  const schoolYearStart = watch("schoolYearStart");
  const schoolYearEnd = watch("schoolYearEnd");

  const {
    fields: coursSelectionFields,
    append: coursSelectionAppend,
    remove: coursSelectionRemove,
    prepend,
    swap,
    move,
    insert,
  } = useFieldArray({
    control,
    name: "courseSelection",
  });

  const loadEditableData = () => {
    if (editableData) {
      const courseSelection = editableData.courseSelection;
      const transformedData = courseSelection.map((item) => ({
        label: item.label,
        credit: item.credit,
        courses: item.courses.map((course) => ({
          ...course,
        })),
        _id: item._id,
      }));

      setCourseSelectionData(transformedData);
    }
  };

  const handleAddCoursSelectionField = () => {
    coursSelectionAppend({ ...EMPTY_COURSE_SELECTION });
  };

  const handleRemoveCoursSelectionField = (index: number) => {
    resetField(`courseSelection.${index}.label`);
    resetField(`courseSelection.${index}.credit`);
    resetField(`courseSelection.${index}.courses`);
    coursSelectionRemove(index);
  };

  const loadCursusData = async () => {
    const response = await getAllCursus();
    const cursusData: CursusType[] = response.data;
    setCursusOption(
      cursusData.map((cursus) => {
        return {
          label: cursus.name,
          alias: cursus.name,
          value: cursus._id,
        };
      })
    );
  };

  const loadCoursOption = async () => {
    const response = await getAllCourse();
    const coursesData: Course[] = response.data.data;
    setCoursesOption(
      coursesData.map((cours) => {
        return {
          label: cours.name,
          alias: cours.code,
          value: cours._id,
        };
      })
    );
  };

  useEffect(() => {
    loadCursusData();
    loadCoursOption();
    loadEditableData();
  }, []);

  useEffect(() => {
    coursSelectionAppend(courseSelectionData);
  }, [courseSelectionData]);

  return (
    <div className={style.formContainer}>
      <div className={style.form}>
        <div className={style.formHeader}>Classe</div>
        <div className={style.formBody}>
          <div className={`${style.colDiv2} ${style.gap4} ${style.pr1}`}>
            <div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputText
                  label="Nom"
                  onChange={name}
                  fieldName={"name"}
                  register={register}
                  required={"Champ requis"}
                  value={editableData && editableData?.name}
                  onError={errors.name}
                  readOnly={fieldIsDisable}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5}`}>
                <InputSelect
                  label="Début année scolaire"
                  onChange={schoolYearStart}
                  fieldName="schoolYearStart"
                  register={register}
                  selectedValue={
                    editableData && {
                      label: editableData?.schoolYear.split("-")[0],
                      value: editableData?.schoolYear.split("-")[0],
                    }
                  }
                  optionsValues={setYear("2022")}
                  readOnly={fieldIsDisable}
                />
              </div>
            </div>
            <div>
              <div className={`${style.colDiv1} ${style.my5} `}>
                <InputSelect
                  label="Filière"
                  onChange={cursus}
                  fieldName="cursus"
                  register={register}
                  selectedValue={
                    editableData && {
                      label: editableData?.cursus?.name,
                      value: editableData?.cursus?._id,
                    }
                  }
                  optionsValues={cursusOption}
                  readOnly={fieldIsDisable}
                />
              </div>
              <div className={`${style.colDiv1} ${style.my5} `}>
                <InputSelect
                  label="Fin année scolaire"
                  onChange={schoolYearEnd}
                  fieldName="schoolYearEnd"
                  register={register}
                  selectedValue={
                    editableData && {
                      label: editableData?.schoolYear.split("-")[1],
                      value: editableData?.schoolYear.split("-")[1],
                    }
                  }
                  optionsValues={setYear("2022")}
                  readOnly={fieldIsDisable}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.form}>
        <div className={style.formHeader}>Cours</div>
        <div className={style.formBody}>
          <div className={`${style.colDivCustom} ${style.gap4}`}>
            <div className={style.fieldLabel}>Nom</div>
            <div className={style.fieldLabel}>Credit</div>
            <div className={style.fieldLabel}>Cours</div>
          </div>

          <div className={style.formFields}>
            {/* Field Array */}
            {coursSelectionFields.map((courseSelection, index) => (
              <div
                className={`${style.fieldBlock}`}
                key={`${courseSelection._id}-${index}`}
              >
                <div className={`${style.colDivCustom} ${style.gap4}`}>
                  <div className={`${style.colDiv1} ${style.my2}`}>
                    <InputText
                      label=""
                      onChange={`courseSelection.${index}.label`}
                      fieldName={`courseSelection.${index}.label`}
                      value={``}
                      register={register}
                      required={"Champ requis"}
                      onError={
                        errors.courseSelection &&
                        errors.courseSelection[index]?.label
                      }
                      readOnly={fieldIsDisable}
                    />
                  </div>
                  <div className={`${style.colDiv1} ${style.my2}`}>
                    <InputNumber
                      label=""
                      onChange={`courseSelection.${index}.credit`}
                      fieldName={`courseSelection.${index}.credit`}
                      value={0}
                      register={register}
                      readOnly={fieldIsDisable}
                      onError={
                        errors.courseSelection &&
                        errors.courseSelection[index]?.credit
                      }
                    />
                  </div>
                  <div className={`${style.colDiv1} ${style.my2}`}>
                    <InputSelectMultiple
                      label=""
                      isDisabled={fieldIsDisable}
                      defaultValue={
                        courseSelection.courses &&
                        courseSelection.courses.map((item, i) => ({
                          label: item.name,
                          value: item._id,
                          alias: item.code,
                        }))
                      }
                      fieldName={`courseSelection.${index}.courses`}
                      options={coursesOption}
                      setValue={setValue}
                      required={true}
                      onError={
                        errors.courseSelection &&
                        errors.courseSelection[index]?.courses
                      }
                    />
                  </div>
                </div>
                <div className={style.removeField}>
                  {!fieldIsDisable && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCoursSelectionField(index)}
                    >
                      <IconDelete />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Field Array */}
          </div>

          {!fieldIsDisable && (
            <div className={style.addField}>
              <button
                type="button"
                onClick={() => handleAddCoursSelectionField()}
              >
                <IconAdd /> Ajouter un cours
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationalClassesFormFields;

export const setYear = (startYear: string) => {
  return Array.from({ length: 2050 - Number(startYear) + 1 }, (_, index) => {
    const year = Number(startYear) + index;
    return {
      label: year.toString(),
      value: year.toString(),
    };
  });
};
