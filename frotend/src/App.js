import React, { useState, useEffect, Suspense ,useTransition  } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
 
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { load_UserProfile } from "./actions/userAction";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CricketBallLoader from "./component/layouts/loader/Loader";
import PrivateRoute from "./component/Route/PrivateRoute";

import "./App.css";



const Payment = React.lazy(() => import("./component/Cart/Payment"));
const LazyHeader = React.lazy(() =>
  import("./component/layouts/Header1.jsx/Header")
);



const LazyHome = React.lazy(() => import("./component/Home/Home"));
const LazyFooter = React.lazy(() =>
  import("./component/layouts/Footer/Footer")
);

const LazyProductDetails = React.lazy(() =>
  import("./component/Product/ProductDetails")
);
const LazyProducts = React.lazy(() => import("./component/Product/Products"));
const LazySignup = React.lazy(() => import("./component/User/SignUp"));
const LazyLogin = React.lazy(() => import("./component/User/Login"));
const LazyProfile = React.lazy(() => import("./component/User/Profile"));
const LazyUpdateProfile = React.lazy(() =>
  import("./component/User/UpdateProfile")
);
const LazyUpdatePassword = React.lazy(() =>
  import("./component/User/UpdatePassword")
);
const LazyForgetPassword = React.lazy(() =>
  import("./component/User/ForgetPassword")
);
const LazyResetPassword = React.lazy(() =>
  import("./component/User/ResetPassword")
);
const LazyShipping = React.lazy(() => import("./component/Cart/Shipping"));
const LazyCart = React.lazy(() => import("./component/Cart/Cart"));
const LazyConfirmOrder = React.lazy(() =>
  import("./component/Cart/ConfirmOrder")
);



const LazyOrderSuccess = React.lazy(() =>
  import("./component/Cart/OrderSuccess")
);
const LazyMyOrder = React.lazy(() => import("./component/order/MyOrder"));
const LazyContactForm = React.lazy(() =>
  import("./component/layouts/About/Contact")
);
const LazyAboutUsPage = React.lazy(() =>
  import("./component/layouts/About/Aboutus")
);
const LazyDashboard = React.lazy(() => import("./component/Admin/Dashboard"));
const LazyProductList = React.lazy(() =>
  import("./component/Admin/ProductList")
);
const LazyOrderList = React.lazy(() => import("./component/Admin/OrderList"));
const LazyUserList = React.lazy(() => import("./component/Admin/UserList"));
const LazyUpdateProduct = React.lazy(() =>
  import("./component/Admin/UpdateProduct")
);
const LazyProcessOrder = React.lazy(() =>
  import("./component/Admin/ProcessOrder")
);
const LazyUpdateUser = React.lazy(() => import("./component/Admin/UpdateUser"));
const LazyNewProduct = React.lazy(() => import("./component/Admin/NewProduct"));
const LazyProductReviews = React.lazy(() =>
  import("./component/Admin/ProductReviews")
);
const LazyReturnPolicyPage = React.lazy(() =>
  import("./Terms&Condtions/Return")
);
const LazyTermsUse = React.lazy(() => import("./Terms&Condtions/TermsAndUse"));
const LazyTermsAndConditions = React.lazy(() =>
  import("./Terms&Condtions/TermsCondtion")
);
const LazyPrivacyPolicy = React.lazy(() => import("./Terms&Condtions/Privacy"));

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
 const [isPending, startTransition] = useTransition({ timeoutMs: 3000 });
 
  const dispatch = useDispatch();


  // get STRIPE_API_KEY for payment from backend for connection to stripe payment gateway
  async function getStripeApiKey() {
  
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      // Handle error if the API call fails
      console.error("Error fetching Stripe API key:", error);

    }
  }

  useEffect(() => {
    dispatch(load_UserProfile());
    startTransition(() => {
      getStripeApiKey();
    });

    // eslint-disable-next-line
  }, []);

if (isPending) {
  return <CricketBallLoader />;
}
  return (
    <>
      <Router>
        <Suspense fallback={<CricketBallLoader />}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyHome />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/product/:id"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyProductDetails />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/products"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyProducts />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              path="/products/:keyword"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyProducts />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/signup"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazySignup />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/login"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyLogin />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/password/forgot"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyForgetPassword />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/password/reset/:token"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyResetPassword />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/cart"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyCart />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/policy/return"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyReturnPolicyPage />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/policy/Terms"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyTermsUse />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/policy/privacy"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyPrivacyPolicy />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/terms/conditions"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyTermsAndConditions />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/contact"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyContactForm />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/about_us"
              render={() => (
                <>
                  { <LazyHeader />}
                  <LazyAboutUsPage />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/account"
              render={() => (
                <>
                  { <LazyHeader />}
                  <PrivateRoute exact path="/account" component={LazyProfile} />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/profile/update"
              render={() => (
                <>
                  { <LazyHeader />}
                  <PrivateRoute
                    exact
                    path="/profile/update"
                    component={LazyUpdateProfile}
                  />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/password/update"
              render={() => (
                <>
                  { <LazyHeader />}
                  <PrivateRoute
                    exact
                    path="/password/update"
                    component={LazyUpdatePassword}
                  />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/orders"
              render={() => (
                <>
                  { <LazyHeader />}
                  <PrivateRoute exact path="/orders" component={LazyMyOrder} />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/shipping"
              render={() => (
                <>
                  { <LazyHeader />}
                  <PrivateRoute
                    exact
                    path="/shipping"
                    component={LazyShipping}
                  />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/order/confirm"
              render={() => (
                <>
                  { <LazyHeader />}
                  <PrivateRoute
                    exact
                    path="/order/confirm"
                    component={LazyConfirmOrder}
                  />
                 
                  { <LazyFooter />}
                </>
              )}
            />

            <Route
              exact
              path="/success"
              render={() => (
                <>
                  { <LazyHeader />}
                  <PrivateRoute
                    exact
                    path="/success"
                    component={LazyOrderSuccess}
                  />
                 
                  { <LazyFooter />}
                </>
              )}
            />
          </Switch>
        </Suspense>

        {/* Admin routes */}
        <Suspense fallback={<CricketBallLoader />}>
          <Switch>
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/dashboard"
              component={LazyDashboard}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/products"
              component={LazyProductList}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/product/:id"
              component={LazyUpdateProduct}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/reviews"
              component={LazyProductReviews}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/orders"
              component={LazyOrderList}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/order/:id"
              component={LazyProcessOrder}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/new/product"
              component={LazyNewProduct}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/users"
              component={LazyUserList}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/user/:id"
              component={LazyUpdateUser}
            />
          </Switch>
        </Suspense>


        {stripeApiKey && (
          <Suspense fallback={<CricketBallLoader />}>
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Route exact path="/process/payment">
              { <LazyHeader />}
              <PrivateRoute exact path="/process/payment" component={Payment} />
             
              { <LazyFooter />}
            </Route>
          </Elements>
            </Suspense>
        )}
        
      </Router>
    </>
  );
}

export default App;
