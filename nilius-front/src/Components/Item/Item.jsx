import React from 'react'
import "./Item.css"
import { useState, useContext, useEffect } from 'react'
import { MdAddShoppingCart } from "react-icons/md";
import { getProductRequest, getImgRequest } from '../../api/products.api';
import { postOrderRequest } from '../../api/payment.api';
import { CartContext } from '../../Context.jsx';


const Item = (IId) => {
  //console.log(IId.id);

  //const initialImg = "https://nilius.s3.us-east-2.amazonaws.com/fotos/parlante/Main.jpg";
  
  const [mainImg, setMainImg] = useState();

  const cambiarImagen = (newImg) => {
    
    // Cambia la imagen actual
    if (mainImg === newImg) {
      return;
    } else {
      setMainImg(newImg);
    }
  };




// --------------------------------------------------------------------------

const Iproduct = useContext(CartContext);
const [img, setImg] = useState([]);
const [product, setProduct] = useState();

useEffect(() => {
  async function fetchData(id) {
    let images = [];

      const response = await getProductRequest(id);
      const responseI = await getImgRequest(id);
    
      if (responseI.data && responseI.data.length > 0) {
        // Procede a acceder a las propiedades
        for (let i = 0; i < Math.min(4, responseI.data.length); i++) {
          images.push(responseI.data[i].url);
          //console.log(responseI.data[i].url);
        }
      } else {
        console.error("La estructura de responseI.data no es la esperada:", responseI.data);
      }
    setImg(images);
    setMainImg(responseI.data[0].url);
    setProduct(response.data)
    console.log(response.data);
  }
  fetchData(IId.id);
  //console.log(IId.id);
     
}, []);

/*function SetItem(arr){

    Iproduct.setCartItems(arr);
    console.log("agregado");
    console.log(arr);

}*/


function SetCart(idd){



  const arr = [...Iproduct.cartItems, [idd, 1]];
  const repetido = Iproduct.cartItems;

  //console.log(repetido);
  //console.log(idd);
  //console.log(repetido[2]);

 if(repetido.length == 0){
      //console.log("vacio")
      Iproduct.setCartItems(arr);
  } else{
    let rep = false;
    let arrsum = [];

    for(let i=0; i < repetido.length; i++){



      if(repetido[i][0] == idd && repetido[i][1] < 20){
        //console.log("repetido");
        const sum = repetido[i][1] + 1;
        arrsum.push([repetido[i][0], sum]);
        rep = true;
     
     } else if(repetido[i][0] == idd && repetido[i][1] == 20){ 
      arrsum.push(repetido[i]);
      rep = true;
    }else{
       arrsum.push(repetido[i]);
     }

    }
    if (rep == false){
      //console.log("ingresado");
      Iproduct.setCartItems(arr);
    }else if(rep == true){
      Iproduct.setCartItems(arrsum);
    }

    

  }

}



  return (
    <div className='item-build-container'>
        <div className='build-container'>

        {img && (
  <div className='item'>
    <div className='item-img-container'>
      <img className="item-img" src={mainImg} alt="" />
    </div>

    <div className='sub-img-container'>
      {img.map((image, index) => (
        <button onClick={() => cambiarImagen(image)} className='sub-img' key={index}>
          <img className="sub-item-img" src={image} alt="" />
        </button>
      ))}
    </div>
  </div>
)}


            <div className='menu-item'>
                
            {product && (
  <div className='description-item'>
    <p className='description-title-item'>{product.title}</p>
    <div className='item-price'>
      <span className='new-price'><b>USD {product.price}</b></span> 
    </div>
    <p className='item-description'>{product.description}</p>
  </div>
)}

               <div className='buttons-item'>
                <button onClick={() => SetCart(IId.id)}
                className='comprar'> <p>agregar al carrito  </p> <MdAddShoppingCart id='carrito'/></button>
               </div>


            
            </div>




      
        </div>
    </div>
  )
}

export default Item
