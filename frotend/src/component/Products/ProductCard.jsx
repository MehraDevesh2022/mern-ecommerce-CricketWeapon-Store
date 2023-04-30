import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { FitScreen } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    height: FitScreen,
    margin: theme.spacing(2),
    backgroundColor: "white",
  },
  media: {
    height: 150,
    height: 200,
    width: "100%",
    objectFit: "cover",
  },
  button: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 4,
    fontWeight: "bold",
    width: "100%",
    height: 45,
    "&:hover": {
      backgroundColor: "#ed1c24",
      color: "black",
      fontWeight: "bold",
    },
  },
  oldPrice: {
    textDecoration: "line-through",
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.6)",
    marginRight: theme.spacing(1),
  },
  finalPrice: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  description: {
    fontSize: "0.8rem",
    fontWeight: 300,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
}));

const ProductCard = () => {
  const classes = useStyles();
  const description =
    "This is a long description that needs to be truncated after six words.";
  const truncated =
    description
      .split(" ")
      .slice(0, 8)
      .join(" ") + "...";

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://www.shutterstock.com/image-photo/closeup-cricket-equipment-260nw-144370459.jpg"
          title="Cricket Kit with bat"
        />
        <CardContent>
          <Typography gutterBottom color="black" fontWeight="bold">
            Cricket Kit with bat
          </Typography>
          <Box display="flex" alignItems="center">
            <Rating
              name="rating"
              value={4.2}
              precision={0.1}
              readOnly
              size="small"
              style={{ color: "#ed1c24", marginRight: 8 }}
            />
            <Typography variant="body2" color="textSecondary">
              (32)
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="textSecondary"
            component="div"
            className={classes.description}
          >
            {truncated}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" className={classes.oldPrice}>
              $4000
            </Typography>
            <Typography variant="body1" className={classes.finalPrice}>
              $3200
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box display="flex" justifyContent="center" p={2}>
        <Button variant="contained" className={classes.button}>
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
