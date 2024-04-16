import style from "@/components/shared/filter/filter.module.css";
import { useEffect, useState } from "react";
import IconClose from "../icons/iconClose";
import IconCalendarBlue from "../icons/iconCalendarBlue";
import { InputDate, InputDateFilter } from "../form/input-field/input-field";
import { useForm } from "react-hook-form";
import IconFilter from "../icons/iconFilter";
import IconCloseWhite from "../icons/iconCloseWhite";
import IconCareDown from "../icons/iconCaretDown";
import IconCaretUp from "../icons/iconCaretUp";
import { FilterKeywords, ParsedType } from "./filter.constant";
import { customInputSelectStyle } from "../form/input-field/input.select.constant";
import { Tienne } from "next/font/google";
import { InputSelectWithCheckBox } from "../form/input-field/input.select";
import UseWindowSize from "@/cores/window/window.size";
import IconDropup from "../icons/iconDropup";
import { DateFilterComponent } from "./date.filter.component";
import { ChoiceFilterComponent } from "./choice.filter.component";

interface FilterProps<T> {
  choiceFilterOption: any[];
  dateFilterOption: any[];
  onChangeFilter?: any;
  handleClose: any;
  haveChoiceFilter: boolean;
  haveDateFilter: boolean;
}
const Filter: React.FC<FilterProps<any>> = ({
  choiceFilterOption,
  dateFilterOption,
  onChangeFilter,
  handleClose,
  haveChoiceFilter,
  haveDateFilter,
}) => {
  // filter keyword state
  const [choiceKeywords, setChoiceKeywords] = useState<FilterKeywords[]>([]);

  //
  const [dateKeywords, setDateKeywords] = useState<FilterKeywords[]>([]);

  // Function ti handle close filter
  const closeFilter = () => {
    setChoiceKeywords([]);
    setTimeout(() => {
      handleClose(false);
    }, 100);
  };

  const [isHide, setIsHide] = useState<boolean>(false);

  const hideFilter = () => {
    setIsHide(!isHide);
  };

  const handleChoiceKeywords = (choiceKeywords: any) => {
    setChoiceKeywords(choiceKeywords);
  };

  const handleDateKeywords = (keywords: any) => {
    const dateKeywords: FilterKeywords[] = [];

    keywords.forEach((item: any) => {
      for (const key in item) {
        if (Object.hasOwnProperty.call(item, key)) {
          const value = item[key];
          dateKeywords.push({
            category: key,
            key: key,
            value: new Date(value.from).toUTCString(),
            type: ParsedType.FROM_DATE,
          });
          dateKeywords.push({
            category: key,
            key: key,
            value: new Date(value.to).toUTCString(),
            type: ParsedType.TO_DATE,
          });
        }
      }
    });

    setDateKeywords(dateKeywords);
  };

  useEffect(() => {
    if (dateKeywords.length > 0) {
      onChangeFilter([...choiceKeywords, ...dateKeywords]);
    } else {
      onChangeFilter(choiceKeywords);
    }
  }, [choiceKeywords, dateKeywords]);

  const screenSize = UseWindowSize();
  useEffect(() => {
    if (screenSize.width > 736) {
      setIsHide(false);
    }
  }, [screenSize.width]);

  return (
    <div
      className={`${
        screenSize.width < 736 && isHide ? style.hide : style.container
      }`}
    >
      <div className={style.btnClose}>
        {screenSize.width < 736 ? (
          <button type="button" onClick={hideFilter}>
            <IconDropup fill={"#c5c5c5"} />
          </button>
        ) : (
          <button type="button" onClick={closeFilter}>
            <IconClose />
          </button>
        )}
      </div>
      {haveDateFilter && (
        <DateFilterComponent
          dateOption={dateFilterOption}
          handleDateKeywords={handleDateKeywords}
        />
      )}

      {haveChoiceFilter && (
        <ChoiceFilterComponent
          choiceFilterOption={choiceFilterOption}
          handleChoiceKeywords={handleChoiceKeywords}
        />
      )}
    </div>
  );
};

export default Filter;
