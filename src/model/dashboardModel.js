import { getConnection, sql } from "../config/db.js";
import { COMPANY_ID } from "../index.js";

export const getDashboardData = async () => {
    const pool = await getConnection;

    // Total de productos
    const totalProducts = await pool.request()
        .input('companyId', COMPANY_ID)
        .query("SELECT COUNT(*) AS total FROM Product WHERE CompanyId = @companyId");

    // Totales por categoría
    const totalsByCategory = await pool.request()
        .input('companyId', COMPANY_ID)
        .query(`
            SELECT c.Id, c.CategoryName, c.CategoryColor, COUNT(p.Id) AS total
            FROM Category c
            LEFT JOIN Product p ON p.CategoryId = c.Id AND p.CompanyId = @companyId
            WHERE c.CompanyId = @companyId
            GROUP BY c.Id, c.CategoryName, c.CategoryColor
        `);

    // Totales por ubicación de inventario
    const totalsByInventoryLocation = await pool.request()
        .input('companyId', COMPANY_ID)
        .query(`
            SELECT il.Id, il.LocationName, COUNT(p.Id) AS total
            FROM InventoryLocation il
            LEFT JOIN Product p ON p.InventoryLocationId = il.Id AND p.CompanyId = @companyId
            WHERE il.CompanyId = @companyId
            GROUP BY il.Id, il.LocationName
        `);

    // 3 productos con mayor stock
    const topProducts = await pool.request()
        .input('companyId', COMPANY_ID)
        .query(`
            SELECT TOP 3 Id, ProductName, Stock
            FROM Product
            WHERE CompanyId = @companyId
            ORDER BY Stock DESC
        `);

    return {
        totalProducts: totalProducts.recordset[0].total,
        totalsByCategory: totalsByCategory.recordset,
        totalsByInventoryLocation: totalsByInventoryLocation.recordset,
        topProducts: topProducts.recordset
    };
};