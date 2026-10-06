const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "student_ai",
  password: "nikhilrm",
  port: 5433,
});

async function getStudent(id) {
    const result=await pool.query(`select * from students where id=$1`,[id])
     return result.rows[0];
}


module.exports = {pool,getStudent};