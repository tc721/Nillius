import {pool} from '../db.js';

export const getImg = async(req, res) =>{
    try{
        const [result] = await pool.query("SELECT * FROM img WHERE product_id = ?", [req.params.product_id]);
        res.json(result);
      }
      catch (error){
        return res.status(500).json({ message: error.message });
      }
};

export const getImgs = async(req, res) =>{
    try{
        const [result] = await pool.query("SELECT * FROM img ORDER BY id ASC");
        res.json(result);
      }
      catch (error){
        return res.status(500).json({ message: error.message });
      }
};


export const setImg = async (req, res) => {
    try {
        const { url } = req.body;
        const { product_id } = req.params; // Captura el product_id de la URL
        
        // Realiza la inserción en la tabla img utilizando product_id en la consulta
        const [result] = await pool.query(
            "INSERT INTO img (product_id, url) VALUES (?, ?)",
            [product_id, url]
        );

        res.json({
            id: result.insertId,
            url,
            product_id,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


};

export const deleteImg = async(req, res) =>{
    try{
        const [result] = await pool.query("DELETE FROM img WHERE id = ?",[
            req.params.id,
        ]);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Task not found"});
    
        return res.sendStatus(204);
    }

    catch (error){
        return res.status(500).json({ message: error.message });
      }
};