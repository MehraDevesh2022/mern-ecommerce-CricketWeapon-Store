import { makeStyles } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
  reviewRoot: {
    padding: theme.spacing(2),
    marginTop: "2rem",
    backgroundColor: "white",
    width: "100%",
    overflow: "hidden",
  },
  reviewHeader: {
    margin: "1rem auto",
    textAlign: "center",
    fontWeight: 800,
    fontSize: "2rem !important",
    marginBottom: theme.spacing(2),
    color: "#414141",
  },
  subHeadings: {
    fontSize: "16px",
    color: "#414141",
    fontWeight: 700,
  },
  bodyText: {
    fontSize: "14px",
    color: "#414141",
    fontWeight: 500,
  },
  radioText: {
    fontSize: "14px",
    color: "#414141",
  },
  radioButton: {
    color: "#000000",
  },

  submitBtn: {
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    minHeight: "48px",
    padding: "0px 16px",
    width: "fit-content",
    background: "rgb(37, 37, 37)",
    color: "rgb(255, 255, 255)",
    "&:hover": {
      backgroundColor: "rgba(222, 9, 9, 0.744)",
      borderColor: "rgba(222, 9, 9, 0.744)",
      transform: "scale(1.05)",
    },
  },
  ratingContainer: {
    marginTop: "1rem 0",
    display: "inline-block",
    marginRight: theme.spacing(),
  },
  star: {
    color: "black",
    fontSize: 24,
    marginTop: "2px",
  },
  ratingNumber: {
    display: "inline-block",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1.5),
    fontWeight: "bold",
    fontSize: "1rem",
  },


  selectContainer: {
    textAlign: "right",
    marginTop: "-50px",
    display: "flex",
    flexDirection: "column",
paddingRight:"1.5rem",

},




sortBy: {
  [theme.breakpoints.down("xs")]: {
  visibility: "hidden",
  },

},
  select: {
    "& .MuiSelect-select": {
      paddingTop: "12px",
      paddingBottom: "12px",
      paddingLeft: "10px",
      paddingRight: "35px",
      borderRadius: "6px",
      fontSize: "14px",
      border: "1px solid #252525",
      position: "relative",
      "&:focus": {
        borderRadius: "6px",
        borderColor: "#252525",
      },
    },

    "& .MuiSelect-icon": {
      top: "calc(50% - 12px)",
      right: "12px",
    },
    [theme.breakpoints.down("xs")]: {
      visibility : "hidden",
    },
  },
  menuItem: {
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(222, 9, 9, 0.744)",
    },
    "&.Mui-selected": {
      backgroundColor: "rgba(222, 9, 9, 0.744)",
      color: "white",
    },
  },

  //dialog box

  textField: {
    "& .MuiOutlinedInput-root": {
      fontSize: "16px",
      fontWeight: 400,
      color: "black",

      "&.Mui-focused fieldset": {
        borderColor: "#414141",
      },
    },
  },

  dialog: {
    width: "80vw",
    height: "70vh",
    marginT: 0,
    padding: "3rem",
    overflow: "hidden",
  },
  dialogContent: {
    height: "100%",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.2em",
      height: "0.2em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "white",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
      borderRadius: "10px",
    },
  },
  container: {
    display: "flex",
    flexDirection: "row",
    overflowX: "scroll",
    margin: 10,
    backgroundColor: "#f5f5f5",
    marginTop: "1rem",
    width: "100vw",
    "&::-webkit-scrollbar": {
      width: "0.5em",
      height: "0.5em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#414141",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
      borderRadius: "10px",
    },
  },
}));
