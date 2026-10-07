require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const {
  getStudent,
  getAttendance
} = require("./db");

const {
  getStudentTool,
  getAttendanceTool
} = require("./getAttendanceTool");




const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const chat = ai.chats.create({
  model: "gemini-3.6-flash",

  config: {
    tools: [
      {
        functionDeclarations: [
          getStudentTool,
          getAttendanceTool
        ]
      }
    ]
  }
});




const tools = {
  getStudent,
  getAttendance
};



const schemas = {
  getStudent: z.object({
    id: z.number().int().positive()
  }),

  getAttendance: z.object({
    studentId: z.number().int().positive()
  })
};



async function executeTool(functionCall) {

  const toolName = functionCall.name;
  const args = functionCall.args;

  const selectedTool = tools[toolName];

  if (!selectedTool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  const schema = schemas[toolName];

  const validation = schema.safeParse(args);

  if (!validation.success) {
    throw new Error("Invalid tool arguments");
  }

  if (toolName === "getStudent") {
    return await selectedTool(validation.data.id);
  }

  if (toolName === "getAttendance") {
    return await selectedTool(validation.data.studentId);
  }
}



async function processToolCall(functionCall) {

  console.log("AI requested:", functionCall.name);

  console.log("Arguments:", functionCall.args);

  const result = await executeTool(functionCall);

  console.log("Database result:", result);

  return {
    name: functionCall.name,
    result
  };
}

async function main() {

  const response = await chat.sendMessage({
    message: "Give me the details of student with ID 1."
  });

  const functionCall = response.functionCalls?.[0];

  if (!functionCall) {
    console.log("AI:", response.text);
    return;
  }


  const toolResponse = await processToolCall(functionCall);

  console.log("\nTool response:");
  console.log(toolResponse);


  const finalResponse = await chat.sendMessage({
    message: {
      functionResponse: {
        name: toolResponse.name,
        response: toolResponse.result
      }
    }
  });

  console.log("\nFinal AI response:");
  console.log(finalResponse.text);
}

main();