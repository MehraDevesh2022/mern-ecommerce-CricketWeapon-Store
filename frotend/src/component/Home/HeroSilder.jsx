import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  slide: {
    height: "calc(100vh - 64px)",
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      // // height: "50vh",
      // marginTop : "5rem",
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
    fontSize: "16px",
    width: "30vw",
    fontWeight: 500,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      width: "80vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      width: "90vw",
    },
  },
  saleText: {
    fontSize: "32px",
    fontFamily: "Roboto",
    fontWeight: "800",
    width: "45vw",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
      width: "80vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px",
      width: "90vw",
    },
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      padding: theme.spacing(0.5, 2),
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
      padding: theme.spacing(0.5, 1.5),
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
    quote:
      "Unleash Your Passion for Cricket and Embrace the Thrill of the Game",
    saleText:
      "Get in the game with up to 50% off on a wide range of cricket gear's",
    productText: "Shop Now",
  },
  {
    image: require("../../Image/Cricket-wepon/03.jpg"),
    quote:
      "Experience the Unparalleled Excitement and Achieve Victory with Our Premium Cricket Equipment",
    saleText:
      "Limited Time Offer: Don't miss out on the opportunity to upgrade your game",
    productText: "Buy Now",
  },
  {
    image: require("../../Image/Cricket-wepon/01.jpg"),
    quote:
      "Gear up with the Latest Innovations and Dominate the Field like Never Before",
    saleText: "Discover New Arrivals and stay ahead of the competition",
    productText: "Explore",
  },
  {
    image: require("../../Image/Cricket-wepon/04.jpg"),
    quote:
      "Elevate Your Performance and Unleash Your True Cricketing Potential with Our Cutting-Edge Gear",
    saleText: "New Arrivals: Enhance your skills and excel on the field",
    productText: "Upgrade Now",
  },
];

export default function HeroSlider() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

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
      <Carousel
        autoPlay={true}
        navButtonsAlwaysVisible
        indicators={false}
        animation="slide"
        interval={5000}
        timeout={500}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            backgroundColor: "#00000088",
            borderRadius: 0,
            padding: 0,
            margin: 0,
            height: "100%",
          },
        }}
        prevButton={
          <Button
            className="slider-nav-btn prev"
            onClick={handleBack}
            startIcon={<ArrowBackIosIcon />}
          ></Button>
        }
        nextButton={
          <Button
            className="slider-nav-btn next"
            onClick={handleNext}
            endIcon={<ArrowForwardIosIcon />}
          ></Button>
        }
        fullHeightHover={false}
        className={classes.slide}
        index={activeStep}
        onChangeIndex={setActiveStep}
      >
        {slides.map((slide, index) => (
          <div key={index} className={classes.slide}>
            <img
              src={slide.image}
              alt="slider"
              className={classes.slideImage}
            />
            <div className={classes.slideContent}>
              <h2 className={classes.quote}>{slide.quote}</h2>
              <h3 className={classes.saleText}>{slide.saleText}</h3>
              <Link to="/products">
                <Button className={classes.productButton}>
                  {slide.productText}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}
