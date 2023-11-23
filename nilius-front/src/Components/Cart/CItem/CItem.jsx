import React from 'react'
import "./CItem.css"
import { FaTrash } from "react-icons/fa";

import { useEffect, useContext, useState } from 'react';
import { getProductRequest, getImgRequest } from '../../../api/products.api';
import { CartContext } from '../../../Context.jsx';

const CItem = (id) => {

//console.log(id.id);



    const Cartproduct = useContext(CartContext);

    const [cproduct, setCproduct] = useState();
    const [cproductimg, setCproductimg] = useState();

    useEffect(() => {


        async function Cartproductimg(id) {
            const response = await getProductRequest(id);
            const responseI = await getImgRequest(id);
            setCproduct(response.data);
            setCproductimg(responseI.data[0].url);

        }



        Cartproductimg(id.id)

      }, [Cartproduct.cartItems]);

     function sum(){
      const arr = Cartproduct.cartItems;
      let newArr = [];


      for(let i=0; i < arr.length; i++){

          if(arr[i][0] == id.id[0] && arr[i][1] < 20){
              newArr.push([arr[i][0], arr[i][1] + 1]);
          }else{
            newArr.push(arr[i]);
          }

      }
      Cartproduct.setCartItems(newArr);

      }



    function res(){
     
      const arr = Cartproduct.cartItems;
      let newArr = [];


      for(let i=0; i < arr.length; i++){

          if(arr[i][0] == id.id[0] && arr[i][1] > 0){
              newArr.push([arr[i][0], arr[i][1] - 1]);
          }else{
            newArr.push(arr[i]);
          }

      }
      Cartproduct.setCartItems(newArr);
        }


        


function Idelete(){
     const arr = Cartproduct.cartItems;
     let newArr = [];

     for(let i = 0; i < arr.length; i++){
      if(arr[i][0] == id.id[0]){
        console.log("eliminado");
      } else{
        newArr.push(arr[i]);
        }
      
     }
     Cartproduct.setCartItems(newArr);
        }







        



  return (
        <div className='CartItem' id = {id.id[0]}>
                <div className='CartImg'>
                   <img className='Cimg' src={cproductimg} alt="" />
                </div>
                <div className='CartDescriptionContainer'>
                  <div className='Cartfr'> 
                  {cproduct && <p>{cproduct.price}</p>}
                  </div>
                  <div className='Cartfr'>
                  
                    <div className='d'>  
                    <button onClick={res}
                    className='Cbtn'>-</button>

                    <input
                    className="CartValue" type="text" value={Cartproduct.cartItems[id.indexI][1]} readOnly />

                    
                    <button onClick={sum}
                    className='Cbtn'>+</button>
                    </div>

                  </div>
                  <div className='Cartfr'>
                    {cproduct && <p>{cproduct.price}</p>}
                    <button className='Cbtn trashbtn'
                    onClick={Idelete}
                    >
                      <FaTrash/>
                    </button>
                  </div>
                </div>
        </div>
  )
}

export default CItem
