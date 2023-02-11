import React from 'react'
import playStore from "../../../Image/playstore.png";
import appStore from "../../../Image/Appstore.png";
import "./Footer.css";
function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playStore-img" />
        <img src={appStore} alt="AppStore icon" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2022 &copy; iam_Devesh</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/iam_nightbot/">Instaram</a>
        <a href="https://www.instagram.com/iam_nightbot/">Instaram</a>
        <a href="https://www.instagram.com/iam_nightbot/">Instaram</a>
      </div>
    </footer>
  );
}

export default Footer