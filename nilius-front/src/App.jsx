import {Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Header from "./Components/Header/Header.jsx";
import List from "./Components/ProductList/ProductList.jsx";
import Item from "./Components/Item/Item.jsx";
import LogIn from "./Components/LogIn/LogIn.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import Payed from "./Components/AfterPay/Payed.jsx";
import Prueba from "./Components/Prueba/Prueba.jsx"
//import AllProducts from "./Components/All/AllProducts.jsx"
import "./App.css";
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from "./Context";

const App = () => {

  const Urls = useContext(CartContext);
  const [array, setArray] = useState([]);
 // const [arr, setArr] = useState([ "parlante", "audio" ]);

  useEffect(() => {
    if (Urls.item) {
      let newArray = [];
      for (let i = 0; i < Urls.item.length; i++) {
        newArray.push(Urls.item[i].id);
      }
      setArray(newArray);
      //console.log(newArray);
    }
  }, [Urls.item]);

  return (
      <Routes>

        <Route path="/Payed" element={<Payed/>}/>
        <Route path="/Prueba" element={<Prueba/>}/>

        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/LogIn" element={<LogIn/>}/>
        <Route path="/" element={<Home/>}/>

        <Route path="/checkout" element={<Header/>}/>


        <Route path="/Item" element={<Header/>}>
        {array.map((itemId) => (
           <Route key={itemId} path={`${itemId}`} element={<Item  id={`${itemId}`}/>} />
        ))}
        </Route>
      

        <Route path="/list" element={<Header/>}>
         <Route path="cables" element ={<List cat="cables"/>}/>
          <Route path="audio" element ={<List cat="audio"/>}/>
          <Route path="accesorios" element ={<List cat="accesorios"/>}/>
        </Route>

      </Routes>
  )
}

export default App
