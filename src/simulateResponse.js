const promptStrings = require("./promptStrings");
const { callCompletionAPI } = require("./aiService");
let localDataStoreObject = require("./localStorage");

async function simulateResponse(
  originalUrl,
  method,
  openApiSpecFolderPath,
  specificResponseMap = {}
) {
  const aiInputRoute = originalUrl.split("?")[0];
  const routeKey = method + " " + aiInputRoute;
  const responseIdentifier = "default";
  console.log("Route key:", routeKey);

  console.log("Open API Spec folder path:", openApiSpecFolderPath);

  console.log("File contents by name Map:", localDataStoreObject.getFileContentByFileNameMap);

  console.log("Paths map:", localDataStoreObject.getPathsMap);

  if (specificResponseMap) {
    // TODO: Build response identifier accordingly.
  }

  let dynamicResponse;

  // Check response for given route in the in-memory cache, if exists return it, else continue
  if (
    localDataStoreObject.getCachedResponse[routeKey] &&
    localDataStoreObject.getCachedResponse[routeKey][responseIdentifier]
  ) {
    return localDataStoreObject.getCachedResponse[routeKey][responseIdentifier];
  }

  // prepare prompt for GPT-3.5
  let fileContent =
    localDataStoreObject.getFileContentByFileNameMap[
      localDataStoreObject.pathsMap[routeKey]
    ];

  let prompt =
    fileContent +
    "\n" +
    localDataStoreObject.mergedOpenAPI.components +
    promptStrings.askApiResponsePrompt(originalUrl);

  console.log("Prompt:=========\n", prompt);

  // Call GPT-3.5 to get the response for given route
  try {
    dynamicResponse = await callCompletionAPI(prompt);
  } catch (error) {
    // Handle case when GPT-3.5 returns error
    return error.toString();
  }

  // Store response from GPT in the in-memory cache
  if (!localDataStoreObject.getCachedResponse[routeKey]) {
    localDataStoreObject.getCachedResponse[routeKey] = {};
    localDataStoreObject.getCachedResponse[routeKey][responseIdentifier] =
      dynamicResponse;
  } else {
    localDataStoreObject.getCachedResponse[routeKey][responseIdentifier] =
      dynamicResponse;
  }
  return dynamicResponse;
}

async function setPathsFromOpenApiSpec(fileContentByFileNameMap) {
  const pathsMap = {};

  for (const [fileName, fileContent] of Object.entries(
    fileContentByFileNameMap
  )) {
    console.log("File name:", fileName);
    const fileContentJson = JSON.parse(fileContent);
    const paths = fileContentJson.paths;

    for (const path in paths) {
      const methods = paths[path];

      for (const method in methods) {
        const key = `${method.toUpperCase()} ${path}`;

        pathsMap[key] = fileName;
      }
    }
  }

  return pathsMap;
}

module.exports = { simulateResponse, setPathsFromOpenApiSpec };
