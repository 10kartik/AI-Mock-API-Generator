const cachedResponses = require("./cachedResponse");
// const sampleOpenAPI = require("./sampleOpenApiSpec.json");
const promptStrings = require("./promptStrings");
const { callCompletionAPI, askAllRoutesListAPI } = require("./aiService");
const { readJSONFilesInFolder } = require("./readJSONFiles");

async function simulateResponse(
  originalUrl,
  method,
  openApiSpecFolderPath,
  specificResponseMap = {}
) {

  const routeKey = method + " " + originalUrl;
  const responseIdentifier = "default";
  console.log("Route key:", routeKey);

  console.log("Open API Spec folder path:", openApiSpecFolderPath);
  let fileContentMap = await readJSONFilesInFolder(openApiSpecFolderPath);
  // Set paths from Open API Spec to pathsMap

  console.log("File content:", fileContentMap);

  if (specificResponseMap) {
    // TODO: Build response identifier accordingly.
  }

  let dynamicResponse;

  // Check response for given route in the in-memory cache, if exists return it, else continue
  if (cachedResponses[routeKey]) {
    // TODO: Remove ! after implementing the cache
    // return cachedResponses[routeKey][responseIdentifier];
  } else {
    // TODO: prepare prompt for GPT-3.5
    let totalFileContent = "";

    for (const [fileName, fileContent] of Object.entries(fileContentMap)) {
      totalFileContent += `${fileName}\n${fileContent}\n\n`;
    }

    let prompt = promptStrings.askApiResponsePrompt(originalUrl) + "\n\n" + totalFileContent;

    console.log("Prompt:===", prompt);

    // Call GPT-3.5 to get the response for given route
    dynamicResponse = await callCompletionAPI(prompt);
    // TODO: Handle case when GPT-3.5 returns error

    // TODO: Store response from GPT in the in-memory cache
  }

  // return dynamic response to the caller
  if (dynamicResponse) {
    return dynamicResponse;
  } else {
    // TODO: Ask GPT to ask info for all given routes and cache the response.
    const prompt =
      JSON.stringify("Hey?") +
      "\n\n" +
      promptStrings.askAllRoutesListPrompt;

    return {
      message: `Path not found: ${originalUrl}`,
      "available routes": dynamicResponse,
    };
    // Not Found if no sample response is defined
  }
}

function setPathsFromOpenApiSpec(fileContentMap) {
  const pathsMap = {};

  for (const [fileName, fileContent] of Object.entries(fileContentMap)) {
    const fileContentJson = JSON.parse(fileContent);
    const paths = fileContentJson.paths;

    for (const [path, pathContent] of Object.entries(paths)) {
      pathsMap[path] = pathContent;
    }
  }

  return pathsMap;
}

module.exports = simulateResponse;
