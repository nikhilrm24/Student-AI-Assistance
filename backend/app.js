 const express=require("express")
const {getStudent,pool}=require("./db")

const app=express();

app.get("/student/:id",async (req,res)=>{
    try{
       const student=await getStudent(req.params.id)
        res.json(student)
    }catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});