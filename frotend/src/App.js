import React,{useState , useEffect} from "react";
import Footer from "./component/layouts/Footer/Footer";
import Header from "./component/layouts/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import "./App.css";
import Products from "./component/Product/Products";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile";
import { load_UserProfile } from "./actions/userAction";
import store from "./store";
import { useSelector } from "react-redux";
import UserOptions from "./component/layouts/Header/UserOptions";
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


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.userData);
     const [stripeApiKey, setStripeApiKey] = useState("");



     // get STRIPE_API_KEY for payment from backend for cnnection to stripe payment gateWaY
   async function getStripeApiKey(){
      const { data } = await axios.get("/api/v1/stripeapikey");
         setStripeApiKey(data.stripeApiKey);
    
     }

  React.useEffect(() => {
    // this is for user data load for profile section if user logged in
    store.dispatch(load_UserProfile());

    getStripeApiKey();
   
  }, [stripeApiKey]);





  return (
    <>
      <Router>
        <Header />
        {/* if user loggedin then show UserOptions component for user options  */}
        {isAuthenticated && <UserOptions user={user} />}

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
          <Route exact path="/login">
            <LoginSignUp />
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
          <PrivateRoute exact path="/shipping" component={Shipping} />
          <PrivateRoute exact path="/order/confirm" component={ConfirmOrder} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
