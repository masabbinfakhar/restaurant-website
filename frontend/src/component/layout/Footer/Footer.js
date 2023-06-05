import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>HOT & SPICY</h1>
        <p>Provding tasty food is our first priority</p>

        <p>Copyrights 2023 &copy; Masab bin Fakhar</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.linkedin.com/in/masab-bin-fakhar-38878520a/">Linkedin</a>
        {/* <a href="https://www.facebook.com/wamiq.akram.5?mibextid=ZbWKwL
">facebook</a> */}
     
      </div>
    </footer>
  );
};

export default Footer;
