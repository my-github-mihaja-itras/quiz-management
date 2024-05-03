import { useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import { customInputSelectStyle } from "../form/input-field/input.select.constant";
import { InputDateFilter } from "../form/input-field/input-field";
import style from "./filter.module.css";
import IconCalendarBlue from "../icons/iconCalendarBlue";
import IconCloseWhite from "../icons/iconCloseWhite";
import IconCaretUp from "../icons/iconCaretUp";
import IconCareDown from "../icons/iconCaretDown";
import { DateFilterType } from "./filter.constant";

interface DateFilterProps {
  dateOption: any;
  handleDateKeywords: any;
}

interface ErrorMessage {
  fieldName: string;
  message: string;
}

export const DateFilterComponent: React.FC<DateFilterProps> = ({
  dateOption,
  handleDateKeywords,
}) => {
  // Register for saving data from input select
  const {
    register,
    setValue,
    watch,
    getValues,
    handleSubmit,
    unregister,
    reset,
    resetField,
    setError,
    formState: { errors },
  } = useForm<any>();

  // State for selectedOptions
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Date filter list to render
  const [dateFilterList, setDateFilterList] = useState<DateFilterType[]>([]);

  // Filter Option
  const [filterOption, setFilterOption] = useState<any[]>(dateOption);

  // Errors State
  const [errorMessage, setErrorMessage] = useState<ErrorMessage[]>([]);

  const [filterVisibility, setFilterVisibility] = useState<boolean[]>(
    Array(filterOption.length).fill(false)
  );

  // Handle selected Option
  const handleSelectedOption = (label: string, value: string) => {
    setSelectedOptions((prevOptions) => [...prevOptions, value]);

    setDateFilterList((prevList) => [
      ...prevList,
      { label: label, value: value },
    ]);
  };

  // Handle Change Date from value
  const handleChangeDateFrom = (dateFromValue: string, fieldName: string) => {
    setValue(fieldName, dateFromValue);
  };

  // Handle Change Date To Value
  const handleChangeDateTo = (
    dateToValue: string,
    DateFromFieldName: string,
    DateToFieldName: string
  ) => {
    const dateFromValue = getValues(DateFromFieldName);

    if (dateFromValue < dateToValue) {
      // Supprimer l'erreur du state errorMessage
      setErrorMessage((prevMessages) =>
        prevMessages.filter(
          (message) => message.fieldName !== DateFromFieldName
        )
      );

      setValue(DateToFieldName, dateToValue);

      // Vérification des erreurs pour d'autres champs
      const errorsExist = errorMessage.some(
        (message) => message.fieldName !== DateFromFieldName
      );

      if (!errorsExist) {
        const valuesFromRegister = getValues();
        const newTab = [valuesFromRegister];
        newTab.forEach((item: any, index: any) => {
          for (const key in item) {
            if (Object.hasOwnProperty.call(item, key)) {
              const element = item[key];
              if (element.from === "" || element.to === "") {
                // console.log(
                //   `Empty from or to found in item ${index}, key ${key}`
                // );
                unregister(key);
              }
            }
          }
        });
        const newValuesFromRegister = getValues();
        handleDateKeywords([newValuesFromRegister]);
      }
    } else {
      setErrorMessage((prevMessage) => {
        return [
          ...prevMessage,
          {
            fieldName: DateFromFieldName,
            message: "Veuillez choisir une date correcte",
          },
        ];
      });
    }
  };

  // Handle close filter
  const handleCloseFilterConst = (label: string, value: any) => {
    // Filtrer les options sélectionnées
    const newSelectedOption = selectedOptions.filter(
      (option: string) => option !== value
    );

    // Filtrer dateFilterList
    const newDateFilterList = dateFilterList.filter(
      (filter: DateFilterType) => filter.value !== value
    );

    // Mettre à jour les options sélectionnées dans votre état local
    setSelectedOptions(newSelectedOption);

    // Mettre à jour les date filtrer
    setDateFilterList(newDateFilterList);

    setFilterOption((prevOption) => [...prevOption, { label, value }]);

    // Désinscrire le champ cible
    unregister(value);

    // Filtrer les valeurs du register
    const valuesFromRegister = getValues();

    handleDateKeywords([valuesFromRegister]);
  };

  useEffect(() => {
    const filteredOptions = filterOption.filter((option) => {
      return !selectedOptions.includes(option.value);
    });

    setFilterOption(filteredOptions);
  }, [selectedOptions]);

  const toggleContentVisibility = (index: number) => {
    const updatedFilterVisibility = [...filterVisibility];
    updatedFilterVisibility[index] = !updatedFilterVisibility[index];
    setFilterVisibility(updatedFilterVisibility);
  };

  return (
    <div className={style.dateFilter}>
      <div className={style.title}>
        <IconCalendarBlue /> FILTRE PAR PÉRIODE 
      </div>
      <div className={style.dateSelect}>
        <label>Ajouter période</label>
        <Select
          className={style.inputSelect}
          options={filterOption}
          onChange={(item: any) => handleSelectedOption(item.label, item.value)}
          placeholder="Sélectionner une option"
          styles={customInputSelectStyle}
          components={{
            NoOptionsMessage: () => (
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "12px",
                  fontFamily: "Roboto",
                }}
              >
                Aucun option a sélectionner
              </div>
            ),
          }}
        />
      </div>

      {dateFilterList.map((filter: any, index: number) => (
        <div
          key={`filter-date${index}`}
          className={`${style.filterList} ${style.centerChild} `}
        >
          <div className={style.filterSubtitle}>
            <div className={style.filterClose}>
              <button
                type="button"
                onClick={() => {
                  handleCloseFilterConst(filter?.label, filter?.value);
                }}
              >
                <IconCloseWhite />
              </button>
              <span> {filter?.label}</span>
            </div>
            <div className={style.filterAction}>
              {filterVisibility[index] ? (
                <button
                  type="button"
                  onClick={() => toggleContentVisibility(index)}
                >
                  <IconCaretUp />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleContentVisibility(index)}
                >
                  <IconCareDown />
                </button>
              )}
            </div>
          </div>
          <div
            className={`${style.dateFilterContent} ${
              filterVisibility[index] ? style.hide : ""
            }`}
          >
            <div className={`${style.inputContainer} ${style.mb1}`}>
              <label>Du</label>
              <input
                type="date"
                {...register(`${filter.value}.from`)}
                onChange={(e: any) =>
                  handleChangeDateFrom(e.target.value, `${filter.value}.from`)
                }
              />
            </div>

            <div className={`${style.inputContainer} `}>
              <label>Au</label>
              <input
                type="date"
                {...register(`${filter.value}.to`)}
                onChange={(e: any) =>
                  handleChangeDateTo(
                    e.target.value,
                    `${filter.value}.from`,
                    `${filter.value}.to`
                  )
                }
                className={`${
                  errorMessage.includes(filter.value) ? style.errorInput : ""
                }`}
              />
              {/* {errorMessage &&
                errorMessage.map((message, i) => {
                  return (
                    <span key={`errorMessage-${i}`}>
                      {message.fieldName === `${filter.value}.from`
                        ? message.message
                        : ""}
                    </span>
                  );
                })} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
