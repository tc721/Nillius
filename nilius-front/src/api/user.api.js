import axios from "axios";

export const logInRequest = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:4000/logIn', {
      mail: email,
      password: password,
    });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.log("error desde la api");
    //throw error;
    
  }
}

export const signUpRequest = async (name, email, password, cel) => {
  try {
    const response = await axios.post('http://localhost:4000/signUp', {
      name: name,
      mail: email,
      password: password,
      cel: cel,
    });

    return response.data;
  } catch (error) {
    console.error('Error al enviar la solicitud de registro:', error);
    throw error;
  }
};






export const sendVerificationCode = async (email) => {
  try {
    // Realiza una solicitud al servidor para enviar el código de verificación
    const response = await axios.post('http://localhost:4000/sendVerificationCode', {
      email,
    });

    return response.data;
  } catch (error) {
    console.error('Error al enviar el código de verificación:', error);
    throw error;
  }
}



export const verifyCodeRequest = async (code) => {
  try {
    const response = await axios.get(`http://localhost:4000/code?code=${code}`);

    if (response.data.exists) {
      // El código existe en la base de datos
      return true;
    } else {
      // El código no existe en la base de datos
      return false;
    }
  } catch (error) {
    console.log("Error al verificar el código:", error);
    throw error;
  }
};




