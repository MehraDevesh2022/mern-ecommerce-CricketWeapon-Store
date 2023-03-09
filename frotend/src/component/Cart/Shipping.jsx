import React, { useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layouts/MataData/MataData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import CheckoutSteps from "./CheckoutSteps ";

import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
function Shipping() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history  = useHistory();
  const { shippingInfo } = useSelector((state) => state.cart);

  // now state for from input filed
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


   const shippingInfoSubmitHandler =(e) =>{
      e.preventDefault();

      // cheack lenght of phone number
        if (phoneNo.length < 10 || phoneNo.length > 10) {
          alert.error("Phone Number should be 10 digits Long");
          return;
        }
         dispatch(saveShippingInfo({address , city , state , country , pinCode , phoneNo}))
                history.push("/order/confirm");
   }


  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={2} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form className="shippingForm" onSubmit={shippingInfoSubmitHandler}>
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="text"
                placeholder="Pin Code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div>
              <PublicIcon />
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div>
              <PublicIcon />
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <button className="shippingBtn " disabled={state ? false : true}>
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Shipping;
