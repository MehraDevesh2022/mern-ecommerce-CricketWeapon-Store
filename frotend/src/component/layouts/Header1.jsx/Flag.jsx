import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
// import theme from "@mui/material/styles/theme";
const countryOptions = [
  { code: "in", label: "India", flag: "https://flagcdn.com/in.svg" },
  { code: "us", label: "USA", flag: "https://flagcdn.com/us.svg" },
  { code: "gb", label: "UK", flag: "https://flagcdn.com/gb.svg" },
  { code: "fr", label: "France", flag: "https://flagcdn.com/fr.svg" },
  // ... add more countries here
];

const useStyles = makeStyles(() => ({
  flagIcon: {
    width: 15,
    height: 15,
    alignSelf: "center",
    paddingRight: "1px",
    
  },
  countryName: {
    fontSize: 12,
    color: "white",
    alignSelf: "center",
    fontFamily: "Roboto",
    marginLeft: 5,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    backgroundColor: "black",
  },
}));

const FlagSelect = ({ value = "in", onChange }) => {
  const classes = useStyles();

  const handleImageError = (event) => {
    event.target.src = "https://via.placeholder.com/16x12?text=?";
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      sx={{
        display : "flex",
        alignItems :"center",
        border: "none",
        "&:focus": { border: "none" },
        "&:before": { border: "none" },
        height: 20,
        width: "auto",
        "& .MuiSelect-icon": {
          color: "white",
        },
      }}
    >
      {countryOptions.map((option) => (
        <MenuItem
          key={option.code}
          value={option.code}
          className={classes.menuItem}
        >
          <img
            src={option.flag}
            alt={`${option.label} flag`}
            className={classes.flagIcon}
            onError={handleImageError}
          />
          <span className={classes.countryName}>{option.label}</span>
        </MenuItem>
      ))}
    </Select>
  );
};

export default FlagSelect;
