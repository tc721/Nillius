import React, { useState } from 'react';
import { IoArrowUndo } from "react-icons/io5";
import { sendVerificationCode, verifyCodeRequest, signUpRequest } from '../../api/user.api.js';
import { Link } from "react-router-dom";
import "./SignUp.css"

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [registered, setRegistered] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [verification, setVerification] = useState(false);

  const handleSendVerificationCode = async () => {
    try {
      await sendVerificationCode(email);
      setVerificationCodeSent(true);
    } catch (error) {
      console.error('Error al enviar el código de verificación:', error);
      setVerification(true);

      setTimeout(() => {
        setVerification(false);
      }, 3000);
      
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await verifyCodeRequest(verificationCode);

      if (response) {
        // El código de verificación es válido, muestra el formulario de registro
        setVerificationCodeSent(false);
        setRegistered(true);
      } else {
        // El código de verificación no es válido, muestra un mensaje de error
        setVerificationError('Código incorrecto');
      }
    } catch (error) {
      console.error('Error al verificar el código de verificación:', error);
    }
  };

  const handleSubmit = async () => {
    // Validación de contraseñas
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return; // Detener el registro si las contraseñas no coinciden
    }
  
    try {
      const response = await signUpRequest(name, email, password, cellPhone);
  
      // Puedes manejar la respuesta aquí, por ejemplo, mostrar un mensaje de éxito o redirigir al usuario a una página de inicio de sesión.
      console.log('Registro exitoso:', response); 
      window.location.href = '/LogIn';
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div className="Logcontainer">
      {registered ? (
        <div className="form-container"> 
        <Link to={"/"} className='backtohome'>
      <IoArrowUndo className='backtohome' />
      </Link>
         <img className="logo si-signUp" src="https://nilius.s3.us-east-2.amazonaws.com/fotos/Iconos/Logo.png" alt="" />
          <input className="LogInput"
            type="text"
            placeholder="Nombre"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input className="LogInput"
            type="password"
            placeholder="Contraseña"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          <input className="LogInput"
            type="password"
            placeholder="Confirmar contraseña"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input className="LogInput"
            type="tel"
            placeholder="Numero de telefono"
            id="cellPhone"
            value={cellPhone}
            onChange={(e) => setCellPhone(e.target.value)}
            required
          />
          <button className="logSubmit"  onClick={handleSubmit}>Ingresar datos</button>
          <p className='LinkBlanco'>Ya tienes una cuenta ? <a href='/logIn'>  <b>LogIn</b></a></p>
        </div>
      ) : verificationCodeSent ? (
        <div className="form-container"> 
        <Link to={"/"} className='backtohome'>
      <IoArrowUndo className='backtohome' />
      </Link>
           <img className="logo" src="https://nilius.s3.us-east-2.amazonaws.com/fotos/Iconos/Logo.png" alt="" />
          <input className="LogInput"
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Ingresa el codigo"
            required
          />
          {verificationError && <p>{verificationError}</p>}
          <button className="logVerification" onClick={handleVerifyCode}>Verificar Código</button>
          <p className='LinkBlanco'>Ya tienes una cuenta ? <a href='/logIn'>  <b>LogIn</b></a></p>
        </div>
      ) : (
        <div className="form-container">
          <Link to={"/"} className='backtohome'>
      <IoArrowUndo className='backtohome' />
      </Link>
           <img className="logo" src="https://nilius.s3.us-east-2.amazonaws.com/fotos/Iconos/Logo.png" alt="" />
          <input className="LogInput"
            type="email"
            placeholder="Ingrese Gmail"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {verification && <p className="error-message">Gmail incorrecto</p>}

          <button className="logVerification" onClick={handleSendVerificationCode}>Enviar Código de Verificación</button>
          <p className='LinkBlanco'>Ya tienes una cuenta ? <Link to={"/logIn"}>  <b>LogIn</b></Link></p>
          
        </div>
      )}
    </div>
  );
};

export default SignUp;