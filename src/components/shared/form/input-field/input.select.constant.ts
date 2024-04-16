export const defaultInputSelectStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "5px",
    border: state.isDisabled ? "1px solid #eeeeee" : "1px solid #D1DEFB",
    background: state.isDisabled ? "#fff" : "#fff",
    ":focus": {
      border: "1px solid #0fc3ed",
    },
    ":focus-within": {
      border: "1px solid #0fc3ed",
    },
    ":hover": {
      border: "1px solid #0fc3ed",
    },
    boxShadow: "none",
    fontSize: 12,
    backgroundColor: "white",
    outline: "none",
  }),
  multiValue: (base: any) => ({
    ...base,
    height: "25px",
    backgroundColor: "#f7f7f7",
    borderRadius: "25px",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingRight: "3px",
    paddingLeft: "3px",
    color: "#5c5c5c",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    ":hover": {
      background: "#f7f7f7",
      color: "#939393",
    },
    gap: "3px",
  }),
  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    display: "none",
  }),
  clearIndicator: (provided: any, state: any) => ({
    ...provided,

    display: "none",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "#939393",
    fontSize: "8px",
    cursor: "pointer",
  }),

  multiValueRemove: (provided: any, state: any) => ({
    ...provided,
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#e1e1e1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "#939393",
    fontSize: "16px",
    cursor: "pointer",
    ":hover": {
      background: "#d8d8d8",
      color: "#939393",
    },

    ":active": {
      background: "#d8d8d8",
      color: "#939393",
    },
  }),

  option: (provided: any, state: any) => ({
    ...provided,

    color: "#0231a8",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    display: "flex",
    justifyContent: " start",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    border: "1px solid #d1defb",
    gap: "5px",
    background: state.isSelected ? "#dae1f0" : "#f2f6ff",
    ":hover": {
      background: "#ebf0fd",
    },
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,

    color: "#79797b",
    fontFamily: "Roboto",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    display: "flex",
  }),

  noOptionsMessage: (provided: any, state: any) => ({
    ...provided,
    color: "#797979", // Couleur du texte du message
    fontFamily: "Roboto", // Police de caractères
    fontSize: "14px", // Taille de la police
    fontStyle: "italic", // Style de police
    fontWeight: 400, // Poids de la police
    lineHeight: "normal", // Hauteur de ligne
    display: "block", // Affichage en bloc
  }),

  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "#D4E1FF",
    cursor: "pointer",
    ".react-select__control--is-focused &": {
      border: "1px solid #0fc3ed",
    },
  }),
};
export const customInputSelectStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "5px",
    fontFamily: "Roboto",
    color: "#5c5c5c;",
    border: state.isDisabled ? "1px solid #eeeeee" : "1px solid #eeeeee",
    background: state.isDisabled ? "#fff" : "#fff",
    ":focus": {
      border: "1px solid #0fc3ed",
    },
    ":focus-within": {
      border: "1px solid #0fc3ed",
    },
    ":hover": {
      border: "1px solid #0fc3ed",
    },
    boxShadow: "none",
    fontSize: 12,
    backgroundColor: "white",
    outline: "none",
    zIndex: 1000,
  }),
  // Style pour la valeur sélectionnée
  singleValue: (provided: any) => ({
    ...provided,
    color: "#5c5c5c", // Couleur du texte pour la valeur sélectionnée
  }),
  multiValue: (base: any) => ({
    ...base,
    height: "25px",
    backgroundColor: "#f7f7f7",
    borderRadius: "25px",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingRight: "3px",
    paddingLeft: "3px",
    color: "#5c5c5c",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    ":hover": {
      background: "#f7f7f7",
      color: "#939393",
    },
    gap: "3px",
  }),
  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    display: "none",
  }),
  clearIndicator: (provided: any, state: any) => ({
    ...provided,
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "#939393",
    fontSize: "8px",
    cursor: "pointer",
  }),
  multiValueRemove: (provided: any, state: any) => ({
    ...provided,
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#e1e1e1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "#939393",
    fontSize: "16px",
    cursor: "pointer",
    ":hover": {
      background: "#d8d8d8",
      color: "#939393",
    },

    ":active": {
      background: "#d8d8d8",
      color: "#939393",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: "#5c5c5c;",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    display: "flex",
    justifyContent: " start",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    pointer: "cursor",
    gap: "5px",
    background: state.isSelected ? "#fff" : "#fff",
    ":hover": {
      background: "#f7f7f7",
    },
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: "#79797b",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    display: "flex",
  }),
  noOptionsMessage: (provided: any, state: any) => ({
    ...provided,
    color: "#797979", // Couleur du texte du message
    fontFamily: "Roboto", // Police de caractères
    fontSize: "14px", // Taille de la police
    fontStyle: "italic", // Style de police
    fontWeight: 400, // Poids de la police
    lineHeight: "normal", // Hauteur de ligne
    display: "block", // Affichage en bloc
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "#D4E1FF",
    cursor: "pointer",
    ".react-select__control--is-focused &": {
      border: "1px solid #0fc3ed",
    },
  }),
};
