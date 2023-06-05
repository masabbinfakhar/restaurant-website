import React, { useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {clearCart} from "../../actions/cartAction";
// import CartItemCard from "./CartItemCard";
import { useDispatch } from "react-redux";




const OrderSuccess = () => {
  const dispatch = useDispatch();


  const deleteCartItems = () => {
    dispatch(clearCart());
  };

  useEffect(()=>{
    deleteCartItems();
  });

  return (
    
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
      {/* clearCart */}
    </div>
  );
};

export default OrderSuccess;