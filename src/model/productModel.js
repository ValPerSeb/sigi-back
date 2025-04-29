import { getConnection } from "../config/db.js";

const getAllProductos = async ()=>{
    const pool = await getConnection;
    const result = await pool.request().query('SELECT * FROM Product');
    return result.recordset;
}

export{getAllProductos}