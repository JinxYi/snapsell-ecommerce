/*
Name: Tan Jing Yi
*/
  
const pg = require('pg');
require('dotenv').config();

const connectionString = process.env.CONNECTION_URL;
const pool = new pg.Pool({
    connectionString: connectionString,
    max: 5
});
module.exports=pool;