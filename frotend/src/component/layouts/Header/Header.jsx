import React from "react";
import "./Header.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import logo from "../../../Image/logo.png";
import { useHistory } from "react-router-dom";
function Header() {
  const history  = useHistory();
  const [keyword , setKeyWord] = React.useState("");

   const searchSubmitHandler = (e)=>{
    e.preventDefault();

    if(keyword.trim()){
       history.push(`/products/${keyword}`);

    }else{
      history.push("/products");
    }

   }

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
          <Link to="/products">
            <li>
              <a href="#">Product</a>
            </li>
          </Link>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </div>

      {/* header-input-box */}
      <form className="header__search" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          className="header__search_Input"
          value={keyword}
          placeholder="Search a Product ..."
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <button>
          <SearchIcon className="header__searchIcon" />
        </button>
      </form>

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
