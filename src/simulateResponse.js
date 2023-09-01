const cachedResponses = require("./cachedResponse");
const sampleOpenAPI = require("./sampleOpenApiSpec.json");
const promptStrings = require("./promptStrings");
const { callCompletionAPI } = require("./aiService");

async function simulateResponse(originalUrl, method, specificResponseMap = {}) {
  const routeKey = method + " " + originalUrl;
  const responseIdentifier = "default";

  if (specificResponseMap) {
    // TODO: Build response identifier accordingly.
  }

  let dynamicResponse;

  // TODO: Check response for given route in the in-memory cache, if exists return it, else continue
  if (!cachedResponses[routeKey]) {
    return cachedResponses[routeKey][responseIdentifier];
  } else {
    // TODO: prepare prompt for GPT-3.5
    const prompt =
      JSON.stringify(sampleOpenAPI) + "\n\n" + promptStrings.apiResponsePrompt;

    await callCompletionAPI(prompt);
    // TODO: Call GPT-3.5 to get the response for given route
    // TODO: Store response from GPT in the in-memory cache
  }

  // return dynamic response to the caller
  if (dynamicResponse) {
    return dynamicResponse;
  } else {
    return { message: "No route found!" }; // Not Found if no sample response is defined
  }
}

module.exports = simulateResponse;
