# Cricket Weapon E-Commerce MERN Stack Web Shopping App

## Introduction

Welcome to Cricket Weapon, an e-commerce shopping app built using the MERN (MongoDB, Express, React, Node.js) stack and Material-UI (MUI) for the user interface. This project provides both normal user and admin modes, offering a wide range of features to enhance the shopping experience.

## Demo

- Normal User Area: [Link to Demo]
- Admin Area: [Link to Demo]

## Tech Stack

![MongoDB](https://img.shields.io/badge/-MongoDB-green) ![Express](https://img.shields.io/badge/-Express-blue) ![React](https://img.shields.io/badge/-React-blue) ![Node.js](https://img.shields.io/badge/-Node.js-green) ![Material-UI](https://img.shields.io/badge/-Material--UI-blue) ![Stripe](https://img.shields.io/badge/-Stripe-blue)

## Project Configuration Guide

### Cloudinary Configuration

- Cloudinary is used for image management and hosting. Follow these steps to configure Cloudinary for your project:
    - Create a Cloudinary account [here](https://cloudinary.com/).
    - Create a new Cloudinary project.
    - Go to the dashboard and copy the cloud name, API key, and API secret.

### Stripe Configuration

- Stripe is used for payment processing. Follow these steps to configure Stripe for your project:
    - Create a Stripe account [here](https://stripe.com/).
    - Go to the dashboard and copy the publishable key and secret key.

### Nodemailer Configuration

- Nodemailer is used for sending emails. Follow these steps to configure Nodemailer for your project:
    - Create a Gmail account [here](https://mail.google.com/).
    - Go to the account settings and enable the Less Secure App Access.
    - Go to the dashboard and copy the email and password.
    - Go to the .env file and save SMTP_MAIL and SMTP_PASS.
    - If you are using Gmail, you can directly copy the email and password. If you are using any other email service, you need to copy the SMTP host, port, and service.

### MongoDB Configuration

- MongoDB is used for storing data. Follow these steps to configure MongoDB for your project:
    - Create a MongoDB account [here](https://www.mongodb.com/).
    - Create a new project and cluster.
    - Go to the dashboard and copy the connection string.
    - Go to the .env file and save DB_LINK.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/MehraDevesh2022/CricketWeapon-Store.git
    cd CricketWeapon-Store
    ```
2. Install dependencies:
    ```bash
    npm install
    cd frontend
    npm install
    cd ..
    ```
3. Create a `config` folder inside the backend directory of the project and then create a `.env` file inside the `config` folder and add the following:
    ```dotenv
    PORT = 5000
    DB_LINK ="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
    NODE_ENV = production
    JWT_SECRET = <jwt-secret-key>
    JWT_EXPIRE = 5d
    COOKIE_EXPIRE = 5
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=465
    SMTP_SERVICE = gmail
    SMTP_MAIL = <smtp-email>
    SMTP_PASSWORD = <smtp-password>
    SMTP_PASS = <smtp-password>
    CLOUDINARY_NAME = <cloudinary-name>
    API_KEY = <api-key>
    API_SECRET = <api-secret>
    CLOUDINARY_URL=cloudinary://<api-key>:<api-secret>@<cloudinary-name>
    FRONTEND_URL = http://localhost:3000
    STRIPE_API_KEY = <stripe-api-key>
    STRIPE_SECRET_KEY = <stripe-secret-key>
    ```

4. Run the app:
    ```bash
    cd backend &&
    npm start
    ```

## Features

### Normal User Mode

| Feature             | Description                                      |
| ------------------- | ------------------------------------------------ |
| User Authentication | OAuth with JWT for secure user login            |
| Password Reset      | Reset password via email with reset link        |
| Profile Management  | Update user profile details                     |
| Shopping Cart       | Add items to cart with coupon codes             |
| ...                 | Other features                                 |

### Admin Mode

| Feature                 | Description                                  |
| ----------------------- | -------------------------------------------- |
| Admin Dashboard         | Access to admin-only dashboard              |
| User Management         | Manage users and promotions                 |
| Product Management      | Edit products, manage stock levels          |
| ...                     | Other features                             |

## Upcoming Features

### Normal User Mode

| Feature                 | Description                                 |
| ----------------------- | ------------------------------------------- |
| Wishlist                | Create and manage wishlists for products    |
| Product Recommendations | Receive suggestions for related products    |
| ...                     | Other features                             |

### Admin Mode

| Feature                 | Description                                 |
| ----------------------- | ------------------------------------------- |
| Sales Analytics         | Gain insights into sales trends             |
| Dynamic Coupons         | Create and manage targeted coupons         |
| ...                     | Other features                             |

## Dependencies and Libraries

### Backend

| Dependency              | Description                                   |
| ----------------------- | --------------------------------------------- |
| @babel/plugin-proposal-class-properties | Babel plugin for class properties    |
| ...                     | Other dependencies                         |

### Frontend

| Dependency              | Description                                   |
| ----------------------- | --------------------------------------------- |
| @emotion/react          | Emotion library for CSS-in-JS                |
| ...                     | Other dependencies                         |

## Hosting Your Complete App on Vercel

This guide will walk you through the process of hosting your complete MERN stack app on Vercel using the `vercel.json` configuration.

1. Prepare Your Project:
    - Organize your project with a root directory containing frontend and backend folders.
    - Make sure both directories have all necessary code and dependencies.
    - Create a `vercel.json` file in the root directory.
    - Add the provided `vercel.json` configuration to the file.

2. Deploy Your App:
    - Push your code to GitHub, excluding `node_modules` and `.env` files.
    - Create a Vercel account and connect it to your GitHub account.
    - Create a new Vercel project and select your GitHub repo (e.g., CricketWeapon-store).
    - Configure the project with the necessary environment variables.
    - Deploy the project and wait for it to be deployed.
    - Visit the provided URL to see your app live.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contributions

[![Contributors](https://img.shields.io/github/contributors/Naereen/StrapDown.js.svg)]()
