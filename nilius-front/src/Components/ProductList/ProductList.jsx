import React from 'react';
import "./ProductList.css";
import Product from '../Product/Product.jsx';
import { useState, useContext, useEffect } from 'react';
import { getProductRequest, getImgRequest } from '../../api/products.api';
import { CartContext } from '../../Context.jsx';



const ProductList = (cat) => {
  
  const Hproduct = useContext(CartContext);
  const [array, setArray] = useState([]);
  const [img, setImg] = useState([]);
  const [product, setProduct] = useState([]);

  


  useEffect(() => { 
    Hproduct.setCategory(cat.cat)
    console.log(cat.cat);
  }, []);

  useEffect(() => {
    
    if (Hproduct.itemC) {
      let newArray = [];
      for (let i = 0; i < Hproduct.itemC.length; i++) {
        newArray.push(Hproduct.itemC[i].id);
      }
      setArray(newArray);
    }
  }, [Hproduct.itemC]);

  useEffect(() => {
    async function fetchData() {
      const products = [];
      const images = [];

      for (let j = 0; j < array.length; j++) {
        const id_product = array[j];
        const response = await getProductRequest(id_product);
        const responseI = await getImgRequest(id_product);

        products.push(response.data);
        images.push(responseI.data[0].url);
      }

      setProduct(products);
      //console.log(products.data);
      setImg(images);
    }

    if (array.length > 0) {
      fetchData();
    }
  }, [array]);





  return (
<div className='product-container'>
  
    <div className='product-list-container'>

           {/* <h4 className='title-list'>Pulgadas:</h4>
        <div className='menu-lsit'>
            <p className='sub-list'>11.6"</p>
            <p className='sub-list'>12.3"</p>
            <p className='sub-list'>15.6"</p>
        </div>*/}

        <div className='product-list'>
          <div className="row-list">

 

{product.map((product, index) => (
        <Product
          key={product.id}
          id={product.id}
          image={img[index]}
          title={product.title}
          price={product.price}
        />
      ))}



      </div>

      </div>
    </div>


</div>
  )
}

export default ProductList
