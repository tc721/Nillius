import React, { useState, useEffect } from 'react';
import { getProductsIdRequest, getProductCategoryRequest, getProductRequest } from './api/products.api.js';

export const CartContext = React.createContext({});




export default function CartContextProvider ({ children }) { 


    const [cart, setCart] = useState(true);

    const[cartItems, setCartItems] = useState([]);

 //monto total
    const [montoTotal, setMontoTotal] = useState(0);

    useEffect(() => {
      async function Monto() {
        let monto = 0;
  
        for(let i=0; i < cartItems.length; i++){
          const response = await getProductRequest(cartItems[i][0]);
          //console.log(response.data.price);
          monto = monto + (parseInt(response.data.price) * parseInt(cartItems[i][1]));
        }
        setMontoTotal(monto);

      }
      Monto();
  
    }, [cartItems]);


    const [logIn, setLogIn] = useState(false);
    const [user, setUser] = useState(false);

    const [item, setItem] = useState();

    const [itemC, setItemC] = useState();
    const [category, setCategory] = useState();





    async function loadProductsId() {
      const response = await getProductsIdRequest();
      setItem(response.data);
    }
    async function loadProductsCategory() {
      if(category){
        const responseC = await getProductCategoryRequest(category);
        setItemC(responseC.data);
        console.log(responseC.data);
      }
    }


    useEffect(() => {
        loadProductsId();
      }, []);
      useEffect(() => {
        loadProductsCategory();
      }, [category]);


    

    return ( // Corrección: Cambio de llaves {} a paréntesis ()
        <CartContext.Provider value={{ cart, setCart, item, setItem, itemC, category, setCategory, cartItems, setCartItems, montoTotal, logIn, setLogIn, user, setUser }}>
            {children}
        </CartContext.Provider>
    );
}