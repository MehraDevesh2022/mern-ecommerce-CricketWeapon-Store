import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  creditCard: {
    width: 375,
    height: 225,
    margin: "19rem auto",
    padding: 16,
    borderRadius: 12,
    background: "linear-gradient(45deg, #000000 30%, #4e4e4e 90%)",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    color: "white",
    cursor: "pointer",
  },
  chip: {
    width: 60,
    height: 40,
    borderRadius: "50%",
    background: "linear-gradient(45deg, silver 30%, gold 90%)",
    position: "absolute",
    top: 16,
    left: 16,
  },
  creditCardText: {
    fontSize: 14,
    position: "absolute",
    top: 16,
    right: 64,
    cursor: "pointer",
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: "40px 0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
  },
  cardDetails: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
    transform: "translateZ(0)",
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 16,
    background: "rgba(0, 0, 0, 0.8)",
    borderRadius: 8,
    color: "white",
    zIndex: 9999,
  },
  hint: {
    position: "absolute",
    bottom: 16,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 12,
    color: "black",
    cursor: "pointer",
    textDecoration: "underline",
  },
});

const CreditCard = () => {
  const classes = useStyles();
  const [popupVisible, setPopupVisible] = useState(false);

  const handleValueCopy = (value) => {
    navigator.clipboard.writeText(value);
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 2000);
  };

  const handleClose = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div className={classes.creditCard}>
        <div className={classes.closeButton} onClick={handleClose}>
          X
        </div>
        <div className={classes.chip}></div>
        <div
          className={classes.creditCardText}
          onClick={() => handleValueCopy("CREDIT CARD")}
        >
          CREDIT CARD
        </div>
        <div
          className={classes.cardNumber}
          onClick={() => handleValueCopy("4242 4242 4242 4242")}
        >
          4242 4242 4242 4242
        </div>
        <div className={classes.cardDetails}>
          <div>
            <div className={classes.label}>EXPIRY</div>
            <div
              className={classes.value}
              onClick={() => handleValueCopy("12/23")}
            >
              12/23
            </div>
          </div>
          <div>
            <div className={classes.label}>CVV</div>
            <div
              className={classes.value}
              onClick={() => handleValueCopy("123")}
            >
              123
            </div>
          </div>
        </div>
        <div
          className={classes.value}
          onClick={() => handleValueCopy("Robert Downey Jr")}
        >
          Robert Downey Jr
        </div>
      </div>

      {popupVisible && (
        <div className={classes.popup}>Copied successfully!</div>
      )}

      <div
        className={classes.hint}
        onClick={() => handleValueCopy("4242 4242 4242 4242")}
      >
        Click to copy card number
      </div>
    </>
  );
};

export default CreditCard;
