import React,{useState} from "react";
import {
  Card,
  Typography,
  Button,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ReplayIcon from "@mui/icons-material/Replay";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import {useAlert} from "react-alert";
import { addItemToCart } from "../../actions/cartAction";
import {useHistory} from "react-router-dom";
import DialogBox from "../Product/DialogBox";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  orderCard: {
    display: "flex",
    flexDirection: "column",

    justifyContent: "space-between",

    borderRadius: 2,

    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
  },
  firstBlock: {
    height: "fit-content",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    width: "100%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop:"1rem",
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",

    padding: "0rem 0rem  1rem",
    justifyContent: "center",
  },
  orderPlaced: {
    fontWeight: "bold",
  },
  orderDate: {
    color: "#141414",
  },
  totalPrice: {
    fontWeight: "bold",
    paddingRight: "5rem",
  },
  orderId: {
    paddingTop: "10px",
    fontWeight: "800",
  },
  divider: {
    margin: "1.5rem 0rem",
    width: "50%",
  },
  secondBlock: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 2,
    marginBottom: 2,
    padding: "0rem 1rem",
  },
  secondBlock_left: {
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
  },
  secondBlock_right: {
    width: "fit-content",
    display: "flex",
    justifyContent: "flex-end   ",
    padding: "1rem 0rem",
  },

  productDetailsContainer: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    padding: "1rem 0rem",

    marginBottom: 1,
  },
  productName: {
    fontWeight: "bold",
    marginBottom: 1,
  },
  productQty: {
    marginBottom: 1,
  },
  deliveryStatus: {
    marginBottom: 1,
  },

  button: {
    marginRight: 1,
    color: "rgb(37, 37, 37) !important",
    cursor: "pointer",
    backgroundColor: "transparent !important",

    border: "1px solid rgb(37, 37, 37) !important",
    "&:hover": {
      backgroundColor: "#E8E8E8 !important",
      borderColor: "#E8E8E8 !important",
    },
  },
  leftSide2: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 2,
  },
  shipTo: {
    fontWeight: "bold",
    marginBottom: 1,
  },
  address: {
    marginBottom: 1,
  },

  buttonsContainer: {
    display: "flex",
    gap: "1rem",
    padding: "10px 0px",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  buyAgainButton: {
    color: "#fff !important",
    cursor: "pointer",
    padding: "0px 16px",
    fontSize: "16px",
    backgroundColor: "rgb(37, 37, 37) !important",
    minHeight: "48px",
    borderRadius: "8px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#ed1c24 !important",
      borderColor: "#ed1c24 !important",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "14px",
    },
  },
  reviewButton: {
    color: "#fff !important",
    width: "50vmin",
    cursor: "pointer",
    padding: "0px 4px",
    fontSize: "16px",
    backgroundColor: "rgb(37, 37, 37) !important",
    minHeight: "48px",
    borderRadius: "8px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#ed1c24 !important",
      borderColor: "#ed1c24 !important",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "14px",
    },
  },
  [theme.breakpoints.down("sm")]: {
    root: {
      width: "100%",
    },
    orderCard: {
      flexDirection: "column",
    },
    firstBlock: {
      flexDirection: "column",
      alignItems: "center",
    },
    rightSide: {
      width: "100%",
      padding: "1rem",
      marginTop: "1rem",
      justifyContent: "center",
    },
    secondBlock: {
      flexDirection: "column",
    },
    secondBlock_left: {
      width: "100%",
      alignItems: "center",
    },
    secondBlock_right: {
      width: "100%",
      padding: "1rem",
      justifyContent: "center",
    },
    buttonsContainer: {
      justifyContent: "center",
    },
    buyAgainButton: {
      width: "100%",
    },
    reviewButton: {
      width: "100%",
    },
    leftSide2: {
      marginBottom: 0,
    },
  },
  addressText: {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
    color: "#141414",
  },
  dialog: {
    width: "80vw",
    height: "70vh",
    marginT: 0,
    padding: "3rem",
    overflow: "hidden",
  },
}));


 const createdAt = (user) => {
   const createdAt = new Date(user.createdAt);
   const options = {
     year: "numeric",
     month: "2-digit",
     day: "2-digit",
     hour: "2-digit",
     minute: "2-digit",
     hour12: true,
     timeZone: "Asia/Kolkata",
   };

   const formatter = new Intl.DateTimeFormat("en-IN", options);
   const formattedDate = formatter.format(createdAt);
   return formattedDate;
 };


