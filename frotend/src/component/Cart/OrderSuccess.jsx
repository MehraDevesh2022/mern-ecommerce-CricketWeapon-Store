import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  orderSuccess: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "9rem",
    backgroundColor: theme.palette.common.white,
  },
  successIcon: {
    fontSize: "8rem",
    color: theme.palette.success.main,
    marginBottom: theme.spacing(4),
  },
  successText: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    fontSize: "2rem",
    color: theme.palette.text.primary,
    textShadow: `2px 2px 4px ${theme.palette.text.secondary}`,
  },
  link: {
    textDecoration: "none",
  },
  viewOrdersButton: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2, 4),
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderRadius: theme.spacing(4),
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#ed1c24",
    },
  },
}));

function OrderSuccess() {
  const classes = useStyles();

  return (
    <div className={classes.orderSuccess}>
      <CheckCircleIcon className={classes.successIcon} />

      <Typography variant="h4" className={classes.successText}>
        Congratulations!
        <br />
        Your Order has been Placed Successfully
      </Typography>
      <Link to="/orders" className={classes.link}>
        <Button variant="contained" className={classes.viewOrdersButton}>
          View Orders
        </Button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
