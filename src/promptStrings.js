const askApiResponsePrompt = (route) =>
  'Using the above OpenAPI spec, please create a sample response for the "' +
  route +
  '" endpoint.' +
  'If the type of any attribute is array, please keep 1 to 3 elements in it, no matter the position of it.' +
  'Please do not neglect any attribute.' +
  'Please create random "id". Please neglect any past information and information from previous prompt. Do not assume cases and scenarios on your own' +
  'Provide Valid Json response only. Also, provide response only if input route Exactly matches any of the route mentioned in OpenAPI specifications.' +
  'like if input is /v1/accounts/fee and route method in the spec is /v1/accounts/feed then return json response as {message: "Path not found: '+ route + '"}' +
  'You have to check if all the necessary params are sent with the api call.' +
  'Return mock 400 error response using above specifications provided if "' +
  route +
  '" is not satisfying all criteria mentioned in the parameters section of the "' +
  route +
  '" api specification';

const askAllRoutesListPrompt =
  'Please give me a list of available APIs. and wrap them in an array and make sure you return only an array Do not include any' +
  'informative text or suggestions, like "Understood, "," Certainly, here is the list of available APIs in an array format:" etc.' +
  'such that I can use "available APIs in an array format" directly into the code. Please neglect any past information.';

module.exports = { askApiResponsePrompt, askAllRoutesListPrompt };
