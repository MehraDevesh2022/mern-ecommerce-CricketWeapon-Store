import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  LocalShipping,
  Security,
  LocalOffer,
  CreditCard,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  Services_section: {
    backgroundColor: "#000",
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontFamily: "'Roboto', sans-serif",
  },
  Services_wrapper: {
    display: "flex",
    gap: "2.5rem",
    width: "100%",
    flexWrap: "wrap",
    height: "auto",
    paddingTop: "20px",
    justifyContent: "center",
  },
  Services_card: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    marginLeft: "1rem",
    marginBottom: theme.spacing(2),
  },
  Services_icon: {
    color: "#ed1c24",
    fontSize: "3rem",
    marginRight: theme.spacing(2.5),
    "& svg": {
      fontSize: "3rem !important",
    },

  },
  Services_cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  Services_cardInfo: {
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: 300,
    fontSize: "0.8rem",
  },
}));

const servicesData = [
  {
    id: 1,
    icon: <LocalShipping fontSize="large" />,
    title: "Express Delivery",
    info: "Ships in 24 Hours",
  },
  {
    id: 2,
    icon: <Security fontSize="large" />,
    title: "Brand Warranty",
    info: "100% Original products",
  },
  {
    id: 3,
    icon: <LocalOffer fontSize="large" />,
    title: "Exciting Deals",
    info: "On all prepaid orders",
  },
  {
    id: 4,
    icon: <CreditCard fontSize="large" />,
    title: "Secure Payments",
    info: "SSL / Secure сertificate",
  },
];

const Services = () => {
  const classes = useStyles();

  return (
    <>
      <div  className={classes.Services_section}>
        <div className={classes.Services_wrapper} style={{ width: "100%" }}>
          {servicesData.map((item) => {
            
            return (
              <div className={classes.Services_card} key={item.id}>
                <div className={classes.Services_icon}>{item.icon}</div>
                <div>
                  <div className={classes.Services_cardTitle}>{item.title}</div>
                  <div className={classes.Services_cardInfo}>{item.info}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Services;
