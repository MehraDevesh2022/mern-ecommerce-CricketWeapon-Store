import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  FaShippingFast,
  FaShieldAlt,
  FaTags,
  FaCreditCard,
} from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  section11: {
    backgroundColor: "#000 !important",
    paddingTop: `${theme.spacing(0.5)} !important`,
    paddingBottom: `${theme.spacing(0.5)} !important`,
    fontFamily: "'Roboto', sans-serif !important",
  },
  wrapper11: {
    display: "flex !important",
    gap: "2.5rem !important",
    width: "100% !important",
    flexWrap: "wrap !important",
    height: "auto !important",
    paddingTop: "20px !important",
    justifyContent: "center !important",
  },
  card111: {
    width: "auto !important",
    display: "flex !important",
    alignItems: "center !important",
    backgroundColor: "#111 !important",
    borderRadius: `${theme.spacing(1)} !important`,
    padding: `${theme.spacing(2)} !important`,
    marginLeft: "1rem !important",
    marginBottom: `${theme.spacing(2)} !important`,
  },
  icon111: {
    color: "#ed1c24 !important",
    fontSize: "2.5rem !important",
    marginRight: `${theme.spacing(2.5)} !important`,
  },
  cardTitle11: {
    color: "#fff !important",
    fontWeight: "bold !important",
    fontSize: "1rem !important",
  },
  cardInfo11: {
    color: "rgba(255, 255, 255, 0.7) !important",
    fontWeight: "300 !important",
    fontSize: "0.8rem !important",
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
      <section id="services" className={classes.section11}>
        <div className={classes.wrapper11}>
          {servicesData.map((item) => {
            const { id, icon, title, info } = item;
            return (
              <div className={classes.card111} key={id}>
                <div className={classes.icon111}>{icon}</div>
                <div>
                  <div className={classes.cardTitle11}>{title}</div>
                  <div className={classes.cardInfo11}>{info}</div>
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
