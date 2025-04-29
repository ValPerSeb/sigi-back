import sql from 'mssql'
import dotenv from 'dotenv'

dotenv.config();

const stringConnection = {
    user : process.env.USER,
    password : process.env.PASSWORD,
    server : process.env.SERVER,
    database : process.env.DATABASE,
    options : {
        trustServerCertificate : true,
    }
}

const getConnection = new sql.ConnectionPool(stringConnection)
    .connect()
    .then(pool =>{
        console.log('DB connected');
        return pool;
    })
    .catch(error => console.log('Error: ', error));

export {sql, getConnection};
