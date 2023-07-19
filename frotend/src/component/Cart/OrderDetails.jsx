import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  rootPayment: {
    width: "100%",
    display: "flex",
    gap: "2.5rem",
    padding: "1rem 0rem 0rem 0rem",
    
      


  },
  image: {
    width: "155px",
    height: "140px",
    objectFit: "cover",
    [theme.breakpoints.down(899)]: {
      width: "255px",
      height: "240px",
    },
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  productName: {
    fontWeight: "500",
    fontSize: "18px",
    marginBottom: theme.spacing(1),
  },
  quantity: {
    fontSize: 16,
    marginBottom: theme.spacing(1),
    color: "#00000080",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
  },
  finalPrice: {
    fontWeight: 400,
    fontSize: 16,
  },
  discountPrice: {
    textDecoration: "line-through",
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2),
    fontSize: 16,
  },
  paymentStatus: {
    color: "green",
    fontSize: 16,
    marginTop: theme.spacing(1),
  },
  paymentValue: {

    fontWeight: 400,
    marginRight: "10px",
    color: "#00000080",
  },
}));

const OrderDetailsSection = ({ item, totalDiscount, totalPrice }) => {
  const classes = useStyles();

  return (
    <div className={classes.rootPayment}>
      <img src={item.image} alt={item.name} className={classes.image} />
      <div className={classes.details}>
        <Typography variant="subtitle1" className={classes.productName}>
          {item.name}
        </Typography>
        <Typography variant="body2" className={classes.quantity}>
          <span
            style={{ fontWeight: 400, marginRight: "10px", color: "#00000080" }}
          >
            Quantity:
          </span>{" "}
          {item.quantity}
        </Typography>
        <div className={classes.priceContainer}>
          <Typography variant="body2" className={classes.finalPrice}>
            {totalPrice}
          </Typography>
          <Typography variant="body2" className={classes.discountPrice}>
            {totalDiscount}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" className={classes.paymentStatus}>
            <span className={classes.paymentValue}>Payment:</span> Paid
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSection;
