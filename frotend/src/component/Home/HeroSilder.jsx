import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import Button from "@material-ui/core/Button";
import "../../Image/Cricket-wepon/03.jpg"
import "./HeaderSlider.css"
import "../../Image/Cricket-wepon/04.jpg"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
const useStyles = makeStyles((theme) => ({
  slide: {
    height: "calc(100vh - 64px)",
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: "50vh",
    },
  },
  slideContent: {
    position: "absolute",
    top: "50%",
    left: "10%",
    transform: "translateY(-50%)",
    textAlign: "left",
    color: "#fff",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  quote: {
    fontWeight: 300,
    marginBottom: theme.spacing(1),
  },
  saleText: {
    fontSize : "18px",
    fontWeight: "bolder",
    marginBottom: theme.spacing(1),
  },
  productButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 3),
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: "#000",
    },
  },
  slideImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const slides = [
  {
    image: require("../../Image/Cricket-wepon/img2.png"),
    quote: "Play with passion Play with passion",
    saleText:
      "Up to 50% off Play ",
    productText: "Shop Now",
  },
  {
    image: require("../../Image/Cricket-wepon/03.jpg"),
    quote: "Experience the game",
    saleText:
      "Limited Time Offer ",
    productText: "Buy Now",
  },
  {
    image: require("../../Image/Cricket-wepon/01.jpg"),
    quote: "Get ready to play Get ready to play ",
    saleText:
      "New Arrivals Get ",
    productText: "Explore",
  },
  {
    image: require("../../Image/Cricket-wepon/04.jpg"),
    quote: "Get ready to play",
    saleText: "New Arrivals",
    productText: "Explore",
  },
];

export default function HeroSlider() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };


  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % slides.length);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + slides.length) % slides.length
    );
  };
  return (
    <>
      <div className="heroSlider">
        <ArrowForwardIosIcon className="right-icon" onClick={handleNext} />
        <Carousel
          interval={3000}
          animation="slide"
          index={activeStep}
          onChange={handleStepChange}
          navButtonsAlwaysInvisible={true}
        >
          {slides.map((slide, index) => (
            <div key={index} className={classes.slide}>
              <img src={slide.image} alt="" className={classes.slideImage} />
              <div className={classes.slideContent}>
                <div className={classes.quote}>{slide.quote}</div>
                <div className={classes.saleText}>{slide.saleText}</div>
                <Button variant="outlined" className={classes.productButton}>
                  {slide.productText}
                </Button>
              </div>
            </div>
          ))}
        </Carousel>
        <ArrowBackIosIcon className="left-icon" onClick={handleBack} />
      </div>
    </>
  );
}
