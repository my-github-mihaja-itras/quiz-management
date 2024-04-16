import { useFormContext } from "react-hook-form";
import personalFormStyle from "./personal.form.field.module.css";
import style from "./add.form.course.module.css"
import { InputText } from "../shared/form/input-field/input-field";
import { InputSelect } from "../shared/form/input-field/input.select";
import { OptionsType } from "../shared/form/input-field/input.interface";
import { Teacher } from "@/services/teacher/teacher.models";
import { useEffect, useState } from "react";
import { getAllTeacher } from "@/services/teacher/teacher.service";
import { semesterOption } from "@/services/course/course.model";

export default function AddCourseForm() {
    const [teachersOptions, setTeachersOptions] = useState<OptionsType[]>([]);

    const {
        register,
        watch,
        unregister,
        getValues,
        formState: { errors, disabled },
      } = useFormContext<any>();

    const name = watch("name");
    const code = watch("code");

    const loadTeacher = async () => {
        const teacherRes = await getAllTeacher();
        const teachers = teacherRes?.data.data;
        
        setTeachersOptions(
          teachers?.map((teacher: Teacher) => {
            return {
              label: teacher.user.lastname+' '+teacher.user.firstname,
              alias: teacher.user.username,
              value: teacher._id,
            };
          })
        );
      };
    
    useEffect(() => {
        loadTeacher()
     }, []); 
    return (
    <>
    <div className={personalFormStyle.formContainer}>
      <br />
        <div className={personalFormStyle.form}>
            <div className={personalFormStyle.formHeader}>Information</div>
                <div className={personalFormStyle.formBody}>
                    <div className={`${personalFormStyle.colDiv2} ${personalFormStyle.gap4}`}>
                        <div className={`${personalFormStyle.colDiv1} ${personalFormStyle.my5}`}>
                            <InputText
                            label="Nom"
                            onChange={name}
                            fieldName={"name"}
                            register={register}
                            value={name}
                            required={"Champ requis"}
                            onError={errors.name}
                            />
                        </div>
                        <div className={`${personalFormStyle.colDiv1} ${personalFormStyle.my5}`}>
                            <InputText
                            label="Code matière"
                            onChange={code}
                            fieldName={"code"}
                            register={register}
                            value={code}
                            required={"Champ requis"}
                            onError={errors.code}
                            />
                        </div>
                    </div>
                    <div className={`${personalFormStyle.colDiv2} ${personalFormStyle.gap4}`}>
                        <div className={`${personalFormStyle.colDiv1} ${personalFormStyle.my5}`}>
                            <InputSelect
                            label="Enseignant"
                            onChange={"teacher"}
                            fieldName="teacher"
                            register={register}
                            optionsValues={teachersOptions}
                            />
                        </div>
                        {/* <div className={`${personalFormStyle.colDiv1} ${personalFormStyle.my5}`}>
                            <InputSelect
                            label="Semestre"
                            onChange={"semester"}
                            fieldName="semester"
                            register={register}
                            optionsValues={semesterOption}
                            />
                        </div> */}
                    </div>
                </div>
            </div>
    </div>
    </>
    );
}