import React  from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Input,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import {
  dispalyMoney,
  generateDiscountedPrice,

} from "../DisplayMoney/DisplayMoney";


const useStyles = makeStyles((theme) => ({
  roots11: {
    display: "flex",
    alignItems: "center",
    padding: "1.5rem 2rem",
    width: "fit-content",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    margin: "1rem 2rem",
    height: "auto",

    [theme.breakpoints.down(899)]: {
      padding: "3rem 3rem",
      margin: "1rem 3rem",
    },
    [theme.breakpoints.down(699)]: {
      padding: "2rem",
      margin: "1rem",
      width: "80%",
    },
    [theme.breakpoints.down(499)]: {
      padding: "2rem",
      margin: "1rem",
      width: "65%",
    },
  },
  root11: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 1rem",
    width: "fit-content",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    margin: "1rem 2rem",
    height: "auto",

    [theme.breakpoints.down(899)]: {
      padding: "3rem",
      margin: "1rem 3rem",
    },
    [theme.breakpoints.down(699)]: {
      padding: "2rem",
      margin: "1rem",
      width: "80%",
    },

    [theme.breakpoints.down(499)]: {
      padding: "2rem",
      margin: "1rem",
      width: "65%",
    },
  },
  media: {
    width: "200px",
    height: "240px",
    marginRight: "16px",

    [theme.breakpoints.down(699)]: {
      with: "35%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
    [theme.breakpoints.down(599)]: {
      with: "30%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
    [theme.breakpoints.down(499)]: {
      with: "20%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "fit-content",

    [theme.breakpoints.down(699)]: {
      padding: "0",
      width: "fit-content",
    },
    [theme.breakpoints.down(599)]: {
      padding: "0",
      width: "fit-content",
    },
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  title: {
    width: "90%",
    fontSize: "1rem",
    fontWeight: 600,
    marginLeft: "1rem",
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
      marginLeft: "0",
    },
    "& .MuiTypography-subtitle1 ": {
      [theme.breakpoints.down(599)]: {
        fontSize: "14px",
      },
    },
  },

  cartDeleteIcon: {
    color: "black",
    marginTop: "-.5rem",

    [theme.breakpoints.down(599)]: {
      marginRight: "-2.5rem",
    },
    "&:hover": {
      color: "#ed1c24",
    },
    [theme.breakpoints.down(499)]: {
      marginRight: "-2rem",
    },
  },

  priceItem: {
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
    marginLeft: "1.2rem",
    [theme.breakpoints.down(599)]: {
      marginLeft: "0rem",
      marginRight: "-1rem",
    },
  },

  cartSubHeadings: {
    fontSize: "16px",
    fontWeight: 500,
    textTransform: "uppercase",
    color: "#414141",
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down(499)]: {
      fontSize: "12px",
    },
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: 400,
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down(499)]: {
      fontSize: "13px",
    },
  },
  itemOldPrice: {
    marginLeft: "-8px",
    fontSize: "14px",
    fontWeight: 400,

    [theme.breakpoints.down(499)]: {
      fontSize: "12px",
    },
  },

  contentBottom: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1rem",
    alignItems: "baseline",
    width: "fit-content",
    flexDirection: "column",
    [theme.breakpoints.down(599)]: {
      marginLeft: "0rem",
      marginRight: "-1rem",
    },
    [theme.breakpoints.down(550)]: {
      position: "relative",
      marginLeft: "0rem",
    },
  },
 
}));




function CartItem({
  deleteCartItems,
  item,
  decreaseQuantity,
  increaseQuantity,
  length,
}) {
  const classes = useStyles();

  /// calculate price after discount

  let finalPrice = generateDiscountedPrice(item.price);
  let discountedPrice = item.price - finalPrice;
  discountedPrice = dispalyMoney(discountedPrice);
  let total = finalPrice * item.quantity;
  total = dispalyMoney(total);
  finalPrice = dispalyMoney(finalPrice);

  return (
    <Card className={length < 2 ? classes.root11 : classes.roots11}>
      <CardMedia
        className={classes.media}
        image={item.image}
        title={item.name}
      />
      <CardContent className={classes.content}>
        <div className={classes.contentTop}>
          <div className={classes.cartHeader}>
            <Typography variant="subtitle1" className={classes.title}>
              {item.name}
            </Typography>

            <IconButton
              aria-label="delete"
              className={classes.cartDeleteIcon}
              onClick={() => deleteCartItems(item.productId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>

          <div className={classes.priceItem}>
            <Typography className={classes.cartSubHeadings} variant="body2">
              Price:
            </Typography>
            <Typography variant="subtitle1" className={classes.itemPrice}>
              {finalPrice}
            </Typography>
            <Typography
              variant="caption"
              component="span"
              color="black"
              className={classes.itemOldPrice}
            >
              <del>{discountedPrice}</del>
            </Typography>
          </div>
        </div>
        <div className={classes.contentBottom}>
          <div className="prod_details_additem">
            <h5>QTY:</h5>
            <div className="additem">
              <IconButton
                onClick={() => decreaseQuantity(item.productId, item.quantity)}
                className="additem_decrease"
              >
                <RemoveIcon />
              </IconButton>
              <Input
                readOnly
                type="number"
                value={item.quantity}
                className="input"
              />
              <IconButton
                onClick={() =>
                  increaseQuantity(item.productId, item.quantity, item.stock)
                }
                className="additem_increase"
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>

          <div className={classes.priceItem}>
            <Typography variant="body2" className={classes.cartSubHeadings}>
              TOTAL:
            </Typography>
            <Typography variant="subtitle1" className={classes.price}>
              {total}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItem;
