 const express=require("express")
const pool=require("./db")

const app=express();

app.get("/test-db",async (req,res)=>{
    try{
        const response=await pool.query("select * from students")
        res.json(response.rows)
    }catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database connection failed",
    });
  }
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});