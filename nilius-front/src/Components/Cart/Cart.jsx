import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { CartContext } from "../../Context.jsx"
import Item from "./CItem/CItem.jsx"
import { getProductRequest } from '../../api/products.api';
import { postOrderRequest } from '../../api/payment.api.js';
import { Link } from "react-router-dom";


const Cart = () => {

  const cartContext = useContext(CartContext);

  //console.log(cartContext.cartItems[0][1]);


  const [clase, setClase] = useState('Hidden');



 



  const exitbtn = async () => {
    cartContext.setCart(true)
  }






  useEffect(() => {
   if(cartContext.cart == true){
    setClase("Hidden")
   } else{
    setClase("Visible")
   }
    
  }, [cartContext.cart]);




const handleCheckout = async () => {
  if(cartContext.user.id){

  const orderData = {
      value: Number(cartContext.montoTotal),
      products: cartContext.cartItems.toString() , 
      user_id: cartContext.user.id,
    } 
  if(orderData.value > 0){
    await postOrderRequest(orderData);
  }
} else{
  console.log("no hay usuarios logeados")
}

};



  return (

      <div className= {clase}>
        <div className='ContainerCart'>

        
          <div className="Right-cart-container">



          {cartContext.cartItems.map((item, index) => (

          <Item
          key= {index} //quitar luego (no necesario)
          id={item}
          indexI= {index}
          />
          )
        )}


          </div>

          <div className='CartFooter'>
            <p>Monto Total: <b>USD {cartContext.montoTotal}</b></p>
            <div className='CartFooterbtn'>
            {cartContext.user ? (
              <button onClick={handleCheckout}
              className='FinalizarCompra'>
              Pagar
            </button>
            ) : <Link className='FinalizarCompra'
            to="/LogIn">
              <span className="center">Sign In</span>
            </Link>}
            <button onClick={exitbtn}
            className='cartExit'>X</button>
            </div>

           
          </div>

        </div>
      </div>
  );
};

export default Cart;
