import React, { useState , useEffect} from "react";
import { useStyles } from "./ReviewStyle";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import { NEW_REVIEW_RESET } from "../../constants/productsConstatns";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearErrors, newReview } from "../../actions/productAction";



const DialogBox = ({ open, handleClose, id }) => {

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState(0);
  const [recommend, setRecommend] = useState(false);

  const { success, error } = useSelector((state) => {
    return state.addNewReview;
  });

  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;
  const alert = useAlert();


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRatings(event.target.value);
  };

  const handleRecommendChange = (event) => {
    setRecommend(event.target.value);
  };

  const handleSubmit = () => {
    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("comment", comment);
    myForm.set("ratings", ratings);
    myForm.set("recommend", recommend);
    if(id){
          myForm.set("productId", id);
    }else{
          myForm.set("productId", productId);
    }
    dispatch(newReview(myForm));
      alert.success("Review posted successfully");
    handleClose();
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, success]);

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" className={classes.header}>
              Write your review
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="body1" className={classes.subHeadings}>
          *All fields are required unless marked optional.
        </Typography>
        <Box mt={2}>
          <Typography variant="body1" className={classes.bodyText}>
            Title
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter title here"
            value={title}
            onChange={handleTitleChange}
            className={classes.textField}
          />
        </Box>
        <Box mt={2}>
          <Typography variant="body1" className={classes.bodyText}>
            Description
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter description here"
            multiline
            rows={4}
            value={comment}
            onChange={handleDescriptionChange}
            className={classes.textField}
          />
        </Box>
        <Box mt={2}>
          <Typography variant="body1" className={classes.bodyText}>
            Rating
          </Typography>
          <Rating
            name="rating"
            value={ratings}
            onChange={handleRatingChange}
            precision={0.5}
            className={classes.star}
          />
        </Box>
        <Box mt={2}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ fontSize: "14px", color: "#414141", fontWeight: "500" }}
            >
              Would you recommend this product?
            </FormLabel>
            <RadioGroup
              aria-label="recommendation"
              name="recommendation"
              value={recommend}
              onChange={handleRecommendChange}
            >
              <FormControlLabel
                value="yes"
                control={<Radio color="black" />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio color="black" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            className={classes.submitBtn}
          >
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
