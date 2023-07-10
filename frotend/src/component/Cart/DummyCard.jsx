import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useAlert } from "react-alert";
const useStyles = makeStyles({
  creditCard: {
    width: 375,
    height: 225,
    margin: "9rem auto",
    padding: 16,
    borderRadius: 12,
    background: "linear-gradient(45deg, #000000 30%, #4e4e4e 90%)",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    zIndex: 999,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    color: "white",
    cursor: "pointer",
    "&:hover": {
      color: "#ed1c24",
      
    },

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
    bottom: 10,
    width: "fit-content",
    left: "50%",
    padding: "4px 8px",
    transform: "translateX(-50%)",
    fontSize: 16,
    color: "#ed1c24",
    fontWeight: "400",
    cursor: "pointer",
    textDecoration: "underline",
  },

  dialogPaper: {
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  dialogContent: {
    overflow: "hidden",
  },
});

const DummyCard = ({ onClose }) => {
  const classes = useStyles();

const alert = useAlert();
  const handleValueCopy = (value) => {
    navigator.clipboard.writeText(value);
     alert.success("Number Copied");
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle disableTypography>Dummy Card</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <div className={classes.creditCard}>
            <div className={classes.closeButton} onClick={onClose}>
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
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.hint}
            onClick={() => handleValueCopy("4242 4242 4242 4242")}
          >
            Click to copy card number
          </Button>
         
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DummyCard;
