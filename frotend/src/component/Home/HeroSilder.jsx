import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { colors, typography } from "../theme";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    position: "relative",
    overflow: "hidden",
  },
  slide: {
    height: "calc(100vh - 112px)",
    minHeight: "500px",
    maxHeight: "800px",
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: "70vh",
      minHeight: "400px",
    },
  },
  slideOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.1) 100%)",
    zIndex: 1,
  },
  slideContent: {
    position: "absolute",
    top: "50%",
    left: "8%",
    transform: "translateY(-50%)",
    textAlign: "left",
    color: colors.neutral.white,
    zIndex: 2,
    maxWidth: "600px",
    [theme.breakpoints.down("sm")]: {
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      padding: "0 20px",
      maxWidth: "90%",
    },
  },
  tagline: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.weight.semiBold,
    color: colors.primary.main,
    textTransform: "uppercase",
    letterSpacing: "3px",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: typography.size.xs,
      letterSpacing: "2px",
    },
  },
  quote: {
    fontSize: typography.size["4xl"],
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.weight.extraBold,
    lineHeight: typography.lineHeight.tight,
    marginBottom: theme.spacing(2),
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    [theme.breakpoints.down("md")]: {
      fontSize: typography.size["3xl"],
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: typography.size["2xl"],
    },
  },
  saleText: {
    fontSize: typography.size.lg,
    fontFamily: typography.fontFamily.secondary,
    fontWeight: typography.weight.regular,
    opacity: 0.9,
    marginBottom: theme.spacing(4),
    lineHeight: typography.lineHeight.relaxed,
    [theme.breakpoints.down("sm")]: {
      fontSize: typography.size.base,
      marginBottom: theme.spacing(3),
    },
  },
  productButton: {
    backgroundColor: colors.primary.main,
    color: colors.neutral.white,
    border: "none",
    borderRadius: "50px",
    padding: theme.spacing(1.5, 5),
    fontSize: typography.size.base,
    fontWeight: typography.weight.semiBold,
    fontFamily: typography.fontFamily.primary,
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 15px rgba(227, 6, 5, 0.4)",
    "&:hover": {
      backgroundColor: colors.primary.dark,
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(227, 6, 5, 0.5)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.2, 4),
      fontSize: typography.size.sm,
    },
  },
  slideImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  navButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    minWidth: "50px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transform: "scale(1.1)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "40px",
      height: "40px",
      minWidth: "40px",
    },
  },
  indicators: {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "12px",
    zIndex: 3,
  },
  indicator: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.6)",
    },
  },
  indicatorActive: {
    backgroundColor: colors.primary.main,
    transform: "scale(1.2)",
    border: `2px solid ${colors.neutral.white}`,
  },
}));

// Animation variants for hero content
const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
};

const slides = [
  {
    image: require("../../Image/Cricket-wepon/img2.png"),
    tagline: "Premium Cricket Gear",
    quote: "Unleash Your Passion for Cricket",
    saleText:
      "Get in the game with up to 50% off on a wide range of premium cricket equipment",
    productText: "Shop Now",
  },
  {
    image: require("../../Image/Cricket-wepon/03.jpg"),
    tagline: "Limited Time Offer",
    quote: "Experience Victory with Our Equipment",
    saleText:
      "Don't miss out on the opportunity to upgrade your game with professional-grade gear",
    productText: "Buy Now",
  },
  {
    image: require("../../Image/Cricket-wepon/01.jpg"),
    tagline: "New Arrivals",
    quote: "Dominate the Field Like Never Before",
    saleText: "Discover the latest innovations and stay ahead of the competition",
    productText: "Explore",
  },
  {
    image: require("../../Image/Cricket-wepon/04.jpg"),
    tagline: "Pro Collection",
    quote: "Elevate Your Performance",
    saleText: "Enhance your skills and excel on the field with cutting-edge gear",
    productText: "Upgrade Now",
  },
];

export default function HeroSlider() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [key, setKey] = useState(0);

  // Reset animation key when slide changes
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % slides.length);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className={classes.heroContainer}>
      <Carousel
        autoPlay={true}
        navButtonsAlwaysVisible
        indicators={false}
        animation="fade"
        interval={6000}
        timeout={800}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            backgroundColor: "transparent",
            padding: 0,
            margin: "0 20px",
          },
        }}
        navButtonsWrapperProps={{
          style: {
            top: "50%",
            transform: "translateY(-50%)",
          },
        }}
        prevButton={
          <Button className={classes.navButton} onClick={handleBack}>
            <ArrowBackIosIcon style={{ color: "#fff", marginLeft: "8px" }} />
          </Button>
        }
        nextButton={
          <Button className={classes.navButton} onClick={handleNext}>
            <ArrowForwardIosIcon style={{ color: "#fff" }} />
          </Button>
        }
        fullHeightHover={false}
        className={classes.slide}
        index={activeStep}
        onChange={(now) => setActiveStep(now)}
      >
        {slides.map((slide, index) => (
          <div key={index} className={classes.slide}>
            <img
              src={slide.image}
              alt={`Cricket gear - ${slide.tagline}`}
              className={classes.slideImage}
            />
            <div className={classes.slideOverlay} />
            <AnimatePresence mode="wait">
              {activeStep === index && (
                <motion.div
                  key={`content-${index}-${key}`}
                  className={classes.slideContent}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.p className={classes.tagline} variants={itemVariants}>
                    {slide.tagline}
                  </motion.p>
                  <motion.h1 className={classes.quote} variants={itemVariants}>
                    {slide.quote}
                  </motion.h1>
                  <motion.p className={classes.saleText} variants={itemVariants}>
                    {slide.saleText}
                  </motion.p>
                  <motion.div variants={buttonVariants}>
                    <Link to="/products" style={{ textDecoration: "none" }}>
                      <motion.div
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                      >
                        <Button className={classes.productButton}>
                          {slide.productText}
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </Carousel>
      
      {/* Custom Indicators */}
      <div className={classes.indicators}>
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`${classes.indicator} ${
              activeStep === index ? classes.indicatorActive : ""
            }`}
            onClick={() => setActiveStep(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
