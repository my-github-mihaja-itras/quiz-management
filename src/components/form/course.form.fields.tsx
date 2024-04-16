import { useFormContext } from "react-hook-form";
import style from "./course.form.field.module.css";
import {
  InputDate,
  InputNumber,
  InputPhone,
  InputSwitch,
  InputText,
} from "../shared/form/input-field/input-field";
import { useEffect, useState } from "react";
import { Role } from "@/services/role/role.models";
import { Group } from "@/services/group/group.models";
import { getAllRoles } from "@/services/role/role.service";
import { getAllGroups } from "@/services/group/group.service";
import { Administration } from "@/services/administration/administration.model";
import { OptionsType } from "../shared/form/input-field/input.interface";
import {
  InputSelect,
  InputSelectMultiple,
} from "../shared/form/input-field/input.select";
import {
  Course,
  Semester,
  semesterOption,
} from "@/services/course/course.model";
import { getAllTeacher } from "@/services/teacher/teacher.service";
import { Teacher } from "@/services/teacher/teacher.models";

interface CourseFormFieldsProps {
  fieldsIsDisabled: boolean;
  data: Course;
  teacherOption: any;
}

export const CourseFormFields: React.FC<CourseFormFieldsProps> = ({
  fieldsIsDisabled,
  data,
  teacherOption,
}) => {
  const {
    register,
    watch,
    setValue,
    unregister,
    resetField,
    getValues,
    formState: { errors },
  } = useFormContext<any>();

  return (
    <div className={style.formContainer}>
      <div className={style.formTitle}>Informations</div>

      <div className={style.formBody}>
        <div className={`${style.colDiv2} ${style.gap4}`}>
          <div>
            <div className={`${style.colDiv1} ${style.my5}`}>
              <InputText
                label="Unité d’enseignement"
                onChange={data?.name}
                fieldName={"name"}
                register={register}
                readOnly={fieldsIsDisabled}
                value={data?.name}
                required={"Champ requis"}
                onError={errors.name}
              />
            </div>
            <div className={`${style.colDiv1} ${style.my5}`}>
              <InputSelect
                label="Enseignant"
                onChange={data?.teacher}
                fieldName="teacher"
                register={register}
                readOnly={fieldsIsDisabled}
                selectedValue={{
                  label: data?.teacher.user.firstname,
                  value: data?.teacher._id,
                }}
                optionsValues={teacherOption}
              />
            </div>
          </div>
          <div>
            <div className={`${style.colDiv1} ${style.my5}`}>
              <InputText
                label="Code matière"
                onChange={data?.code}
                fieldName={"code"}
                required={"Champ requis"}
                register={register}
                readOnly={fieldsIsDisabled}
                value={data?.code}
                onError={errors.email}
              />
            </div>
            <div className={`${style.colDiv1} ${style.my5}`}>
              <InputSelect
                label="Semestre"
                onChange={data?.semester}
                fieldName="semester"
                register={register}
                readOnly={fieldsIsDisabled}
                selectedValue={{
                  label: data?.semester,
                  value: data?.semester,
                }}
                optionsValues={semesterOption}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFormFields;
