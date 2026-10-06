const { getStudent,getAttendance} = require("./db");
const { z } = require("zod");

const tools = {
  getStudent,getAttendance
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
async function handleToolCall(functionCall) {
  console.log("AI requested tool:", functionCall.name);
  console.log("Arguments:", functionCall.args);

  const result = await executeTool(functionCall);

  console.log("Database result:", result);

  return {
    tool: functionCall.name,
    result
  };
}

async function main() {
  const functionCall = {
    name: "getStudent",
    args: {
      id: 1
    }
  };

  const toolResponse = await handleToolCall(functionCall);

  console.log("Tool response:");
  console.log(toolResponse);
}



main();
async function main() {
  const functionCall = {
    name: "getAttendance",
    args: {
      studentId: 1
    }
  };

  const result = await executeTool(functionCall);

  console.log("Tool:", functionCall.name);
  console.log("Result:", result);
}

main();

