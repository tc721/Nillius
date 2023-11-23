import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from "./config.js";
import nodemailer from 'nodemailer';



import indexRoutes from './routes/index.routes.js'
import productRoutes from './routes/product.routes.js'
import imgRoutes from './routes/img.routes.js'
import userRoutes from './routes/user.routes.js'
import paymentRoutes from "./routes/payment.routes.js"



const app = express();



app.use(morgan('dev'))




app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'thomas277721@gmail.com',
      pass: 'xygf nlql dafo pqwl',
    },
  });

app.use(indexRoutes)
app.use(productRoutes);
app.use(imgRoutes);
app.use(userRoutes);
app.use(paymentRoutes);

app.listen (PORT)
console.log('runing in port ' + PORT);

export { transporter };