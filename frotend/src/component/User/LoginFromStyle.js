import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "7rem",
    paddingBottom: "3rem",
    height: "auto",

    backgroundColor: "white",
  },
  form: {
    width: "350px",
    margin: "auto",
    borderRadius: "5px",
    padding: "2rem",
  },

  heading: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
    color: "#414141",
    fontWeight: "bold",
  },
  nameInput: {
    position: "relative",
    "& > label": {
      left: ".2rem",
    },
    padding: "4px 0px",
    fontSize: "1rem",
    width: "100%",
    marginBottom: theme.spacing(5.5),
    height: ".7rem",
  },
  emailInput: {
    position: "relative",
    "& > label": {
      left: ".2rem",
    },
    padding: "4px 0px",
    fontSize: "1rem",
    width: "100%",
    marginTop: "3rem",
    height: ".7rem",
  },
  passwordInput: {
    position: "relative",
    "& > label": {
      left: ".2rem",
    },
    padding: "4px 0px",
    width: "100%",
    height: ".7rem",
    marginTop: theme.spacing(5.5),
    "&.MuiOutlinedInput-input": {
      padding: "14px 14px",
    },
  },

  strengthIndicator: {
    marginTop: theme.spacing(1),
  },

  showPasswordButton: {
    position: "absolute",
    top: "50%",
    color: "rgb(0 0 0 / 85%)",
    fontSize: "12px",
    right: theme.spacing(2),
    transform: "translateY(-50%)",
    border: "none",
    "&:hover": {
      color: "#ed1c24",
      background: "none",
    },
  },
  rememberMeContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    marginTop: theme.spacing(7),
    "& .MuiIconButton-label": {
      color: "black",
    },
  },
  forgotPasswordLink: {
    color: "#000",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      color: "#ed1c24",
    },
  },
  termsAndConditionsText: {
    fontFamily: "Roboto",
    color: "#727272",
    textAlign: "center",
    lineHeight: "17px",
    paddingLeft: "4px",
    marginTop: theme.spacing(2),
    fontSize: "12px",
  },
  loginButton: {
    color: "#fff",
    backgroundColor: "#000",
    border: "2px solid #000",
    margin: `${theme.spacing(3)}px 0`,
    marginTop: "1rem",
    "&:disabled": {
      backgroundColor: "#444444", // faded black
      color: "#FFFFFF",
      borderColor: "#444444",
    },
    "&:hover": {
      backgroundColor: "#ff0000",
      borderColor: "#ff0000",
    },
  },
  privacyText: {
    marginLeft: "4px",
    textDecoration: "underline",
    color: "black",
    fontSize: "14px",
    "&:hover": {
      color: "#ed1c24",
    },
  },
  createAccount: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#121212",
    paddingLeft: "6px",
    "&:hover": {
      color: "#ed1c24",
      textDecoration: "underline",
    },
  },
  // input text Filed
  textField: {
    marginBottom: theme.spacing(2),
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black",
      padding: "12px 14px",
    },
    "& .MuiInputLabel-root": {
      color: "black",
      fontSize: "14px",
      textAlign: "center",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
      fontSize: "14px",
      textAlign: "center",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "black",
        color: "black",
      },
      "& .MuiOutlinedInput-input": {
        padding: "13px 8px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
        color: "black",
        outline: "none",
      },
    },
  },

  // signUp

  avatar: {
    margin: " 8px auto",
    backgroundColor: "black",
  },
  gridcheckbox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "3rem",
  },
  checkbox: {
    "& .MuiTypography-body1": {
      fontSize: "14px",
    },
    marginTop: theme.spacing(1),
    "& .MuiIconButton-label": {
      color: "black",
    },
  },

  // image uploader
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "3.5rem",
  },
  avatar2: {
    marginLeft: "6px",
    backgroundColor: "black",
    "&.MuiAvatar-colorDefault": {
      color: "#fff",
      backgroundColor: "black",
    },
    "&:hover": {
      backgroundColor: "#ed1c24",
    },
  },
  input: {
    display: "none",
  },

  // Update and create product styles ====================>>

  updateProduct: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    width: "100%",
    gap: "1rem",
    overflow: "hidden",
    margin: "-1.1rem 0 0 0",
    padding: 0,
  },
  firstBox1: {
    width: "20%",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
    [theme.breakpoints.down("999")]: {
      display: "none",
    },
  },

  toggleBox1: {
    width: "16rem",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
    zIndex: "100",
    position: "absolute",
    top: "58px",
    left: "17px",
  },
  secondBox1: {
    width: "75%",
    backgroundColor: "#f1f1f1",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    margin: "-0.5rem 0 0 0",
    gap: "10px",
    justifyContent: "center",
    [theme.breakpoints.down("999")]: {
      width: "100%",
    },
  },
  navBar1: {
    margin: "0rem",
  },

  form2: {
    marginTop: "-6rem",
  },
  uploadAvatarButton: {
    color: "white",
    width: "fit-content",
    backgroundColor: "#414141",
    height: "2.5rem",
    "&:hover": {
      backgroundColor: "#ed1c24",
    },
  },

  uploadAvatarText: {
    fontSize: "14px",
    backgroundColor: "inherit",
    fontWeight: 500,
    color: "#fff",

    padding: "0 1rem",
  },

  imgIcon: {
    width: "auto",
    marginLeft: "1rem",
    alignSelf: "center",
    "& svg": {
      color: "#414141",
      fontSize: "2.5rem !important", 
      boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.3)`,
    },
  },

  descriptionInput: {
    marginTop: theme.spacing(5.5),
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
        color: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
        color: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
        color: "black",
        outline: "none",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "13px 8px",
    },
    "& .MuiInputLabel-root": {
      color: "black",
      fontSize: "14px",
      textAlign: "center",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
      fontSize: "14px",
      textAlign: "center",
    },
  },
  descriptionIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  selectOption: {
    marginTop: theme.spacing(5.5),
    position: "relative",
    width: "100%",
  },

  imageArea: {
    display: "flex",
    gap: "18px",
    width: "90%",
    overflowX: "scroll",
    scrollbarWidth: "10px",
    margin: "2rem 0",
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "5px",
    },
    padding: "3px 16px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.shape.borderRadius,
  },
  image: {
    width: "4.5rem ",
    height: "4rem ",
    objectFit: "cover",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.shape.borderRadius,
  },
  labelText: {
    color: "#414141",
    fontSize: "14px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "14px",
    pointerEvents: "none",
    opacity: (props) => (props.category ? 0 : 1),
    transition: "opacity 0.3s ease",
  },
  formControl: {
    width: "100%",
  },
  select: {
    "& .MuiOutlinedInput-input": {
      padding: "13px 8px",
    },
    "& .MuiInputLabel-outlined": {
      pointerEvents: "none",
      fontSize: "14px",
      textAlign: "center",
      color: "#414141",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#ed1c24",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
        outlineColor: "black",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
      },
    },
    "& .MuiSelect-root": {
      padding: "10px",
      color: "black",
    },
    "& .MuiSelect-icon": {
      marginRight: "-4px",
      color: "gray",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "#ed1c24",
      color: "white",
    },
  },

  menu: {
    marginTop: theme.spacing(1),
    "& .MuiMenuItem-root": {
      color: "black",
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "#ed1c24",
      color: "white",
    },
  },
}));

export default useStyles;
