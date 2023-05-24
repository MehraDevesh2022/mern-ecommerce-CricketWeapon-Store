import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "8rem 1rem",
    width: "fit-content",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    margin: "1rem 2rem",
    height: "100%",

    [theme.breakpoints.down(899)]: {
      padding: "8rem 3rem",
      margin: "1rem 3rem",
    },
    [theme.breakpoints.down(699)]: {
      padding: "8rem 2rem",
      margin: "1rem",
      width: "80%",
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
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: 400,
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
    },
  },
  itemOldPrice: {
    marginLeft: "-8px",
    fontSize: "14px",
    fontWeight: 400,
  },

  contentBottom: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "5rem",
    alignItems: "baseline",
    width: "fit-content",
    [theme.breakpoints.down(599)]: {
      marginLeft: "0rem",
      marginRight: "-1rem",
    },
    [theme.breakpoints.down(550)]: {
      position: "relative",
      marginLeft: "0rem",
    },
  },
  select: {
    marginLeft: "1.2rem",
    width: "fit-content",
    marginRight: "3rem",
    padding: "0 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    [theme.breakpoints.down(599)]: {
      marginRight: "10px",
      marginLeft: "5px",
      padding: "0 5px",
    },
    "& .MuiList-root": {
      border: "1px solid #ccc",
      borderRadius: "4px",
    },

    [theme.breakpoints.down(599)]: {
      "& .MuiSelect-select.MuiSelect-select": {
        paddingRight: "0px",
      },
    },
  },
}));

function CartItem({
  deleteCartItems,
  item,
  handleQuantityChange,
  totalQuantity,
}) {
  const classes = useStyles();

  const product = {
    image:
      "https://as2.ftcdn.net/v2/jpg/00/58/34/89/1000_F_58348981_qmOA8cngHBLOY4QxhNz4hP4LNcERn3JT.jpg",
    title: "AWESOME PRdocut i ever see",
    price: 2333,
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={item.image}
        title={product.title}
      />
      <CardContent className={classes.content}>
        <div className={classes.contentTop}>
          <div className={classes.cartHeader}>
            <Typography variant="subtitle1" className={classes.title}>
              {product.title}
            </Typography>

            <IconButton
              aria-label="delete"
              className={classes.cartDeleteIcon}
              onClick={()=>deleteCartItems(item.productId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>

          <div className={classes.priceItem}>
            <Typography className={classes.cartSubHeadings} variant="body2">
              Price :
            </Typography>
            <Typography variant="subtitle1" className={classes.itemPrice}>
              ₹{product.price}
            </Typography>
            <Typography
              variant="caption"
              component="span"
              color="black"
              className={classes.itemOldPrice}
            >
              <del>₹{1355}</del>
            </Typography>
          </div>
        </div>
        <div className={classes.contentBottom}>
          <Typography variant="body2" className={classes.cartSubHeadings}>
            QTY:
          </Typography>
          <span>
            <Select
              className={classes.select}
              value={totalQuantity}
              onChange={handleQuantityChange}
            >
              {[...Array(item.quantity)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </span>
          <div className={classes.priceItem}>
            <Typography variant="body2" className={classes.cartSubHeadings}>
              TOTAL:
            </Typography>
            <Typography variant="subtitle1" className={classes.price}>
              ₹{item.price * item.quantity}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItem;