const OrderCard = ({item , user}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    const [open, setOpen] = useState(false);
   
const classes = useStyles();
  const isSmallScreen = useMediaQuery("(max-width: 999px)");
  const { shippingInfo, orderItems } = item;
   
  const addToCartHandler = (id , qty = 0) => {
    dispatch(addItemToCart(id , qty))
    alert.success("Item Added to Cart")
    history.push("/cart")
  }

   const handleClickOpen = () => {
     setOpen(true);
   };

   const handleClose = () => {
     console.log("called");
     setOpen(false);
   };

  return (
    <div className={classes.root}>
      {orderItems.map((product) => (
        <Card className={classes.orderCard}>
          <div className={classes.firstBlock}>
            {/* Left side */}
            <div className={classes.leftSide}>
              <Typography
                variant="subtitle1"
                className={classes.orderPlaced}
                style={{ fontWeight: "500" }}
              >
                ORDER PLACED
              </Typography>
              <Typography
                variant="body2"
                className={classes.orderDate}
                color="#141414"
              >
                {createdAt(item)}
              </Typography>
              <Typography
                variant="body2"
                className={classes.orderId}
                style={{ fontWeight: "500" }}
              >
                ORDER-ID: #{item._id}
              </Typography>
            </div>

            {/* Right side */}
            {!isSmallScreen && (
              <div className={classes.rightSide}>
                <Typography
                  variant="subtitle1"
                  className={classes.totalPrice}
                  style={{ fontWeight: "500" }}
                >
                  Total:
                </Typography>
                <Typography variant="body2" color="141414">
                  <strong> ₹</strong>
                  {product.price * product.quantity}
                </Typography>
              </div>
            )}
          </div>

          {/* Second block */}
          <div className={classes.secondBlock}>
            {/* Left side */}
            <div className={classes.secondBlock_left}>
              <div className={classes.productDetailsContainer}>
                <div style={{ width: "25%" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "160px" }}
                  />
                </div>

                <div>
                  <Typography
                    variant="subtitle1"
                    className={classes.productName}
                    style={{ fontWeight: "500" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="body2" className={classes.productQty}>
                    <strong>QTY:</strong> {product.quantity}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.deliveryStatus}
                  >
                    <strong>Delivery Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          item.orderStatus === "Delivered" ? "green" : "red",
                      }}
                    >
                      {item.orderStatus}
                    </span>
                  </Typography>
                  <div className={classes.buttonsContainer}>
                    <Button
                      variant="outlined"
                      className={classes.buyAgainButton}
                      onClick={() => addToCartHandler(product.productId, 1)}
                    >
                      <ReplayIcon style={{ marginRight: "8px" }} />
                      Buy Again
                    </Button>
                    <Button
                      variant="outlined"
                      className={classes.button}
                      onClick={() =>
                        history.push(`/product/${product.productId}`)
                      }
                    >
                      View item
                    </Button>
                  </div>
                </div>
              </div>
              <Divider className={classes.divider} />
              <div style={{ padding: "1rem" }}>
                <Button
                  variant="outlined"
                  className={classes.reviewButton}
                  onClick={handleClickOpen}
                >
                  <EditIcon style={{ marginRight: "8px" }} />
                  Write A Product Review
                </Button>

                <DialogBox
                  open={open}
                  handleClose={handleClose}
                  id={product.productId}
                  className={classes.dialog}
                />
              </div>
            </div>

            {/* Right side */}
            {!isSmallScreen && (
              <div className={classes.secondBlock_right}>
                <div className={classes.addressBlock}>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
                    Delivery Address :
                  </Typography>
                  <Typography variant="body2" className={classes.addressText}>
                    {shippingInfo.address}
                  </Typography>
                  <Typography variant="body2" className={classes.addressText}>
                    {shippingInfo.city}, {shippingInfo.state},{" "}
                    {shippingInfo.country} - {shippingInfo.pinCode}
                  </Typography>
                  <Typography variant="body2" className={classes.addressText}>
                    Phone: {shippingInfo.phoneNo}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default OrderCard;
