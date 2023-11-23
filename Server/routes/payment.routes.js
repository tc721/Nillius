import {Router} from 'express'
import {
  createOrder,
  captureOrder,
  cancelPayment,
} from "../controllers/payment.controllers.js";

const router = Router();

router.post("/createorder", createOrder)

router.get("/captureorder", captureOrder)

router.get("/cancelpayment", cancelPayment)

//router.get("/orders", orders)

export default router;



