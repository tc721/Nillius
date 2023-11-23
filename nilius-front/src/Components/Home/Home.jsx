
import "./Home.css";
import Product from '../Product/Product.jsx';
import Header from "../Header/Header.jsx"
import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link } from "react-router-dom";
import { getProductRequest, getImgRequest } from '../../api/products.api';
import { CartContext } from '../../Context.jsx';


const Home = () => {


  const [mainbanner, setMainbanner] = useState(0);

  const VisibleImg = (mostrarId, ocultarId) => {
    if (mostrarId === ocultarId) {
      return; // Salir temprano si los IDs son iguales
    }

    const visible = document.getElementById(mostrarId);
    const hidden = document.getElementById(ocultarId);

    if (visible && hidden) {
      visible.classList.remove('hidden');
      hidden.classList.add('hidden');
      setMainbanner(mostrarId);
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      // Determina qué imagen ocultar y cuál mostrar automáticamente
      let mostrarId, ocultarId;

      switch (mainbanner) {
        case '0':
          mostrarId = '1';
          ocultarId = '0';
          break;
        case '1':
          mostrarId = '2';
          ocultarId = '1';
          break;
        case '2':
        default:
          mostrarId = '0';
          ocultarId = '2';
          break;
      }

      VisibleImg(mostrarId, ocultarId);
    }, 6000); // 6 segundos

    return () => {
      clearInterval(interval);
    };
  }, [mainbanner]);



  /* --------------importar producto de la base de datos------------------- */



  const Hproduct = useContext(CartContext);
  const [array, setArray] = useState([]);
  const [img, setImg] = useState([]);
  const [product, setProduct] = useState([]);


  useEffect(() => {
    if (Hproduct.item) {
      let newArray = [];
      for (let i = 0; i < Hproduct.item.length; i++) {
        newArray.push(Hproduct.item[i].id);
      }
      setArray(newArray);
    }
  }, [Hproduct.item]);

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
        //console.log(responseI.data[0].url );
      }

      setProduct(products);
      //console.log(products.data);
      setImg(images.slice(-4));
    }

    if (array.length > 0) {
      fetchData();
    }
  }, [array]);




  return (
    <div className="Home">

  <Header/>

        <div className="header-home">
          <div className="product-container" >
            <Link to={"/list/Accesorios"}>
              <img className="product" src="https://nilius.s3.us-east-2.amazonaws.com/soporte+auto+/PhotoRoom_20231107_121426.JPG" alt="" />
            </Link>
          <h3>Accesorios</h3>
          </div>
          <div className="product-container">
            <Link to={"/list/cables"}>
              <img className="product" src="https://nilius.s3.us-east-2.amazonaws.com/Cargador+PD-400+blanco+/PhotoRoom_20231107_134855.JPG" alt="" />
            </Link>
          <h3>Cables</h3>
          </div>

          <div className="product-container">
            <Link to={"/list/audio"}>
              <img className="product" src="https://nilius.s3.us-east-2.amazonaws.com/auricular+con+pantalla+tactil+hk-90BL-+NEGROS+/PhotoRoom_20231109_134800.JPG" alt="" />
            </Link>
          <h3>Audio</h3>
          </div>

          
          
        </div>


    <div className='rowContainer'>
       
       

      <h3>ÚLTIMAS UNIDADES</h3>

      <div className="row">
          
           
           {product.slice(-4).map((product, index) => (
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


    {/*<div className="bot-container">
      <div className="description-container">

        <div className="description">
          <ul className="ul-description">
            <li className="li-description"> <h4>AYUDA</h4></li>
            <li className="li-description"> nosotros</li>
            <li className="li-description">Servicio Técnico y Garantía</li>
            <li className="li-description">Activación de Seguro para Notebook</li>
        </ul>
        </div>


        <div className="description">
        <ul className="ul-description">
            <li className="li-description"> <h4>EMPRESA</h4></li>
            <li className="li-description"> nosotros</li>
            <li className="li-description">Contacto</li>
            <li className="li-description">Tiendas</li>
        </ul>
        </div>
        

        <div className="description">
        <ul className="ul-description">
            <li className="li-description"> <h4>COMPRA</h4></li>
            <li className="li-description"> Como comprar</li>
            <li className="li-description">Condiciones de compra</li>
            <li className="li-description">Envíos y devoluciones</li>
        </ul>
        </div>

      </div>
           </div>*/}


    </div>
  )
}

export default Home
