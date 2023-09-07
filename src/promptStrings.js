const askApiResponsePrompt = (route) =>
  `Generate a mock response for the "${route}" endpoint using the above provided OpenAPI spec.`;

const askApiResponsePromptSystem =
  `You have to act as a backend server that will generate mock data and response in JSON format.` + 
  `Your job is not to validate request route and its parameters. You are not expected to return error.` + 
  `Do not include any informative text or suggestions, statements like "Understood, "," Certainly,","In this mock response" etc, Reply with only JSON response.`+
  `You will be given OpenAPI specification to understand api response format.` + 
  `Do not repeat values in response. Try to generate human readable and random values in mock response.`+
  `If an attribute is an array, include 5 to 10 elements for it.` +
  `If you have difficulty to response, please do not make up response yourself, instead return { http_code: 400, message: "Something Went Wrong", internal_error_identifier: 'a_s_1'} in JSON format `

// const askApiResponsePrompt = (route) =>
//   'Using the above OpenAPI spec, please create a sample response for the "' + route + '" endpoint.' +
//   'If the type of any attribute is array, please keep 1 to 3 elements in it, no matter the position of it.' +
//   'Please do not neglect any attribute.' +
//   'Please create random "id". Please neglect any past information and information from previous prompt. Do not assume cases and scenarios on your own' +
//   'Provide Valid Json response only. Also, provide response only if input route Exactly matches any of the route mentioned in OpenAPI specifications.' +
//   'like if input is /v1/accounts/fee and route method in the spec is /v1/accounts/feed then return json response as {message: "Path not found: '+ route + '"}' +
//   'You have to check if all the necessary params are sent with the api call.' +
//   'Return mock 400 error response using above specifications provided if "' + route + '" is not satisfying all criteria mentioned in the parameters section of the "' +
//   route +
//   '" api specification';

module.exports = { askApiResponsePrompt, askApiResponsePromptSystem };
