const promptStrings = require("./promptStrings");
const { callCompletionAPI } = require("./aiService");
const { readJSONFilesInFolder } = require("./readJSONFiles");
let { fileContentMap, cachedResponse, pathsMap } = require("./localStorage");

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
  fileContentMap = await readJSONFilesInFolder(openApiSpecFolderPath);

  console.log("File content:", fileContentMap);

  // Set paths from Open API Spec to pathsMap
  pathsMap = setPathsFromOpenApiSpec(fileContentMap);

  console.log("Paths map:", pathsMap);

  if (specificResponseMap) {
    // TODO: Build response identifier accordingly.
  }

  let dynamicResponse;

  // Check response for given route in the in-memory cache, if exists return it, else continue
  if (cachedResponse[routeKey]) {
    return cachedResponse[routeKey][responseIdentifier];
  } else {
    // prepare prompt for GPT-3.5
    let fileContent = fileContentMap[pathsMap[routeKey]];

    let prompt =
      fileContent + "\n" + promptStrings.askApiResponsePrompt(originalUrl);

    console.log("Prompt:=========\n", prompt);

    // Call GPT-3.5 to get the response for given route
    try {
      dynamicResponse = await callCompletionAPI(prompt);
    } catch (error) {
      // Handle case when GPT-3.5 returns error
      return error.toString();
    }

    // Store response from GPT in the in-memory cache
    if (!cachedResponse[routeKey]) {
      cachedResponse[routeKey] = {};
      cachedResponse[routeKey][responseIdentifier] = dynamicResponse;
    }
  }

  return dynamicResponse;
}

function setPathsFromOpenApiSpec(fileContentMap) {
  const pathsMap = {};

  for (const [fileName, fileContent] of Object.entries(fileContentMap)) {
    console.log("File name:", fileName);
    const fileContentJson = JSON.parse(fileContent);
    const paths = fileContentJson.paths;

    for (const path in paths) {
      const methods = paths[path];

      for (method in methods) {
        route = path.split("?");
        const key = `${method.toUpperCase()} ${route}`;

        pathsMap[key] = fileName;
      }
    }
  }

  return pathsMap;
}

module.exports = simulateResponse;
