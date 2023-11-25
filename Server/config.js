import { config } from "dotenv"
config();

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173/";

export const PORT = process.env.PORT || 4000;
export const HOST = process.env.HOST || 'localhost';


export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_DATABASE = process.env.DB_DATABASE || "eccomerce";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PORT || "thomas";




export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = 'https://api-m.sandbox.paypal.com'

/*console.log(PAYPAL_API_CLIENT);
console.log(PAYPAL_API_SECRET);
console.log(PAYPAL_API);*/
