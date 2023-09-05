// Map to store mock responses from AI for each route
let cachedResponse = {}; // Key: routeKey (GET /v1/accounts)["default"], Value: mock response

let mergedOpenAPI = {
  openapi: "3.0.3", // Update this with your desired version
  info: {
    // Add your info here
  },
  servers: [],
  paths: {},
  components: {
    // Add your components here
  },
};

// Map to store file content of each OpenAPI spec file
let fileContentMap = {}; // Key: file name, Value: file content

// Map to store paths from OpenAPI spec
let pathsMap = {}; // Key: routeKey (GET /v1/accounts), Value: file name

module.exports = { cachedResponse, mergedOpenAPI, fileContentMap, pathsMap };
