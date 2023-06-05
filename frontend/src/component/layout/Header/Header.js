import React from "react";
import { ReactNavbar } from "overlay-navbar";
// import { Navbar } from 'react-navbar-menu'
import logo from "../../../images/log1.png";
// import { Link } from "react-router-dom";
// import { FaShoppingCart, FaUserAlt} from "react-icons/fa";
// import { CgShoppingCart } from "react-icons/cg";
// import { FaShoppingCart, FaUserAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Items",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
 
};




const Header = () => {
  const navigate = useNavigate();


  const handleClick = () => {
    // programmatically close the navbar when a link is clicked
    const navbar = document.querySelector(".overlay-navbar");
    navbar.classList.remove("active");
  };

  return (
    <ReactNavbar {...options} onLinkClick={handleClick}>
      <img src={logo} alt="Logo" />
      <a href="/" onClick={() => navigate("/")}>Home</a>
      <a href="/products" onClick={() => navigate("/products")}>Food</a>
      <a href="/contact" onClick={() => navigate("/contact")}>Contact</a>
      <a href="/about" onClick={() => navigate("/about")}>About</a>
    </ReactNavbar>
  );
};

export default Header;