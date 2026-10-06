const getStudentTool = {
  name: "getStudent",

  description: "Get a student's basic information from the database using their student ID.",

  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "The ID of the student"
      }
    },
    required: ["id"]
  }
};


const getAttendanceTool = {
  name: "getAttendance",

  description: "Get a student's attendance for all subjects using their student ID.",

  parameters: {
    type: "object",
    properties: {
      studentId: {
        type: "number",
        description: "The ID of the student"
      }
    },
    required: ["studentId"]
  }
};


module.exports = {
  getStudentTool,
  getAttendanceTool
};