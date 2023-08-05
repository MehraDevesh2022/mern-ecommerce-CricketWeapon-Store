import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  getAllreviews,
  clearErrors,
  deleteProductReview,
} from "../../actions/productAction";
import {useHistory } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { DELETE_REVIEW_RESET } from "../../constants/productsConstatns";
import { makeStyles } from "@material-ui/core/styles";
import StarRateIcon from "@mui/icons-material/StarRate";

const useStyles = makeStyles((theme) => ({
  updateUser1: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    width: "100%",
    gap: "1rem",
    overflow: "hidden",
    margin: "-1.1rem 0 0 0",
    padding: 0,
  },
  firstBox_01: {
    width: "20%",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
    [theme.breakpoints.down("999")]: {
      display: "none",
    },
  },

  toggleBox_01: {
    width: "16rem",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
    zIndex: "100",
    position: "absolute",
    top: "58px",
    left: "17px",
  },
  secondBox_01: {
    width: "75%",

    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    margin: "-0.5rem 0 0 0",
    gap: "10px",
    justifyContent: "center",
    [theme.breakpoints.down("999")]: {
      width: "100%",
    },
  },
  navBar_01: {
    margin: "0rem",
  },
  formSection: {
    width: "100%",
    margin: "auto",
    borderRadius: "5px",
    height: "100vh",
    backgroundColor: "white",
    padding: "1rem 2rem",
  },
  form: {
    width: "350px",
    margin: "-1rem auto 0 auto",
    borderRadius: "5px",
    padding: "2rem",
  },

  avatar: {
    margin: " 8px auto",
    backgroundColor: "black",
  },
  textField: {
    marginBottom: theme.spacing(2), 
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black",
      padding: "12px 14px",
    },
    "& .MuiInputLabel-root": {
      color: "black",
      fontSize: "14px",
      textAlign: "center",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
      fontSize: "14px",
      textAlign: "center",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "black",
        color: "black",
      },
      "& .MuiOutlinedInput-input": {
        padding: "13px 8px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
        color: "black",
        outline: "none",
      },
    },
  },

  heading: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
    color: "#414141",
    fontWeight: "bold",
  },
  heading_02: {
    textAlign: "center",
    textShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    color: "#414141",
    fontWeight: "900",
  },

  nameInput: {
    position: "relative",
    "& > label": {
      left: ".2rem",
    },
    padding: "4px 0px",
    fontSize: "1rem",
    width: "100%",
    marginBottom: theme.spacing(5.5),
    height: ".7rem",
  },

  loginButton: {
    color: "#fff",
    backgroundColor: "#000",
    border: "2px solid #000",
    margin: `${theme.spacing(3)}px 0`,
    marginTop: "1rem",
    "&:disabled": {
      backgroundColor: "#444444", // faded black
      color: "#FFFFFF",
      borderColor: "#444444",
    },
    "&:hover": {
      backgroundColor: "#ed1c24",
      color: "#fff",
      borderColor: "#ed1c24",
    },
  },
}));

function ProductReviews() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [toggle, setToggle] = useState(false);
  const { error, reviews, loading } = useSelector(
    (state) => state.getAllReview
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const [productId, setProductId] = useState("");

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllreviews(productId)); // when in input box string lenght goes ===24 then automatically search occures
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, alert, deleteError, isDeleted, productId, history]);

  // to close the sidebar when the screen size is greater than 1000px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  // delet review from given prodcuts reviews =>
  const deleteReviewHandler = (reviewId) => {
 
    dispatch(deleteProductReview(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllreviews(productId)); // get this product reviews
  };
  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 230,
      flex: 0.5,
      headerClassName: "column-header",
    },
    {
      field: "user",
      headerName: "User",
      flex: 0.8,
      magin: "0 auto",
      headerClassName: "column-header hide-on-mobile",
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 0.8,
    },
    {
      field: "recommend",
      headerName: "Recommend",
      minWidth: 100,
      flex: 1,
      headerClassName: "column-header hide-on-mobile",
      cellClassName: (params) => {
        return params.getValue(params.id, "recommend") === true
          ? "greenColor"
          : "redColor"; // if rating of review greater then class green else red
      },
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 200,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor"; // if rating of review greater then class green else red
      },
    },

    {
      field: "actions",
      flex: 1,
      headerName: "Actions",
      minWidth: 230,
      headerClassName: "column-header1",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div 
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon className="iconbtn" style={{ marginLeft: "1rem" }} />
            </div>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.ratings,
        recommend: item.recommend ? "Yes" : "No",
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="All Reviews" />

          <div className={classes.updateUser1}>
            <div
              className={
                !toggle ? `${classes.firstBox_01}` : `${classes.toggleBox_01}`
              }
            >
              <Sidebar />
            </div>

            <div className={classes.secondBox_01}>
              <div className={classes.navBar_01}>
                <Navbar toggleHandler={toggleHandler} />
              </div>
              <div className={classes.formSection}>
                <form
                  className={`${classes.form}`}
                  onSubmit={productReviewsSubmitHandler}
                >
                  <Avatar className={classes.avatar}>
                    <StarRateIcon />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h1"
                    className={classes.heading}
                  >
                    All Reviews
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    className={`${classes.nameInput} ${classes.textField}`}
                    label="Product Id"
                    required
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Star
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    id="createProductBtn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.loginButton}
                    disabled={
                      loading ? true : false || productId === "" ? true : false
                    }
                  >
                    Search
                  </Button>
                </form>

                {reviews && reviews.length > 0 ? (
                  <div className="productListContainer">
                    <h4 id="productListHeading">ALL PRODUCTS</h4>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      autoHeight
                      disableSelectionOnClick
                      className="productListTable"
                    />
                  </div>
                ) : (
                  <h1 className={classes.heading_02}>No Reviews Found</h1>
                )}
              </div>
              ;
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductReviews;
