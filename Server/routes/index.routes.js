import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/ping", async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 as result');
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

 /* const result = await pool.query('SELECT NOW()')
  console.log(result)*/
});

export default router;