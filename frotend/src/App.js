import React, { useState, useEffect } from "react";
import Header from "./component/layouts/Header1.jsx/Header";
import Home from "./component/Home/Home";
import Footer from "./component/layouts/Footer/Footer";
import Services from "./component/layouts/Footer/Service";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductDetails from "./component/Product/ProductDetails";
import "./App.css";
import Products from "./component/Product/Products";
import Signup from "./component/User/SignUp";
import Login from "./component/User/Login";
import Profile from "./component/User/Profile";
import { load_UserProfile } from "./actions/userAction";
import { useSelector, useDispatch } from "react-redux";

import PrivateRoute from "./component/Route/PrivateRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgetPassword from "./component/User/ForgetPassword";
import ResetPassword from "./component/User/ResetPassword";
import Shipping from "./component/Cart/Shipping";
import Cart from "./component/Cart/Cart";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrder from "./component/order/MyOrder";
// import OrderDetails from "./component/order/OrderDetails";
// import Dashboard from "./component/Admin/Dashboard";
// import ProductList from "./component/Admin/ProductList";
// import NewProduct from "./component/Admin/NewProduct";
// import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
// import ProcessOrder from "./component/Admin/ProcessOrder";
// import UserList from "./component/Admin/UserList";
// import UpdateUser from "./component/Admin/UpdateUser";
// import ProductReviews from "./component/Admin/ProductReviews";
// import HeroSlider from "./component/Home/HeroSilder";


import ReturnPolicyPage from "./Terms&Condtions/Return"
import TermsUse from "./Terms&Condtions/TermsAndUse"
import TermsAndConditions from "./Terms&Condtions/TermsAndUse";
import PrivacyPolicy from "./Terms&Condtions/Privacy"
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.userData);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  // get STRIPE_API_KEY for payment from backend for cnnection to stripe payment gateWaY
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    // this is for user data load for profile section if user logged in
    dispatch(load_UserProfile());

    getStripeApiKey();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <PrivateRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/product/:id">
            <ProductDetails />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route path="/products/:keyword">
            <Products />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/password/forgot">
            <ForgetPassword />
          </Route>
          <Route exact path="/password/reset/:token">
            <ResetPassword />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>

          <Route exact path="policy/return">
            <ReturnPolicyPage />
          </Route>
          <Route exact path="policy/Terms">
            <TermsUse />
          </Route>
          <Route exact path="policy/privacy">
            <PrivacyPolicy />
          </Route>
          <Route exact path="terms/conditions">
            <TermsAndConditions />
          </Route>

          <PrivateRoute exact path="/account" component={Profile} />
          <PrivateRoute
            exact
            path="/profile/update"
            component={UpdateProfile}
          />
          <PrivateRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />

          <PrivateRoute exact path="/orders" component={MyOrder} />
          <PrivateRoute exact path="/shipping" component={Shipping} />
          <PrivateRoute exact path="/order/confirm" component={ConfirmOrder} />
          <PrivateRoute exact path="/success" component={OrderSuccess} />
          {/* <PrivateRoute exact path="/shipping" component={Shipping} />
          <PrivateRoute exact path="/order/confirm" component={ConfirmOrder} />
          <PrivateRoute exact path="/success" component={OrderSuccess} />
          <PrivateRoute exact path="/orders" component={MyOrder} />
          <PrivateRoute exact path="/order/:id" component={OrderDetails} />
          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />
          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/products"
            component={ProductList}
          />
          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/new/product"
            component={NewProduct}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/product/:id"
            component={UpdateProduct}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/orders"
            component={OrderList}
          />
          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/order/:id"
            component={ProcessOrder}
          />
          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/users"
            component={UserList}
          />
          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/user/:id"
            component={UpdateUser}
          />
          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/reviews"
            component={ProductReviews}
          /> */}
        </Switch>
        <Services />
        <Footer />
      </Router>
    </>
  );
}

export default App;
