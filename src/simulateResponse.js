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
  let routeKey = method + " " + aiInputRoute;

  routeKey = resolveRoute(routeKey, localDataStoreObject.getPathsMap);

  const responseIdentifier = "default";
  console.log("Route key:", routeKey);

  if (specificResponseMap) {
    // TODO: Build response identifier accordingly.
  }

  let dynamicResponse;

  // Check response for given route in the in-memory cache, if exists return it, else continue
  // if (
  //   localDataStoreObject.getCachedResponse[routeKey] &&
  //   localDataStoreObject.getCachedResponse[routeKey][responseIdentifier]
  // ) {
  //   return localDataStoreObject.getCachedResponse[routeKey][responseIdentifier];
  // }

  // prepare prompt for GPT-3.5
  let fileContent;

  // if aiInputRoute containts
  fileContent = localDataStoreObject.getFileContentByFileNameMap[
    localDataStoreObject.pathsMap[routeKey]
  ];

  let prompt =
    fileContent +
    "\n" +
    promptStrings.askApiResponsePrompt(routeKey);

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

// Input route: GET /api/v1/users/{userId}/profile
function resolveRoute(inputRequestRoute, pathsMap) {
  const inputRouteMethod = inputRequestRoute.split(" ")[0];
  const inputRoute = inputRequestRoute.split(" ")[1].split("/");

  // Iterate through each route template in the paths map and check if it matches the input route
  for (const path in pathsMap) {
    const templateRouteMethod = path.split(" ")[0];
    const templateRoute = path.split(" ")[1].split("/");

    if (inputRoute.length === templateRoute.length) {
      let isMatch = true;
      const resolvedRouteParts = [];

      // Iterate through each part of the route and check if it matches the corresponding part of the template route
      for (let i = 0; i < templateRoute.length; i++) {
        if (
          templateRoute[i].startsWith("{") &&
          templateRoute[i].endsWith("}")
        ) {
          // This part of the route is a parameter, so keep it as is
          resolvedRouteParts.push(templateRoute[i]);
        } else if (templateRoute[i] !== inputRoute[i]) {
          // This part of the route doesn't match, break out of the loop
          isMatch = false;
          break;
        } else if (templateRoute[i] === inputRoute[i]) {
          // This part of the route matches, so keep it as is
          resolvedRouteParts.push(templateRoute[i]);
        }
      }

      if (isMatch) {
        // If it's a match, construct and return the resolved route
        console.log(templateRouteMethod + " " + resolvedRouteParts.join("/"));
        return inputRouteMethod + " " + resolvedRouteParts.join("/");
      }
    }
  }

  // If no match is found, return the input route as is
  console.log("No match found for route:", inputRoute);
  return inputRoute;
}

module.exports = { simulateResponse, setPathsFromOpenApiSpec };
