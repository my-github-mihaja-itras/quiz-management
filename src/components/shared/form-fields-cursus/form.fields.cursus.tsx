import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import style from "./form.fields.module.css";
import { useState } from "react";
import ErrorModal, { ErrorMessage } from "@/components/modal/errorModal";
import ProfileImageUpload from "@/components/uploadFile/profile.image.upload";

export interface FormFieldsInfo {
  username: string;
  status: string;
  photo?: string;
}
interface FormFieldsEditableProps<T> {
  children: any;
  handleChangeEditableFields?: any;
  fieldsIsDisabled?: boolean;
  formData?: FormFieldsInfo;
  submitService: any;
  haveActionButton: boolean;
  haveImageProfile: boolean;
}

export interface Payloads {
  user: any;
  photo: string;
  username: string;
}

const FormFieldsEditableCursus: React.FC<FormFieldsEditableProps<any>> = ({
  children,
  handleChangeEditableFields,
  fieldsIsDisabled,
  formData,
  submitService,
  haveActionButton = true,
  haveImageProfile = true,
}) => {
  const methods = useForm<Payloads>({
    defaultValues: {},
  });
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>();

  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    await submitService(data);
  };

  const onError: SubmitErrorHandler<any> = (error: any) => {
    console.log(error);
  };

  const handleUploadImage = (res: any) => {
    if (res.errorMessage !== "") {
      setMessage({ title: "OUPS", message: res.errorMessage });
      setIsOpen(true);
    }
    methods.setValue(`photo`, res.file);
  };

  return isOpen ? (
    <ErrorModal close={closeModal} message={message} color={"#0FC3ED"} />
  ) : (
    <FormProvider {...methods}>
      <form
        className={style.formFieldContainer}
        onSubmit={methods.handleSubmit(onSubmit, onError)}
      >
        <div className={style.form}>
          {haveImageProfile && (
            <div className={style.profileContainer}>
              <div className={style.imageContainer}>
                <ProfileImageUpload
                  defaultValue={formData?.photo}
                  readOnly={fieldsIsDisabled}
                  onUploaded={(res: any) => {
                    handleUploadImage(res);
                  }}
                  {...methods.register(`photo`, {
                    required: "Une photo de profile est requis",
                  })}
                />
                <div className={style.usernameText}>@{formData?.username}</div>
              </div>
            </div>
          )}

          <div className={style.fieldContent}>{children}</div>
        </div>
        {haveActionButton && (
          <>
            <div className={style.action}>
              {fieldsIsDisabled ? (
                <a
                  type="button"
                  onClick={handleChangeEditableFields}
                  className={style.editBtn}
                >
                  Modifier
                </a>
              ) : (
                <>
                  <button
                    type="submit"
                    // onSubmit={handleSubmit}
                    className={style.saveBtn}
                  >
                    Enregistrer
                  </button>
                  {/* <button
                    type="button"
                    onClick={handleChangeEditableFields}
                    className={style.editBtn}
                  >
                    Annuler
                  </button> */}
                </>
              )}
              {}
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default FormFieldsEditableCursus;
