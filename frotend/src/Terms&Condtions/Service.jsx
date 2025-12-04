import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import {
  LocalShipping,
  Security,
  LocalOffer,
  CreditCard,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  Services_section: {
    backgroundColor: "#0F0F1A",
    padding: theme.spacing(6, 2),
    fontFamily: "'Roboto', sans-serif",
  },
  Services_wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  Services_card: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "16px",
    padding: theme.spacing(3),
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "default",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.06)",
      borderColor: "rgba(227, 6, 5, 0.3)",
      transform: "translateY(-4px)",
    },
  },
  Services_iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
    backgroundColor: "rgba(227, 6, 5, 0.1)",
    borderRadius: "12px",
    marginRight: theme.spacing(2.5),
  },
  Services_icon: {
    color: "#E30605",
    "& svg": {
      fontSize: "1.75rem !important",
    },
  },
  Services_content: {
    flex: 1,
  },
  Services_cardTitle: {
    color: "#FFFFFF",
    fontFamily: "'Archivo', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    marginBottom: "4px",
    letterSpacing: "0.3px",
  },
  Services_cardInfo: {
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.5,
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Services = () => {
  const classes = useStyles();

  return (
    <div className={classes.Services_section}>
      <motion.div 
        className={classes.Services_wrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {servicesData.map((item) => (
          <motion.div 
            className={classes.Services_card} 
            key={item.id}
            variants={cardVariants}
          >
            <div className={classes.Services_iconWrapper}>
              <div className={classes.Services_icon}>{item.icon}</div>
            </div>
            <div className={classes.Services_content}>
              <div className={classes.Services_cardTitle}>{item.title}</div>
              <div className={classes.Services_cardInfo}>{item.info}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;
