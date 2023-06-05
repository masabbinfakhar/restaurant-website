



import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import WebFont from "webfontloader";
import React,{useEffect,useState } from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search  from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import {useSelector} from "react-redux";
// import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile  from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
// import NotFound from "./component/layout/Not Found/NotFound.js";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";




function App(){

  const {isAuthenticated,user}=useSelector(state=>state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");
  // const Navigate = useNavigate();


  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
});
store.dispatch(loadUser());

getStripeApiKey();
  

},[]);

// window.addEventListener("contextmenu", (e) => e.preventDefault()); //user window per left karkay kuch nahi karsakta


return(
<Router>
  <Header/>
  {isAuthenticated && <UserOptions user={user} />}
  {/* {isAuthenticated && <Profile user={user}/> } */}
  {/* {isAuthenticated && <updateProfile user={user}/> } */}

   {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          {isAuthenticated &&<Payment user={user}/>}
        </Elements>
      )} */}


  <Routes>
  {/* {isAuthenticated && <Route element={<UserOptions user={user} />} />} */}
  <Route exact path="/" element={<Home/>}/>
  <Route exact path="/contact" element={<Contact/>} />
  <Route exact path="/about" element={<About/>} />
  <Route exact path="/product/:id" element={<ProductDetails/>}/>
  <Route exact path="/products" element={<Products/>}/>
  <Route exact path="/products/:keyword" element={<Products/>}/>
  <Route exact path="/search" element={<Search/>}/>
  <Route exact path="/me/update" element={<UpdateProfile user={user} />} />
  <Route exact path="/password/update" element={<UpdatePassword user={user} />} />
  <Route exact path="/password/forgot" element={<ForgotPassword/>} />
  <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
  <Route exact path="/Profile" element={<ResetPassword user={user}/>} />
  <Route exact path="/account" element={isAuthenticated ?<Profile user={user} /> :<LoginSignUp/>}/>
  <Route exact path="/login" element={<LoginSignUp/>}/>
  <Route exact path="/cart" element={isAuthenticated ?<Cart user={user}/>:<LoginSignUp/>}/>
  <Route exact path="/shipping" element={isAuthenticated ? <Shipping user={user} /> : <LoginSignUp />} />
  <Route exact path="/order/confirm" element={<ConfirmOrder user={user} />} />
  {/* <Elements>
  <Route exact path="/process/payment" element={<Payment user={user} />} />
  </Elements> */}

{/* <Route
    path="/process/payment"
    element={(
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
    )}
  /> */}
  {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exact path="/process/payment" element={<Payment user={user}/>} />
        </Elements>
      )} */}

<Route exact path="/process/payment" element={stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            {isAuthenticated && <Payment user={user} />}
          </Elements>
        )} />

<Route exact path="/success" element={isAuthenticated ?<OrderSuccess user={user}/>:<LoginSignUp />} />
{/* <Route exact path="/orders" element={<MyOrders user={user} />} /> */}

<Route exact path="/orders" element={isAuthenticated ? <MyOrders user={user} /> : <LoginSignUp />} />

<Route exact path="/order/:id" element={isAuthenticated ? <OrderDetails user={user} /> : <LoginSignUp />} />

<Route exact path="/admin/dashboard" element={isAuthenticated ?<Dashboard user={user} /> : <LoginSignUp />} />

<Route exact path="/admin/products" element={isAuthenticated ?<ProductList user={user}/>:<Dashboard/>}/>

{/* <Route
  exact
  path="/admin/products"
  element={
    user === "admin" ? (
      <ProductList user={user} />
    ) : (
      <LoginSignUp/>
    )
  }
/> */}


<Route exact path="/admin/product" element={isAuthenticated ? <NewProduct user={user} /> : <LoginSignUp />} />

<Route exact path="/admin/product/:id" element={isAuthenticated ? <UpdateProduct user={user} /> : <LoginSignUp />} />

<Route exact path="/admin/orders" element={isAuthenticated ? <OrderList user={user} /> : <LoginSignUp />} />

<Route exact path="/admin/order/:id" element={isAuthenticated ? <ProcessOrder user={user} /> : <LoginSignUp />} />

<Route exact path="/admin/users" element={isAuthenticated ? <UsersList user={user} /> : <LoginSignUp />} />

<Route exact path="/admin/user/:id" element={isAuthenticated ? <UpdateUser user={user} /> : <LoginSignUp />} />

<Route exact path="/admin/reviews" element={isAuthenticated ?<ProductReviews user={user} /> : <LoginSignUp />} />

{/* <Route exact element={<NotFound/>}/>  */}





  </Routes>

  
  <Footer/>
</Router>
);
}
export default App;