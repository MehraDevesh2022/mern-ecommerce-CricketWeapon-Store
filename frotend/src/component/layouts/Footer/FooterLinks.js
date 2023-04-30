import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React from "react";

export const footMenu = [
  {
    id: 1,
    title: "Help",
    menu: [
      {
        id: 1,
        link: "FAQs",
        path: "/",
      },
      {
        id: 2,
        link: "Track Order",
        path: "/",
      },
      {
        id: 3,
        link: "Cancel Order",
        path: "/",
      },
      {
        id: 4,
        link: "Return Order",
        path: "/",
      },
      {
        id: 5,
        link: "Warranty Info",
        path: "/",
      },
    ],
  },
  {
    id: 2,
    title: "Policies",
    menu: [
      {
        id: 1,
        link: "Return Policy",
        path: "/",
      },
      {
        id: 2,
        link: "Security",
        path: "/",
      },
      {
        id: 3,
        link: "Sitemap",
        path: "/",
      },
      {
        id: 4,
        link: "Privacy Policy",
        path: "/",
      },
      {
        id: 5,
        link: "Terms & Conditions",
        path: "/",
      },
    ],
  },
  {
    id: 3,
    title: "Company",
    menu: [
      {
        id: 1,
        link: "About Us",
        path: "/",
      },
      {
        id: 2,
        link: "Contact Us",
        path: "/",
      },
      {
        id: 3,
        link: "Service Centres",
        path: "/",
      },
      {
        id: 4,
        link: "Careers",
        path: "/",
      },
      {
        id: 5,
        link: "Affiliates",
        path: "/",
      },
    ],
  },
];

export const footSocial = [
  {
    id: 1,
    icon: <FacebookIcon className="facebook_icon" />,
    path: "/",
  },
  {
    id: 2,
    icon: <TwitterIcon className="twitter_icon" />,
    path: "/",
  },
  {
    id: 3,
    icon: <InstagramIcon className="insta_icon" />,
    path: "/",
  },
  {
    id: 4,
    icon: <LinkedInIcon className="likedin_icon" />,
    path: "/",
  },
];
