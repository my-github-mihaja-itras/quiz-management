import { useFieldArray, useFormContext } from "react-hook-form";
import style from "./cursus.form.fields.module.css";
import {
  InputText,
  InputTextArea,
} from "../shared/form/input-field/input-field";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import IconDropdownGrey from "../shared/icons/IconCloseComment";
import IconDelete from "../shared/icons/iconDelete";
import IconAdd from "../shared/icons/iconAdd";
import {
  CursusAndHistory,
  CursusMutipleToInsert,
  CursusType,
} from "@/services/cursus/cursus.models";
import { ActionType, EntityName } from "@/cores/constant/constant.history";
import extractTokenInfo from "@/utils/extract.token";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import UseWindowSize from "@/cores/window/window.size";

const token = getLocalStorageItem("loginAccessToken") || "";
const tokenInfo: any = extractTokenInfo(token);
interface CursusFieldsProps {
  fieldsIsDisabled: boolean;
  cursusData: CursusType[];
}

export const EMPTY_CURSUS_TO_ADD: CursusAndHistory = {
  cursus: {
    _id: "",
    name: "",
    description: "",
  },
  history: {
    action: {
      name: ActionType.CREATE_CURSUS,
      proof: "",
    },
    user: tokenInfo ? tokenInfo._id : "",
    targetId: "",
    entity: EntityName.CURSUS,
  },
};

export const CursusFormFields: React.FC<CursusFieldsProps> = ({
  fieldsIsDisabled,
  cursusData,
}) => {
  const [isVisibleLabel, setIsVisibleLabel] = useState<boolean>(false);

  const screenSize = UseWindowSize();

  const isInitialMount = useRef(true);

  const {
    register,
    watch,
    getValues,
    setValue,
    control,
    resetField,
    formState: { errors, disabled },
  } = useFormContext<CursusMutipleToInsert>();

  const {
    fields: cursusToInsertFields,
    append: cursusToInsertAppend,
    remove: cursusToInsertRemove,
    prepend,
    swap,
    move,
    insert,
  } = useFieldArray({
    control,
    name: "cursusToInsert",
  });

  const setOldCursusInTab = () => {
    const tab: CursusAndHistory[] = [];
    deleteAllFieldArray();
    cursusData.map((cursus) => tab.push({ cursus }));
    cursusToInsertAppend(tab);
  };

  const deleteAllFieldArray = () => {
    for (let i = cursusToInsertFields.length - 1; i >= 0; i--) {
      cursusToInsertRemove(i);
    }
  };

  const handleAddCursusTabField = () => {
    isInitialMount.current = true;
    cursusToInsertAppend({ ...EMPTY_CURSUS_TO_ADD });
  };

  const handleRemoveCursusTabField = (index: number) => {
    resetField(`cursusToInsert.${index}.cursus.name`);
    resetField(`cursusToInsert.${index}.cursus.description`);
    cursusToInsertRemove(index);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setOldCursusInTab();
    }
  }, [cursusData]);

  return (
    <>
      <div className={style.formContainer}>
        <div className={style.form}>
          <div className={style.formBody}>
            {screenSize.width >= 736 && (
              <div className={`${style.colDiv} ${style.gap4}`}>
                <div className={`${style.colDiv1} ${style.fieldLabel}`}>
                  Nom
                </div>
                <div className={`${style.colDiv1} ${style.fieldLabel}`}>
                  Description
                </div>

                <div className={`${style.btnIcon}`}></div>
              </div>
            )}
            {cursusToInsertFields.map((cursusItem, index) => (
              <>
                <div
                  key={`cursusToInsert ${index}`}
                  className={`
                  ${
                    cursusData.some(
                      (item) => item?._id == cursusItem.cursus?._id
                    )
                      ? style.colDivWithoutIcon
                      : style.colDiv
                  } ${style.gap4}`}
                >
                  <div className={`${style.colDiv1} ${style.my5} `}>
                    <InputText
                      label={`${screenSize.width < 736 ? "Nom" : ""}`}
                      onChange={`cursusToInsert.${index}.cursus.name`}
                      fieldName={`cursusToInsert.${index}.cursus.name`}
                      register={register}
                      readOnly={fieldsIsDisabled}
                      required={"Champ requis"}
                      onError={
                        errors.cursusToInsert &&
                        errors.cursusToInsert[index]?.cursus?.name
                      }
                    />
                  </div>

                  <div className={`${style.colDiv1} ${style.my5}`}>
                    <InputTextArea
                      label={`${screenSize.width < 736 ? "Description" : ""}`}
                      onChange={`cursusToInsert .${index}.cursus.description`}
                      fieldName={`cursusToInsert.${index}.cursus.description`}
                      register={register}
                      readOnly={fieldsIsDisabled}
                      onError={
                        errors.cursusToInsert &&
                        errors.cursusToInsert[index]?.cursus?.description
                      }
                    />
                  </div>
                  <>
                    {cursusData.some(
                      (item) => item?._id == cursusItem.cursus?._id
                    ) ? (
                      <></>
                    ) : (
                      <div className={`${style.btnIcon} ${style.my5}`}>
                        <div className={style.removeField}>
                          {!fieldsIsDisabled && (
                            <button
                              type="button"
                              onClick={() => handleRemoveCursusTabField(index)}
                            >
                              <IconDelete />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                </div>
              </>
            ))}
            {!fieldsIsDisabled && (
              <div className={style.addField}>
                <button type="button" onClick={() => handleAddCursusTabField()}>
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

export default CursusFormFields;
