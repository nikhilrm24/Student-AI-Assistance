const { getStudent } = require("./db");
const { z } = require("zod");

const tools = {
  getStudent
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

async function main() {
 
  const functionCall = {
    name: "getStudent",
    args: {
      id: 2
    }
  };

  const result = await executeTool(functionCall);

  console.log("Tool:", functionCall.name);
  console.log("Result:", result);
}

main();