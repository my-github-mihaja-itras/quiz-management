import { useEffect, useState } from "react";
import { InputSelectWithCheckBox } from "../form/input-field/input.select";
import IconFilter from "../icons/iconFilter";
import style from "./filter.module.css";
import { FilterKeywords, ParsedType } from "./filter.constant";
import { customInputSelectStyle } from "../form/input-field/input.select.constant";
import IconCloseWhite from "../icons/iconCloseWhite";
import UseWindowSize from "@/cores/window/window.size";
import IconCaretUp from "../icons/iconCaretUp";
import IconCareDown from "../icons/iconCaretDown";

interface ChoiceFilterProps {
  choiceFilterOption: any;
  handleChoiceKeywords: any;
}

export const ChoiceFilterComponent: React.FC<ChoiceFilterProps> = ({
  choiceFilterOption,
  handleChoiceKeywords,
}) => {
  // Filter Key state by default customKey
  const [filterKey, setFilterKey] = useState<any[]>([]);

  // filter keyword state
  const [keywords, setKeywords] = useState<FilterKeywords[]>([]);

  /// Filter List state
  const [filterList, setFilterList] = useState<any[]>([]);

  // State for selectedOptions
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Filter Option
  const [filterOption, setFilterOption] = useState<any[]>([]);

  /// Function to update filterList by the selectedOption
  const updateFilterList = (selectedOption: any) => {
    // Filtrer filterKey par rapport aux labels présents dans selectedOption
    const newFilterList = filterKey
      .filter((filter) =>
        selectedOption.some((option: any) => option.label === filter.title)
      )
      .map((newFilter) => {
        const existingFilter = filterList.find(
          (existing) => existing.title === newFilter.title
        );

        if (existingFilter) {
          // Mettez à jour les éléments existants, conservez isChecked si déjà sélectionné
          return {
            ...existingFilter,
            element: newFilter.element.map((el: any) => {
              const existingElement = existingFilter.element.find(
                (selected: any) => selected.value === el.value
              );
              if (existingElement) {
                return {
                  ...el,
                  isChecked: existingElement.isChecked,
                };
              } else {
                return {
                  ...el,
                  isChecked: false,
                };
              }
            }),
          };
        }

        // Si le filtre n'existe pas encore dans filterList
        return {
          title: newFilter.title,
          name: newFilter.name,
          type: newFilter.type,
          element: newFilter.element.map((element: any) => ({
            ...element,
            isChecked: false,
          })),
        };
      });

    // Filtrer les keywords en fonction des éléments existants dans le nouveau filterList
    const updatedKeywords = keywords.filter((kw) =>
      newFilterList.some(
        (filter) =>
          filter.title === kw.category &&
          filter.element.some(
            (el: any) => el.value === kw.value && el.isChecked
          )
      )
    );

    setFilterList(newFilterList);
    setKeywords(updatedKeywords);
  };

  // Handle select Option results
  const handleSelectedOption = (selectedOptions: any) => {
    setSelectedOptions(selectedOptions);
  };

  const handleCloseFilterConst = (title: any) => {
    // Filtrer les options sélectionnées
    const newSelectedOption = selectedOptions.filter(
      (option: any) => option.label !== title
    );

    // Mettre à jour les options sélectionnées dans votre état local
    setSelectedOptions(newSelectedOption);
  };

  // Chargement du FilterList par rapport au changement du selectedOption
  useEffect(() => {
    updateFilterList(selectedOptions);
  }, [selectedOptions]);

  // Handle to update filter option on reload page
  const updateFilterOption = () => {
    setFilterOption(
      choiceFilterOption.map((item: any) => {
        return {
          label: item.title,
          alias: item.title.split(" ")[0],
          value: item.title,
        };
      })
    );
    setFilterKey(choiceFilterOption);
  };
  /**
   * Function to set the keyword on check
   *
   * &keywords:list=value&keywords:list=value
   *
   * @param e : Event on change
   */

  const handleCheck = (
    e: any,
    key: string,
    type: ParsedType,
    title: string
  ) => {
    const value = e.target.value;

    const updatedFilterList = filterList.map((category) => ({
      ...category,
      element:
        category.title === title
          ? category.element.map((filter: any) => ({
              ...filter,
              isChecked:
                filter.value.toString() === value
                  ? !filter.isChecked
                  : filter.isChecked,
            }))
          : category.element,
    }));

    // Vérifiez si un élément avec la même valeur existe déjà dans filterList
    const existingFilter = updatedFilterList.find(
      (category) => category.title === title
    );

    if (!existingFilter) {
      // Si le filtre n'existe pas, ajoutez-le à la liste mise à jour
      updatedFilterList.push({
        title: title,
        element: [{ value: value, isChecked: true, name: key, type: type }],
      });
    }

    // Mettez à jour l'état avec la nouvelle copie
    setFilterList(updatedFilterList);

    if (keywords.some((kw) => kw.value === value)) {
      // Si la valeur existe dans keywords, filtrez pour la supprimer
      const updatedKeywords = keywords.filter((kw) => kw.value !== value);
      setKeywords(updatedKeywords);
    } else {
      // Ajoutez la nouvelle keyword à la liste
      setKeywords([
        ...keywords,
        { category: title, key: key, value: value, type: type },
      ]);
    }
  };

  useEffect(() => {
    updateFilterOption();
  }, [choiceFilterOption]);

  const [filterVisibility, setFilterVisibility] = useState<boolean[]>(
    Array(choiceFilterOption.length).fill(false)
  );

  const toggleContentVisibility = (index: number) => {
    const updatedFilterVisibility = [...filterVisibility];
    updatedFilterVisibility[index] = !updatedFilterVisibility[index];
    setFilterVisibility(updatedFilterVisibility);
  };

  useEffect(() => {
    handleChoiceKeywords(keywords);
  }, [keywords]);

  return (
    <>
      <div className={style.filterChoice}>
        <div className={style.title}>
          <IconFilter /> FILTRE
        </div>
        <div className={style.selectInput}>
          <div className={style.selectController}>
            <label className={style.label}>Ajouter filtre</label>
            <InputSelectWithCheckBox
              defaultValue={[]}
              options={filterOption}
              selectedValue={selectedOptions}
              onSelectedOption={handleSelectedOption}
              isDisabled={false}
              styles={customInputSelectStyle}
            />
          </div>
        </div>
      </div>
      {filterList &&
        filterList.map((item: any, index: number) => (
          <div key={`filter-${index}`} className={style.filterList}>
            <div className={style.filterSubtitle}>
              <div className={style.filterClose}>
                <button
                  type="button"
                  onClick={() => {
                    handleCloseFilterConst(item?.title);
                  }}
                >
                  <IconCloseWhite />
                </button>
                <span> {item?.title}</span>
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
              className={`${style.filterContent}  ${
                filterVisibility[index] ? style.hide : ""
              }`}
            >
              {item &&
                item.element.map((filter: any, index: number) => (
                  <div
                    className={style.filterItem}
                    key={`filter-checkbox-${index}`}
                  >
                    <div className={style.filterField}>
                      <input
                        type="checkbox"
                        value={filter.value}
                        checked={filter.isChecked}
                        onChange={(e) =>
                          handleCheck(e, item.name, item.type, item.title)
                        }
                      />
                      <span className={style.itemLabel}> {filter.label} </span>
                      <span className={style.itemCount}> ({filter.count})</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </>
  );
};
