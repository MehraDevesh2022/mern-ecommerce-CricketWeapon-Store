import React from "react";
import { Typography, Container, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MetaData from "../component/layouts/MataData/MataData";
import TermsImage from "../Image/about/tc.jpg";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  about_us: {
    paddingTop: "8rem",
    paddingBottom: "4rem",
    backgroundColor: "white !important",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  container_12: {
    padding: "2rem",
    textAlign: "center",

    backgroundColor: "white !important",
    maxWidth: "100%",
  },
  image_about: {
    width: "100%",
    height: "auto",
    marginTop: "3rem",
    marginBottom: "2rem",
  },
  title_about: {
    color: "#414141",
    fontSize: "14px",
    padding: "2rem 1rem 2rem",
    fontFamily: "Roboto",
    fontWeight: "500 !important",
  },
  heading12_about: {
    fontSize: "1rem",
    padding: "2rem 1rem 2rem",
    fontWeight: "400 !important",
    color: "#414141",
    textAlign: "center",
  },
  introText_about: {
    maxWidth: "800px",

    lineHeight: "1.5",
    margin: "1.5rem 0",
    color: "#292929",
    fontSize: "1.2rem",
    fontWeight: "400 !important",
    textAlign: "justify",
    padding: "0.8rem 1rem",
  },
  infoText_about: {
    lineHeight: "1.5",
    margin: "2rem 0",
    color: "#292929",
    fontSize: "1rem",
    fontWeight: "400 !important",
    textAlign: "justify",
    padding: "0.8rem 1rem",
  },
  buttonContainer_about: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem 0",
    width: "100%",
    marginTop: "1rem",
  },
  button1_about: {
    backgroundColor: "#000000 !important",
    color: "white !important",
    width: "fit-content !important",
    padding: "0.8rem 2rem   !important",
    marginLeft: "3.3rem !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#ed1c24 !important",
      color: "white !important",
    },
  },
  button2_about: {
    backgroundColor: "#292929 !important",
    color: "white   !important",
    width: "fit-content     !important",
    padding: "0.8rem 2rem   !important",
    marginLeft: "1.3rem !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#ed1c24 !important",
      color: "white !important",
    },
  },
}));

const About_UsPage = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.about_us}>
        <MetaData title={"About Us"} />
        <Container className={classes.container_12}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <img
                src={TermsImage}
                alt="CricketWeapon"
                className={classes.image_about}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h2"
                component="h1"
                className={classes.title_about}
              >
                About Us
              </Typography>
              <Typography variant="body1" className={classes.introText_about}>
                CricketWeapon store is an online cricket sports selling startup
                started in 2019. We have served more than 20,000 customers
                through social media and other platforms. We are proud to offer
                our own products under the brand name CW, also known as "Cricket
                Weapon".
              </Typography>
              <Typography variant="body1" className={classes.introText_about}>
                CricketWeapon was founded by Lokesh Samant, a talented cricket
                player who has represented the Under 16 and Under 19 teams.
                Lokesh started this business to support his expenses and
                received an overwhelming response. He has sold cricket equipment
                to more than 20,000 customers till date. Now, he aims to expand
                his business to an international level by launching his own
                website and introducing new and genuine cricket products at
                competitive prices.
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.container_12}>
          <Typography
            variant="h3"
            component="h1"
            className={classes.heading12_about}
          >
            Who We Are
          </Typography>
          <Typography variant="body1" className={classes.infoText_about}>
            CricketWeapon is dedicated to providing high-quality cricket
            equipment and accessories to cricket enthusiasts worldwide. Our
            mission is to empower cricketers with the best tools to enhance
            their performance on the field. With a focus on innovation,
            craftsmanship, and customer satisfaction, we have become a trusted
            brand in the cricket community.
          </Typography>
          <Typography variant="body1" className={classes.infoText_about}>
            Since our inception in 2019, we have built a strong customer base
            and expanded our product range to cater to the diverse needs of
            players at every level. We take pride in offering genuine cricket
            products that are carefully curated and tested for quality and
            performance. Our team of experts works closely with manufacturers to
            ensure that our customers receive top-notch products.
          </Typography>
          <Typography variant="body1" className={classes.infoText_about}>
            At CricketWeapon, we believe in fostering long-term relationships
            with our customers. We provide excellent customer service and strive
            to exceed expectations at every step. We are committed to delivering
            a seamless online shopping experience and ensuring customer
            satisfaction. Join us on this exciting journey as we continue to
            grow and expand our reach in the world of cricket.
          </Typography>
        </Container>
        <Container className={classes.container_12}>
          <Typography
            variant="h3"
            component="h1"
            className={classes.heading12_about}
          >
            Our Mission
          </Typography>
          <Typography variant="body1" className={classes.infoText_about}>
            CricketWeapon is driven by the mission to provide high-quality
            cricket equipment and accessories at affordable prices. We aim to
            make cricket accessible to players worldwide and support their
            passion for the sport. Our mission is to offer a wide range of
            cricket equipment, including bats, balls, protective gear, and
            accessories, that meet the highest standards of quality and
            performance.
          </Typography>
          <Typography variant="body1" className={classes.infoText_about}>
            We are committed to continuously innovating and improving our
            product range to meet the evolving needs of cricketers. Our team of
            experts works closely with manufacturers and conducts rigorous
            quality testing to ensure that every product we offer delivers
            exceptional performance on the field. We believe that every player
            deserves the best tools to enhance their skills and achieve their
            cricketing goals.
          </Typography>

          <div className={classes.buttonContainer_about}>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "none" }}
            >
              <Button variant="contained" className={classes.button1_about}>
                Our Products
              </Button>
            </Link>
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "none" }}
            >
              <Button variant="contained" className={classes.button2_about}>
                Contact Us
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default About_UsPage;
