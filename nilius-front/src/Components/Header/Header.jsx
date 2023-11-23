import { Outlet, Link } from "react-router-dom";
import "./Header.css"
import { MdAddShoppingCart } from "react-icons/md";
import { FaSearch, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Cart from "../Cart/Cart.jsx"
import Menu from "../Menu/Menu.jsx"
import React, { useState, useContext} from 'react';
import { CartContext } from "../../Context.jsx"



function Header() {

  const visible = useContext(CartContext);

  /*const Reset = () => {
  visible.setLogin(false);
  visible.setUser("");
};*/

  const VisibleCart = () => {
    if(visible.cart == true){
      visible.setCart(false)
    } else{
      visible.setCart(true)
    }
  };
 


  return (
    <div className="App">
<div className="Container">
  <div className="Header-Container">

  {/*<div className='subNav'>
      <button
       className='IconSpan' >
        <GiHamburgerMenu className="icon"/>
      </button> 
  </div>*/}

<Link to={"/"}>
  <div className="logo-container"> 
  <img className="logo" src="https://nilius.s3.us-east-2.amazonaws.com/fotos/Iconos/Logo.png" alt="" />
  </div>
</Link>


<div className="search">
    <input 
     className="inputSearch"
    type="text" />
    <button id="search-btn">
      <FaSearch id="search-icon"/>
      </button>
</div>

<div className="Nav">

{visible.logIn ? (
  <div>
    <div className="subNav">
      <span className="UsuarioSpan"><FaUser/>_{visible.user.name}</span>
      <span className="UsuarioSpan second">
        <span
      >logOut</span></span>
    </div>
  </div>
) : <Link to="/LogIn">
<div className="subNav">
  <span className="UsuarioSpan">Usuario</span>
  <span className="UsuarioSpan second">Sign In</span>
</div>
</Link>}

  


  <div className='subNav'>
      <button className='IconSpan' onClick={VisibleCart}>
      <MdAddShoppingCart className="icon"/>
        </button> 
  </div>

</div>
</div>
</div>

<Cart/>

<Outlet />
</div>
  );
}

export default Header;