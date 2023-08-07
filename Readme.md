# Cricket Weapon E-Commerce MERN stack Web Shopping App

## Introduction

Welcome to Cricket Weapon, an e-commerce shopping app built using the MERN (MongoDB, Express, React, Node.js) stack and Material-UI (MUI) for the user interface. This project provides both normal user and admin modes, offering a wide range of features to enhance the shopping experience.

## Demo

### Normal User Area

<video controls width="100%">
  <source src="./demo/user-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

### Admin Area

<video controls width="100%">
  <source src="./demo/admin-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Tech Stack

![MongoDB](https://img.shields.io/badge/-MongoDB-green) ![Express](https://img.shields.io/badge/-Express-blue) ![React](https://img.shields.io/badge/-React-blue) ![Node.js](https://img.shields.io/badge/-Node.js-green) ![Material-UI](https://img.shields.io/badge/-Material--UI-blue) ![Stripe](https://img.shields.io/badge/-Stripe-blue)

## Project Configuration Guide

### Cloudinary Configuration

- Cloudinary is used for image management and hosting. Follow these steps to configure Cloudinary for your project.

  - Create a Cloudinary account [here](https://cloudinary.com/).
  - Create a new Cloudinary project.
  - Go to the dashboard and copy the cloud name, API key, and API secret.

  ### Stripe Configuration

  - Stripe is used for payment processing. Follow these steps to configure Stripe for your project.
  - Create a Stripe account [here](https://stripe.com/).
  - Go to the dashboard and copy the publishable key and secret key.

  ### Nodemailer Configuration

  - Nodemailer is used for sending emails. Follow these steps to configure Nodemailer for your project.
  - Create a Gmail account [here](https://mail.google.com/).
  - Go to the account settings and enable the Less Secure App Access.
  - Go to the dashboard and copy the email and password.
  - Go to .env file and save SMTP_MAIL and SMTP_PASS.
  - If you are using Gmail, you can directly copy the email and password. If you are using any other email service, you need to copy the SMTP host, port, and service.
  - Repl

  ### MongoDB Configuration

  - MongoDB is used for storing data. Follow these steps to configure MongoDB for your project.
  - Create a MongoDB account [here](https://www.mongodb.com/).
  - Create a new project and cluster.
  - Go to the dashboard and copy the connection string.
  - Go to .env file and save DB_LINK.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/MehraDevesh2022/CricketWeapon-Store.git
    cd CricketWeapon-Store
    ```
2.  Install dependencies:
    ```bash
    npm install
    cd frorntend
    npm install
    cd ..
    ```
3.  Create a `config` folder inside the backend directory of the project and then create a `.env` file inside the `config` folder and add the following:

    ````bash
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

    ````

4.  Run the app:

    ```bash
    cd backend &&
    npm start
    ```

    ## Features

### Normal User Mode

| Feature             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| User Authentication | OAuth with JWT for secure user login and registration        |
| Password Reset      | Reset password via email with reset link                     |
| Profile Management  | Update user profile details (email, name, password, picture) |
| Shopping Cart       | Add items to the cart and apply coupon codes                 |
| Product Review      | Logged-in users can review products                          |
| Shipping Options    | Specify shipping area for product delivery                   |
| Order Tracking      | Track the status of orders                                   |
| Payment Gateway     | Secure payment processing via Stripe                         |
| Contact Form        | Contact form for user assistance                             |
| Saved Addresses     | Save multiple shipping addresses                             |
| Advanced Search     | Filter products by price range, category, and rating         |

### Admin Mode

| Feature                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| Admin Dashboard         | Access to an admin-only dashboard                  |
| User Management         | View and manage users (delete, promote to admin)   |
| Product Management      | Edit and create products, manage stock levels      |
| Review Management       | View and delete product reviews                    |
| Order Management        | View all orders, and can manage them               |
| Role-Based Permissions  | Restrict admin features based on roles             |
| Order Approval Workflow | Set up approval process for Update status of order |

## Upcoming Features

### Normal User Mode

| Feature                 | Description                                 |
| ----------------------- | ------------------------------------------- |
| Wishlist                | Create and manage wishlists for products    |
| Product Recommendations | Receive suggestions for related products    |
| Product Comparisons     | Compare product specifications side by side |
| Social Sharing          | Share favorite products on social media     |

### Admin Mode

| Feature             | Description                                               |
| ------------------- | --------------------------------------------------------- |
| Sales Analytics     | Gain insights into sales trends and popular products      |
| Dynamic Coupons     | Create and manage targeted coupons                        |
| User Analytics      | Track user engagement and activity                        |
| Bulk Product Upload | Upload and update multiple products using CSV             |
| Automated Emails    | Send automated emails for order confirmation and updates  |
| Notification Center | Receive alerts for new orders, low stock, and more        |
| Data Export         | Export data sets (e.g., orders, products) to CSV or Excel |
| Product Bundles     | Create and manage product bundles                         |

## Dependencies and Libraries

### Backend

| Dependency                              | Description                                           |
| --------------------------------------- | ----------------------------------------------------- |
| @babel/plugin-proposal-class-properties | Babel plugin for class properties                     |
| @strapi/provider-upload-cloudinary      | Cloudinary provider for Strapi uploads                |
| bcryptjs                                | Hash passwords before storing                         |
| body-parser                             | Parse incoming request bodies                         |
| cloudinary                              | Cloud storage for images and videos                   |
| cookie-parser                           | Parse Cookie header and populate req.cookies          |
| cors                                    | Enable Cross-Origin Resource Sharing                  |
| crypto                                  | Cryptographic functions for Node.js                   |
| crypto-js                               | JavaScript library for cryptographic operations       |
| dotenv                                  | Load environment variables from a .env file           |
| express                                 | Web application framework for Node.js                 |
| express-fileupload                      | Middleware to handle file uploads in Express          |
| helmet                                  | Secure HTTP headers middleware                        |
| http-proxy-middleware                   | Proxy requests in development                         |
| jsonwebtoken                            | Generate and verify JSON Web Tokens                   |
| jwt-simple                              | Simple JWT encoding and decoding                      |
| mongoose                                | MongoDB object modeling tool                          |
| nodemailer                              | Send email using Node.js                              |
| nodemon                                 | Monitor for changes in source code and restart server |
| react-chartjs-2                         | React wrapper for Chart.js 2                          |
| stripe                                  | Payment processing library                            |
| validator                               | Validate and sanitize user input                      |

### Frontend

| Dependency                  | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| @emotion/react              | Emotion library for writing CSS with JavaScript              |
| @emotion/styled             | Styled components using Emotion                              |
| @material-ui/core           | UI components library for Material Design                    |
| @material-ui/data-grid      | Data grid component for Material-UI                          |
| @material-ui/icons          | Material Design icons for React components                   |
| @material-ui/lab            | Additional components and utilities for Material-UI          |
| @mui/icons-material         | Material-UI icons for MUI components                         |
| @mui/material               | Material-UI components library                               |
| @mui/styles                 | Styling solution for Material-UI components                  |
| @stripe/react-stripe-js     | React components for Stripe's client-side JavaScript library |
| @stripe/stripe-js           | Stripe's client-side JavaScript library                      |
| @testing-library/user-event | Utilities for simulating events with Testing Library         |
| axios                       | Promise-based HTTP client for the browser and Node.js        |
| highcharts                  | Interactive JavaScript charting library                      |
| highcharts-react-official   | React wrapper for Highcharts library                         |
| node-sass                   | Sass compiler for Node.js                                    |
| react                       | JavaScript library for building user interfaces              |
| react-alert                 | React component for customizable alerts                      |
| react-alert-template-basic  | Basic template for react-alert                               |
| react-dom                   | Entry point to the React DOM library                         |
| react-helmet                | Manage document head in React                                |
| react-js-pagination         | Pagination component for React                               |
| react-material-ui-carousel  | Carousel component for Material-UI                           |
| react-redux                 | State management library for React                           |
| react-router-dom            | Routing library for React applications                       |
| react-scripts               | Create React apps with no build configuration                |
| redux                       | Predictable state container for JavaScript apps              |
| redux-devtools-extension    | Redux DevTools integration                                   |
| redux-thunk                 | Thunk middleware for Redux                                   |
| styled-components           | CSS-in-JS library for styling React components               |
| swiper                      | Mobile touch slider library                                  |
| web-vitals                  | Library for measuring web performance metrics                |

## Hosting Your Complete App on Vercel

This guide will walk you through the process of hosting your complete MERN stack app on Vercel using the `vercel.json` configuration.

### Step 1: Prepare Your Project

- Organize your project with a root directory that contains both frontend and backend folders.
- Ensure both backend and frontend directories have all necessary code and dependencies.
- Create a `vercel.json` file in the root directory.
- Add the following code to `vercel.json`:

  ```json
  {
    "version": 2,
    "builds": [
      {
        "src": "./backend/server.js",
        "use": "@vercel/node"
      },
      {
        "src": "./frotend/build",
        "use": "@vercel/static"
      }
    ],
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/backend/server.js"
      }
    ]
  }
  ```

  - Note :
    - Using this configuration will require you to run npm run build in the frontend directory before deploying to Vercel.
    - Ensure your folder structure looks like this:
      ```json
        root
        ├── backend
        ├── frontend
        │   ├── node_modules
        │   ├── package.json
        │   ├── build
        │   └── ...
        ├── node_modules
        ├── package.json
        ├── vercel.json
        └── ...
      ```

### Step 2: Push Code to GitHub

- Push all your code to GitHub, ignoring the `node_modules` folder and `.env` file.

### Step 3: Create a Vercel Account

- Create an account on Vercel if you haven't already.
- Connect your GitHub account to Vercel.

### Step 4: Create a Vercel Project

- Create a new project in Vercel.
- Select your GitHub repository (e.g., CricketWeapon-store).

### Step 5: Configure Project Settings

- Configure the project settings:
  - Keep the settings as they are.
  - Add all your `.env` variables in the Environment Variables section.

### Step 6: Deploy Your App

- Click on "Deploy" and wait for a few minutes for the deployment process to complete.

### Step 7: Visit Your App

- Once the deployment is successful, click on "Visit" to access your live app.

### Step 8: Enjoy Your App

- Congratulations! Your app is now live and accessible.

## Contributions

 | Contributor                                           |                                                
| ------------------------------------------------------ |
| [ImgBotApp](https://github.com/ImgBotApp)              |  
| [MehraDevesh2022](https://github.com/MehraDevesh2022)  | 

