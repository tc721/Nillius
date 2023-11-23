import React from 'react';
import { Link } from 'react-router-dom';
import './Payed.css';

const VerticalCenterContainer = ({ children }) => (
  <div className="vertical-center-container">
    {children}
  </div>
);

const Payed = () => {
  // Obtener el token y el éxito de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const success = urlParams.get('success') === 'true'; // Convertir a booleano

  return (
    <VerticalCenterContainer>
      <div className={`payed-container ${success ? 'success' : 'failure'}`}>
        <Link to={"/"} className='backhome'>
          <p>volver</p>
        </Link>
        <Link to={"/"}>
          <div className="Nilius-img-container"> 
            <img src="https://nilius.s3.us-east-2.amazonaws.com/fotos/Iconos/Logo.png" alt="" />
          </div>
        </Link>
        <div className="payed-content">
          <h1>{success ? 'Pago Completado' : 'Pago No Completado'}</h1>
          <p>{success ? 'Guarde su código de compra' : 'Lo sentimos, el pago no se pudo completar'}</p>
          {success && (
            <div className="token-container">
              <label className="token-label">Código de compra:</label>
              <div className="token">{token}</div>
            </div>
          )}
        </div>
      </div>
    </VerticalCenterContainer>
  );
};

export default Payed;