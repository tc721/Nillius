import React, { useState, useContext, useEffect } from 'react';
import { logInRequest } from '../../api/user.api.js';
import { CartContext } from '../../Context.jsx';
import { IoArrowUndo } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./LogIn.css";

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verification, setVerification] = useState(false);

  const LogContext = useContext(CartContext);
  //const history = useHistory();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    LogContext.setLogIn(false);

  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await logInRequest(email, password);

      if (response && response.id) {
        // La autenticación fue exitosa
        console.log('Inicio de sesión exitoso');
        console.log(response);
        LogContext.setLogIn(true);
        LogContext.setUser(response);

        // Redirigir a la página de inicio ("/") después de 2 segundos
        setTimeout(() => {
          navigate('/');
        }, 2000)
      } else {
        if (response && response.message) {
          console.error('Error al iniciar sesión:', response.message);
        } else {
          console.error('Error al iniciar sesión: Credenciales incorrectas');
          setVerification(true);

          setTimeout(() => {
            setVerification(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de inicio de sesión:', error);
    }
  };

  return (
    <div className="Logcontainer">
      <div className="form-container">
        <Link to={"/"} className='backtohome'>
          <IoArrowUndo className='backtohome' />
        </Link>
        <img className="logo lo-login" src="https://nilius.s3.us-east-2.amazonaws.com/fotos/Iconos/Logo.png" alt="" />
        <form onSubmit={handleSubmit}>
          <input className="LogInput"
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input className="LogInput"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {verification && <p className="error-message">Credenciales incorrectas</p>}
          {LogContext.logIn && <p className="approved-message">Logeado con éxito!</p>}
          <button className="logSubmit" type="submit">Iniciar Sesión</button>
        </form>

        <p className='LinkBlanco'>No tienes cuenta ? <Link to={"/SignUp"} >  <b>Crear una cuenta</b></Link></p>
      </div>
    </div>
  );
}

export default LogIn;