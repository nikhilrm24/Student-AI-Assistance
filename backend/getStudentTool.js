const { properties } = require("zod");

const getStudentTool={
    name:"getStudent",
    description: "Get a student's information from the database using their student ID.",
    parameters:{
        type:"object",
        properties:{
            id:{
                type:"number",
                description:"the ID of the student"
            }
        },
        required:["id"]
    }
}
module.exports=getStudentTool;