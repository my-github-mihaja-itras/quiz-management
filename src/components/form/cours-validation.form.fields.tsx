import { useFormContext } from "react-hook-form";
import style from "./cours-validation.form.fields.module.css";
import { useEffect, useState } from "react";

import { InputText, InputNumber } from "../shared/form/input-field/input-field";
import { OptionsType } from "../shared/form/input-field/input.interface";
import { InputSelect } from "../shared/form/input-field/input.select";
import { Course, RegistratedCourse } from "@/services/course/course.model";
import {
  CoursSelection,
  EducationalClasses,
} from "@/services/educational-classes/educational-classes.models";
import { getStudentByUserId } from "@/services/student/student.service";
import { Student } from "@/services/student/student.models";
import { HttpStatusCode } from "axios";
import { AssignedCourse } from "@/app/profiles/student/cours-validation/assignedCourse.model";

export const EMPTY_COURSE_SELECTION = {
  label: "",
  credit: 0,
  courses: [],
};
export interface EducationalClassesDataForEditFields
  extends EducationalClasses {}
export interface CoursSelectionTransformed {
  _id?: string;
  label: string;
  credit: Number;
  courses: Course[];
}
export interface EducationalClassesFormFieldsProps {
  onChangeProfile: any;
  hasRegistratedCourse: boolean;
  assignedCourse: AssignedCourse[];
}

const CoursValidationFormFields: React.FC<
  EducationalClassesFormFieldsProps
> = ({ onChangeProfile, hasRegistratedCourse, assignedCourse }) => {
  const [coursesOption, setCoursesOption] = useState<any>();

  const [courseSelectionData, setCourseSelectionData] = useState<
    CoursSelectionTransformed[]
  >([]);

  const {
    register,
    watch,
    setValue,
    control,
    getValues,
    resetField,
    formState: { errors, disabled },
  } = useFormContext<any>();

  const studentId = watch("_id");

  const name = watch("name");

  const cursus = watch("cursus");

  const schoolYear = watch("schoolYear");

  const loadProfil = async () => {
    const response = await getStudentByUserId();
    if (response.status === HttpStatusCode.Ok) {
      const student: Student = response.data.data;
      setValue("_id", student?._id);
      setValue("name", student?.educationalClasses.name);
      setValue("cursus", student?.educationalClasses.cursus.name);
      setValue("schoolYear", student?.educationalClasses.schoolYear);
      loadCourseOption(student?.educationalClasses.courseSelection);
      onChangeProfile(student);
    }
  };

  const loadCourseOption = async (courseSelections: CoursSelection[]) => {
    const tab: OptionsType[][] = [];
    setCourseSelectionData(courseSelections);
    courseSelections.map((courseSelection, index) => {
      setValue(`courseSelection.${index}`, courseSelection);
      tab.push(formatCourseOption(courseSelection.courses));
    });
    setCoursesOption(tab);
  };

  const formatCourseOption = (courses: Course[]) => {
    return courses.map((course) => ({
      label: course.name,
      value: course._id,
    }));
  };
  const getSelectedValue = (courseSelection: CoursSelection) => {
    let optionsSelected: any = {};
    courseSelection.courses.map((options) => {
      assignedCourse.map((assigned) => {
        if (
          courseSelection.label == assigned.label &&
          options._id === assigned.course._id
        ) {
          optionsSelected = { label: options.name, value: options._id };
        }
      });
    });
    return optionsSelected;
  };

  useEffect(() => {
    loadProfil();
  }, [hasRegistratedCourse]);

  return (
    <>
      <div className={style.formContainer}>
        <div className={style.form}>
          <div className={style.formBody}>
            <div className={`${style.colDivCustom} ${style.gap4}`}>
              <div className={style.fieldLabel}>Unité Enseignement</div>
              <div className={style.fieldLabel}>Credit</div>
              <div className={style.fieldLabel}>Nom</div>
            </div>

            <div className={style.formFields}>
              {courseSelectionData.map((courseSelection, index) => (
                <div
                  className={`${style.fieldBlock}`}
                  key={courseSelection._id}
                >
                  <div className={`${style.colDivCustom} ${style.gap4}`}>
                    <div className={`${style.colDiv1} ${style.my2} `}>
                      <InputText
                        label=""
                        onChange={`courseSelection.${index}.label`}
                        fieldName={`courseSelection.${index}.label`}
                        value={`courseSelection.${index}._id`}
                        register={register}
                        required={"Champ requis"}
                        readOnly={true}
                      />
                    </div>
                    <div
                      className={`${style.colDiv1} ${style.my2} ${style.InputNumber}`}
                    >
                      <InputNumber
                        label=""
                        onChange={`courseSelection.${index}.credit`}
                        fieldName={`courseSelection.${index}.credit`}
                        value={parseInt(`courseSelection.${index}.credit`)}
                        register={register}
                        readOnly={true}
                      />
                    </div>
                    <div className={`${style.colDiv1} ${style.my2}`}>
                      <InputSelect
                        label=""
                        placeholder={"Veuillez sélectionner"}
                        onChange={`courses.${index}`}
                        fieldName={`courses.${index}`}
                        register={register}
                        selectedValue={
                          (hasRegistratedCourse ||
                            courseSelection.courses.length == 1) &&
                          getSelectedValue(courseSelection)
                        }
                        optionsValues={coursesOption[index]}
                        readOnly={
                          hasRegistratedCourse ||
                          courseSelection.courses.length == 1
                            ? true
                            : false
                        }
                        onError={getValues(`courses.${index}`)?false:true}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursValidationFormFields;
