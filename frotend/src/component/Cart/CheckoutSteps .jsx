import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, StepConnector } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.down("xm")]: {
      fontSize: 12,
   
    },
  },
}));

const ColorlibConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
  },
  active: {
    "& $line": {
      backgroundColor: "#000000",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#000000",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#dddddd",
    borderRadius: 1,
  },
}))(StepConnector);

const useColorlibStepIconStyles = makeStyles((theme) => ({
  stepReader :{
   
    [theme.breakpoints.down("xs")]: {
      marginLeft: "-2rem",
    },
  },
  root: {
    backgroundColor: "#000000",
    zIndex: 1,
    color: "#FFFFFF",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: `2px solid ${theme.palette.background.paper}`,
    fontSize: 16,
    cursor: "pointer",
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      width: 20,
      height: 20,
      fontSize: 14,
    },
    [theme.breakpoints.down("xs")]: {
      width: 15,
      height: 15,
      fontSize: 12,
       
      "& .MuiStepLabel-label": {
        fontSize: 12,
      },
    },
  },
  active: {
    backgroundColor: "#ed1c24",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    marginTop: "0rem",
  },
  completed: {
    backgroundColor: "#000000",
    margin: "0rem",
  },

  stepLabel: {
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      "&.MuiStepLabel-label ": {
        fontSize: 12,
      },
      fontSize: 12,
    },
  },
}));

const ColorlibStepIcon = ({ active, completed, icon, onClick }) => {
  const classes = useColorlibStepIconStyles();

  return (
    <div
      className={`${classes.root} ${active && classes.active} ${completed &&
        classes.completed}`}
      onClick={onClick}
      style={
        !active && !completed
          ? { backgroundColor: "#666666", marginTop: "0", color: "white" }
          : null
      }
    >
      {icon}
    </div>
  );
};

const CheckoutSteps = ({ activeStep }) => {
  const classes = useStyles();
  const history = useHistory();

  const steps = [
    { label: "BAG", icon: "1", link: "/cart" },
    { label: "DELIVERY", icon: "2", link: "/shipping" },
    { label: "PAYMENT", icon: "3", link: "/process/payment" },
    { label: "ORDER COMPLETE", icon: "4", link: "/success" },
  ];

  const handleStepClick = (stepIndex) => {
    if (stepIndex < activeStep) {
      history.push(steps[stepIndex].link);
    }
  };

  return (
    <div className={classes.stepReader} style={{ marginTop: "7rem" }}>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                onClick={() => handleStepClick(index)}
                className={classes.stepLabel}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default CheckoutSteps;
