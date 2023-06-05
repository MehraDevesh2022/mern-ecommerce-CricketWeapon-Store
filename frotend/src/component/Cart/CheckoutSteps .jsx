import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, StepConnector } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2), // Reduced spacing between steps
  },
}));

const ColorlibConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 22,
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
  root: {
    backgroundColor: "#000000",

    zIndex: 1,
    color: "#FFFFFF",
 
    width: 40, // Reduced size of step icons
    height: 40, // Reduced size of step icons
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: `3px solid ${theme.palette.background.paper}`,
    fontSize: 18, // Reduced size of step icons
    cursor: "pointer", // Add pointer cursor to indicate clickability
    margin: 0, // Set margin to zero for all steps
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
    { label: "BAG", icon: "1", link: "/bag" },
    { label: "DELIVERY", icon: "2", link: "/delivery" },
    { label: "PAYMENT", icon: "3", link: "/payment" },
    { label: "ORDER COMPLETE", icon: "4", link: "/order-complete" },
  ];

  const handleStepClick = (stepIndex) => {
    if (stepIndex < activeStep) {
      history.push(steps[stepIndex].link);
    }
  };

  return (
    <div className="stepReader" style={{marginTop  : "7rem"}}>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                onClick={() => handleStepClick(index)}
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
