import {pool} from '../db.js';

export const getProducts = async(req, res) =>{
    try{
        const [result] = await pool.query("SELECT * FROM product ORDER BY  id ASC");
        res.json(result);
      }
      catch (error){
        return res.status(500).json({ message: error.message });
      }
};
export const getProductsId = async(req, res) =>{
    try{
        const [result] = await pool.query("SELECT id FROM product");
        res.json(result);
      }
      catch (error){
        return res.status(500).json({ message: error.message });
      }
};

export const getProduct = async(req, res) =>{
    try{
        const [result] = await pool.query("SELECT * FROM product WHERE id = ?",
    [req.params.id,]);
    if(result.length === 0){
        return res.status(404).json({ message: "Product not found"});
    }
    res.json(result[0])
    }

    catch (error){
        return res.status(500).json({ message: error.message });
      }
};

//pureba
export const getProductCategory = async(req, res) =>{
    try{
        const [result] = await pool.query("SELECT id FROM product WHERE category = ?",
    [req.params.category,]);
    if(result.length === 0){
        return res.status(404).json({ message: "Category not found"});
    }
    res.json(result)
    }

    catch (error){
        return res.status(500).json({ message: error.message });
      }
};//prueba



export const setProduct = async (req, res) => {
    try{        
        const { title, description, price, category } = req.body;
        
        const [result] = await pool.query(
            "INSERT INTO product(title, description, price, category) VALUES (?, ?, ?, ?)",
            [title, description, price, category] // Pasar los valores en un arreglo
            );
            res.json({
                id: result.insertId,
                title,
                description,
                price,
                category,
            });
        }
    catch (error){
        return res.status(500).json({ message: error.message });
    }

};


export const updateProduct = async(req, res) =>{
    try{
        const result = await pool.query("UPDATE product SET ? WHERE id = ?",[
        req.body,
        req.params.id
    ]);
    res.json(result);
}

    catch (error){
        return res.status(500).json({ message: error.message });
      }
};

export const deleteProduct = async(req, res) =>{
    try{
        const [result] = await pool.query("DELETE FROM product WHERE id = ?",[
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