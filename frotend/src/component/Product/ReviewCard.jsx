import React, { useState, lazy, Suspense } from "react";
import { Typography, Grid, Select, MenuItem, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
 import CricketBallLoader from "../layouts/loader/Loader";
import { useStyles } from "./ReviewStyle";
import MyCard from "./Card";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
const DialogBox = lazy(() => import("./DialogBox"));


const ReviewCard = ({ product }) => { 
  const classes = useStyles();
  const { isAuthenticated } = useSelector((state) => state.userData);
  const alert = useAlert();
  const history = useHistory();
  const [sortValue, setSortValue] = useState("highest");

  const handleSortChange = (event) => {

    setSortValue(event.target.value);
  };


  // const sortedData = yourData.sort((a, b) => {
  //   switch (sortValue) {
  //     case "highest":
  //       return b.rating - a.rating;
  //     case "lowest":
  //       return a.rating - b.rating;
  //     case "latest":
  //       return new Date(b.date) - new Date(a.date);
  //     case "oldest":
  //       return new Date(a.date) - new Date(b.date);
  //     default:
  //       return 0;
  //   }
  // });




  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
     if (!isAuthenticated) {
      alert.error("Please Login to write a review");
     history.push("/login");
    }
    setOpen(true);
  };

  const handleClose = () => {
    console.log("called");
    setOpen(false);
  };

  return (
    <div className={classes.reviewRoot}>
      <Typography variant="h5" component="h1" className={classes.reviewHeader}>
        Users Reviews
      </Typography>
      <Button
        variant="contained"
        className={classes.submitBtn}
        fullWidth
        style={{ marginTop: "2rem" }}
        onClick={handleClickOpen}
      >
        Write your Review
      </Button>

      <Suspense fallback={<CricketBallLoader />}>
        <DialogBox
          open={open}
          handleClose={handleClose}
          className={classes.dialog}
        />
      </Suspense>
      <Grid container alignItems="center" style={{ marginTop: "2rem" }}>
        <Grid item className={classes.ratingContainer}>
          <Rating
            value={product.ratings}
            precision={0.5}
            readOnly
            className={classes.star}
          />
        </Grid>
        <Typography variant="body2" className={classes.ratingNumber}>
          {product.ratings} stars
        </Typography>
        <Grid item>
          <Typography variant="body2">
            <strong> Total Reviews : </strong>
            {product.numOfReviews}
          </Typography>
        </Grid>
      </Grid>

      <Grid container justify="flex-end" className={classes.selectContainer}>
        <Grid item>
          <Typography
            variant="body2"
            style={{ fontSize: "12px" }}
            className={classes.sortBy}
          >
            SortBy :
          </Typography>
        </Grid>
        <Grid item>
          <Select
            value={sortValue ? sortValue : "highest"}
            className={classes.select}
            onClick={handleSortChange}
            MenuProps={{
              anchorOrigin: { vertical: "bottom", horizontal: "left" },
              getContentAnchorEl: null,
              MenuListProps: { disableScrollLock: true },
            }}
          >
            <MenuItem value="highest" className={classes.menuItem}>
              Highest Rated
            </MenuItem>
            <MenuItem value="lowest" className={classes.menuItem}>
              Lowest Rated
            </MenuItem>
            <MenuItem value="latest" className={classes.menuItem}>
              Latest Reviews
            </MenuItem>
            <MenuItem value="oldest" className={classes.menuItem}>
              Oldest Reviews
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      <div className={classes.container}>
        {product.reviews &&
          product.reviews.map((review) => <MyCard review={review} />)}
      </div>
    </div>
  );
};

export default ReviewCard;
