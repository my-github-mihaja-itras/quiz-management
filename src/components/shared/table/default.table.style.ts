export const defaultTableStyle = {
  table: {
    style: {
      height: "69vh",
      paddingRight: "20px",
    },
  },
  responsiveWrapper: {
    style: {
      fontSize: "8px",
    },
  },
  checkbox: {
    style: {
      maxHeight: "18px",
      maxWidth: "18px",
    },
  },
  header: {
    style: {
      color: "#B4B4B4",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
  },
  headRow: {
    style: {
      color: "#B4B4B4",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
  },
  headCells: {
    style: {
      fontSize: "12px",
      fontWeight: "600",
      // margin: 0,
      // padding: 0,
    },
  },
  tableWrapper: {
    style: {
      display: "table",
    },
  },
  cells: {
    style: {
      fontSize: "12px",
      color: "#5C5C5C",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      height: "40px",
      minHeight: "46px",
      // margin: 0,
      // padding: 0,
    },
  },
  pagination: {
    style: {
      color: "#0231A8",
      fontSize: "12px",
      minHeight: "56px",
      backgroundColor: "#fff",
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      cursor: "pointer",
      transition: "0.4s",
      color: "#4b3737",
      fill: "#d8e1f5",
      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "unset",
        color: "#000",
        fill: "#000",
      },
      "&:hover:not(:disabled)": {
        backgroundColor: "#d8e1f5",
      },
      "&:focus": {
        outline: "none",
        backgroundColor: "transparent",
      },
    },
  },
  noData: {
    style: {
      fontFamily: "Roboto",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#5C5C5C",
    },
  },
};
export const customTableStyle = {
  table: {
    style: {
      height: "auto",
    },
  },
  responsiveWrapper: {
    style: {
      fontSize: "8px",
    },
  },
  header: {
    style: {
      color: "#B4B4B4",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
    },
  },
  headRow: {
    style: {
      color: "#B4B4B4",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
  },
  headCells: {
    style: {
      fontSize: "12px",
      fontWeight: "600",
    },
  },
  tableWrapper: {
    style: {
      display: "table",
    },
  },
  cells: {
    style: {
      fontSize: "12px",
      color: "#5C5C5C",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      height: "40px",
      minHeight: "46px",
    },
  },
  pagination: {
    style: {
      color: "#0231A8",
      fontSize: "12px",
      minHeight: "56px",
      backgroundColor: "#fff",
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      cursor: "pointer",
      transition: "0.4s",
      color: "#4b3737",
      fill: "#d8e1f5",
      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "unset",
        color: "#000",
        fill: "#000",
      },
      "&:hover:not(:disabled)": {
        backgroundColor: "#d8e1f5",
      },
      "&:focus": {
        outline: "none",
        backgroundColor: "transparent",
      },
    },
  },
  noData: {
    style: {
      fontFamily: "Roboto",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#5C5C5C",
    },
  },
};

export const competitionResultTableStyle = {
  table: {
    style: {
      borderBottom: "none", // Supprimer les bordures inférieures des lignes
      // height: "30vh",
      minHeight: "280px",
    },
  },
  tableWrapper: {
    style: {
      display: "table",
    },
  },

  header: {
    style: {
      color: "#5C5C5C",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      background: "#F7F7F7",
      borderBottom: "none",
    },
  },

  headRow: {
    style: {
      color: "#5C5C5C",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      height: "38px",
      background: "#F7F7F7",
      minHeight: "38px",
      borderBottom: "none", // Supprimer les bordures inférieures des lignes du header
    },
  },
  rows: {
    style: {
      borderBottom: "none", // Supprimer les bordures inférieures des lignes*
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "#fff0",
      },
    },
  },
  subHeader: {
    style: {
      borderBottom: "none !important", // Supprimer les bordures inférieures des lignes du sub-header
      minHeight: "38px",
    },
  },
  cells: {
    style: {
      fontSize: "12px",
      color: "#5C5C5C",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",

      borderBottom: "none", // Supprimer les bordures inférieures des Cellules
    },
  },
  noData: {
    style: {
      fontFamily: "Roboto",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#5C5C5C",
    },
  },
};

export const historyTableStyle = {
  table: {
    style: {
      borderBottom: "none", // Supprimer les bordures inférieures des lignes
      minHeight: "280px",
      paddingRight: "16px",
    },
  },
  tableWrapper: {
    style: {
      display: "table",
    },
  },

  header: {
    style: {
      color: "#5C5C5C",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      background: "#F7F7F7",
      borderBottom: "none",
    },
  },

  headRow: {
    style: {
      color: "#5C5C5C",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      height: "38px",
      background: "#F7F7F7",
      minHeight: "38px",
      borderBottom: "none", // Supprimer les bordures inférieures des lignes du header
    },
  },
  rows: {
    style: {
      borderBottom: "none", // Supprimer les bordures inférieures des lignes*
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "#fff0",
      },
    },
  },
  subHeader: {
    style: {
      borderBottom: "none !important", // Supprimer les bordures inférieures des lignes du sub-header
      minHeight: "38px",
    },
  },
  cells: {
    style: {
      fontSize: "12px",
      color: "#5C5C5C",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",

      borderBottom: "none", // Supprimer les bordures inférieures des Cellules
    },
  },
  noData: {
    style: {
      fontFamily: "Roboto",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#5C5C5C",
    },
  },
};

export const eventTableStyle = {
  table: {
    style: {
      borderBottom: "none",
      minHeight: "280px",
      paddingRight: "16px",
    },
  },
  tableWrapper: {
    style: {
      display: "table",
    },
  },

  header: {
    style: {
      color: "#5C5C5C",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      background: "#F7F7F7",
      borderBottom: "none",
    },
  },

  headRow: {
    style: {
      color: "#5C5C5C",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      height: "38px",
      background: "#F7F7F7",
      minHeight: "38px",
      borderBottom: "none", // Supprimer les bordures inférieures des lignes du header
    },
  },
  rows: {
    style: {
      borderBottom: "none", // Supprimer les bordures inférieures des lignes*
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "#fff0",
      },
    },
  },
  subHeader: {
    style: {
      borderBottom: "none !important", // Supprimer les bordures inférieures des lignes du sub-header
      minHeight: "38px",
    },
  },
  cells: {
    style: {
      fontSize: "12px",
      color: "#5C5C5C",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      display: "flex",
      justifyContent: "left",
      alignItems: "left",
      borderBottom: "none", // Supprimer les bordures inférieures des Cellules
    },
  },
  noData: {
    style: {
      fontFamily: "Roboto",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#5C5C5C",
    },
  },
  expanderRow: {
    style: {
      color: "#5C5C5C",
      background: "#F7F7F7",
      position: "relative", // Ajoutez une position relative au conteneur de la ligne
      // order: "9999", // Place l'expander à la fin
    },
  },
  expanderCell: {
    style: {
      flex: "0 0 48px",
      position: "relative",
      order: "9999",
    },
  },
  expanderButton: {
    style: {
      color: "#5C5C5C",
      backgroundColor: "transparent",
      borderRadius: "2px",
      transition: "0.25s",
      height: "100%",
      width: "100%",
      marginLeft: "auto",
    },
  },
};
