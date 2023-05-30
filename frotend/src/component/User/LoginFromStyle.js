import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "7rem",
    paddingBottom: "3rem",
    height: "auto",
    backgroundColor: "#fff",
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
    fontWeight : "bold",
  },
  nameInput: {
    position: "relative",
    "& > label": {
      left: ".2rem",
    },
    padding: "4px 0px",
    fontSize: "1rem",
    width: "100%",
    marginBottom: theme.spacing(5),
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
    marginTop: theme.spacing(3),
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
    marginTop: theme.spacing(8),
    "&.MuiOutlinedInput-input": {
      padding: "14px 14px",
    },
  },
  textField: {
    marginBottom: theme.spacing(2),
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
  uploadAvatarButton: {
    color: "white",
    backgroundColor: "black",
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

  },
}));

export default useStyles;
