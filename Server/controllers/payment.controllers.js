import axios from "axios";
import {pool} from '../db.js';

import {
  PAYPAL_API,
  HOST,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} from "../config.js";


export const createOrder = async (req, res) => {

  const { value, products, user_id } = req.body;

  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: value,
          },
        },
      ],
      application_context: {
        brand_name: "mycompany.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${HOST}/captureorder?param1=${products}&param2=${user_id}`,
        cancel_url: `${HOST}/cancelpayment`,
      },
    };

    // format the body
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // Generate an access token
    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    console.log(access_token);

    // make a request
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    //console.log(response.data);
    //const insert = {products, user_id}
    //insertBuys({products, user_id});

    return res.json(response.data);


  } catch (error) {
    console.log(error);
    return res.status(500).json("Something goes wrong");
  }
};



const insertBuys = async ({ products, user_id, code}) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO buys(products, user_id, code) VALUES (?, ?, ?)",
      [products, user_id, code]
    );
    console.log("Compra insertada en la base de datos:", result);

    // Utiliza res.send si no necesitas enviar datos específicos al cliente
  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    // Puedes lanzar el error o enviar un mensaje de error al cliente según tus necesidades
  }
};





export const captureOrder = async (req, res) => {
  const { param1, param2, token } = req.query;

 const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
 {}, {
    auth: {
      username: PAYPAL_API_CLIENT,
      password: PAYPAL_API_SECRET
    }
 })

 console.log(response.data)
 const success = true;
 
    insertBuys({ products: param1, user_id: param2, code: token });

 return res.redirect(`http://localhost:5173/Payed?token=${token}&success=${success}`);
};




export const cancelPayment = (req, res) =>{

  const success = false;
  return res.redirect(`http://localhost:5173/Payed?success=${success}`);
} 




/*export const orders = async(req, res) => {

  const response = await axios.get(`${PAYPAL_API}/v2/checkout/orders/14004698CC8052819`, {
    auth: {
      username: PAYPAL_API_CLIENT,
      password: PAYPAL_API_SECRET,
    }
  });
  
  // Acceder a los detalles de la orden
  const orderDetails = response.data.purchase_units;

  return res.send(orderDetails[0].payments.captures[0].id response.da)
};*/