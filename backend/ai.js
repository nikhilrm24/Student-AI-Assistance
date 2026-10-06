const { getStudent,getAttendance} = require("./db");
const { z } = require("zod");

const tools = {
  getStudent,getAttendance
};
const getStudentSchema = z.object({
  id: z.number().int().positive()
});

async function executeTool(functionCall) {
  const toolName = functionCall.name;
  const args = functionCall.args;

  const selectedTool = tools[toolName];

  if (!selectedTool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  const validation = getStudentSchema.safeParse(args);

  if (!validation.success) {
    throw new Error("Invalid tool arguments");
  }

  const result = await selectedTool(validation.data.id);

  return result;
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


