import React, { useContext } from "react";
import "./Header.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import logo from "../../../Image/logo.png";
function Header() {
  return (
    <div className="header">
      {/* header-logo */}

      <Link to="/">
        <img src={logo} alt="Ecart-logo" className="header__logo" />
      </Link>

      {/* header-navbar */}
      <div className="header__nav">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Product</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </div>

      {/* header-input-box */}
      <div className="header__search">
        <input type="text" className="header__search_Input" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <Link to="/checkout" style={{ textDecoration: "none" }}>
        <div className="header__optionBasket">
          <ShoppingBasketIcon />
          <span className="header__optionLineTwo header__basketCount">{5}</span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
