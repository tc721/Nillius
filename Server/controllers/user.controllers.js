import { pool } from '../db.js';
import bcrypt from 'bcryptjs'; // Importa la biblioteca 'bcryptjs'
import nodemailer from 'nodemailer';
import { transporter } from '../index.js';

export const signUpCtrl = async (req, res) => {
  try {
    const { name, mail, password, cel } = req.body;

    // Hashea la contraseña antes de almacenarla en la base de datos
    const hashedPassword = bcrypt.hashSync(password, 10); // El segundo argumento es el número de rondas de hashing

    const [result] = await pool.query(
      "INSERT INTO user(name, mail, password, cel) VALUES (?, ?, ?, ?)",
      [name, mail, hashedPassword, cel] // Almacena la contraseña hasheada
    );

    res.json({
      id: result.insertId,
      name,
      mail,
      cel,
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const logInCtrl = async (req, res) => {
    try {
      const { mail, password } = req.body;
  
      // Busca el usuario en la base de datos por su correo electrónico
      const [rows] = await pool.query('SELECT * FROM user WHERE mail = ?', [mail]);
  
      if (rows.length === 0) {
        // El usuario no existe
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
  
      const user = rows[0];
  
      // Compara la contraseña ingresada con el hash almacenado en la base de datos
      const passwordMatch = bcrypt.compareSync(password, user.password);
  
      if (passwordMatch) {
        // Las contraseñas coinciden, lo que significa que el inicio de sesión es exitoso
        res.json({
          id: user.id,
          name: user.name,
          mail: user.mail,
          cel: user.cel,
        });
      } else {
        // Las contraseñas no coinciden
        res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return res.status(500).json({ message: error.message });
    }
  };




  export const sendVerificationCode = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Genera el código de verificación
      const verificationCode = generateVerificationCode(4);
  
      const htmlContent = `
        <html>
          <head>
            <style>
              .verification-code {
                font-size: 20px;
                color: #007BFF;
              }
            </style>
          </head>
          <body>
            <p><b>Tu código de verificación es: <span class="verification-code">${verificationCode}</span></b></p>
          </body>
        </html>
      `;
  
      // Configura el correo electrónico
      const mailOptions = {
        from: 'cano277721@gmail.com',
        to: email,
        subject: 'Código de Verificación',
        html: htmlContent,
      };
  
      // Envía el correo electrónico utilizando el objeto transporter
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.log('Error al enviar el correo: ' + error);
          res.status(500).json({ message: 'Error al enviar el correo' });
        } else {
          console.log('Correo enviado: ' + info.response);
  
          // Después de enviar el correo exitosamente, inserta el código en la tabla "code"
          const insertCodeQuery = 'INSERT INTO code (code) VALUES (?)';
          try {
            const [insertResult] = await pool.query(insertCodeQuery, [verificationCode]);
            console.log('Código de verificación insertado en la base de datos.');
          } catch (insertError) {
            console.error('Error al insertar el código de verificación en la base de datos:', insertError);
            res.status(500).json({ message: 'Error al insertar el código de verificación en la base de datos' });
          }
  
          res.json({ message: 'Correo enviado exitosamente' });
        }
      });
    } catch (error) {
      console.error('Error al enviar el correo de verificación:', error);
      res.status(500).json({ message: 'Error al enviar el correo de verificación' });
    }
  };

  


  export const getCode = async (req, res) => {
    try {
      const { code } = req.query; // Suponiendo que el código se pasa como un parámetro de consulta
  
      // Realiza una consulta a la base de datos para verificar si el código existe
      const [rows] = await pool.query('SELECT * FROM code WHERE code = ?', [code]);
  
      if (rows.length > 0) {
        // El código existe en la base de datos
        res.json({ exists: true });
      } else {
        // El código no existe en la base de datos
        res.json({ exists: false });
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
      res.status(500).json({ message: 'Error al verificar el código' });
    }
  };





  function generateVerificationCode(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Caracteres permitidos para el código de verificación
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      code += charset.charAt(randomIndex);
    }
  
    return code;
  }