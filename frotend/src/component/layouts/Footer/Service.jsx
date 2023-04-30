import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  FaShippingFast,
  FaShieldAlt,
  FaTags,
  FaCreditCard,
} from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: "#000",
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontFamily: "'Roboto', sans-serif",
  },
  wrapper: {
    display: "flex",
    gap: "2.5rem",
    width: "100%",
    flexWrap: "wrap",
    height: "auto",
    paddingTop: "20px",
    justifyContent: "center",
  },
  card: {
    width: "auto",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    marginLeft: "1rem",
    marginBottom: theme.spacing(2),
  },
  icon: {
    color: "#ed1c24",
    fontSize: "2.5rem",
    marginRight: theme.spacing(2.5),
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  cardInfo: {
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: 300,
    fontSize: "0.8rem",
  },
}));

const servicesData = [
  {
    id: 1,
    icon: <FaShippingFast />,
    title: "Express Delivery",
    info: "Ships in 24 Hours",
  },
  {
    id: 2,
    icon: <FaShieldAlt />,
    title: "Brand Warranty",
    info: "100% Original products",
  },
  {
    id: 3,
    icon: <FaTags />,
    title: "Exciting Deals",
    info: "On all prepaid orders",
  },
  {
    id: 4,
    icon: <FaCreditCard />,
    title: "Secure Payments",
    info: "SSL / Secure сertificate",
  },
];

const Services = () => {
  const classes = useStyles();

  return (
    <>
      <section id="services" className={classes.section}>
        <div className={classes.wrapper}>
          {servicesData.map((item) => {
            const { id, icon, title, info } = item;
            return (
              <div className={classes.card} key={id}>
                <div className={classes.icon}>{icon}</div>
                <div>
                  <div className={classes.cardTitle}>{title}</div>
                  <div className={classes.cardInfo}>{info}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    
    </>
  );
};
export default Services;
