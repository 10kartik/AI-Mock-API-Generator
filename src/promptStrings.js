const apiResponsePrompt =
  'Using the above OpenAPI spec, please create a sample response for the "/v1/accounts?q=jack" endpoint.' +
  'If the type of any attribute is array, please keep 1 to 3 elements in it, no matter the position of it.' +
  'Please do not neglect any attribute.' +
  'Please create random "id".';

module.exports = { apiResponsePrompt };
