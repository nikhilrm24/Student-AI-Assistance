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
async function getAttendance(studentId) {
  const result = await pool.query(
    "SELECT subject, percentage FROM attendence WHERE student_id = $1",
    [studentId]
  );

  return result.rows;
}

async function findStudentByName(name){
  const result=await pool.query(
    "select * from students where lower(name)=lower($1)",[name]
  );
  return result.rows[0];
}

module.exports = {pool,getStudent,getAttendance,findStudentByName};