const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "student_ai",
  password: "nikhilrm",
  port: 5433,
});

module.exports = pool;