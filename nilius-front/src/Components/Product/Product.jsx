import React from 'react';
import "./Product.css";
import { Link } from "react-router-dom";

function Product({ title, image, price, id }) {

  return (
    <Link className='Product' to={`/Item/${id}`}>

      <img className="product-img" src={image} alt="" />

      <div className="info">
        <p className='Ptitle'>{title}</p>
        <p className='price'
        >USD <b className='num_price'>{price}</b>
        </p>
      </div>


        </Link>
  );
}

export default Product
