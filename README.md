# AI-Mock-API-Generator

TrueSparrow Hackathon September 2023

### AI Mock API Generator

This is an NPM package that utilizes OpenAI's GPT 3.5Turbo to generate mock responses for APIs specified in OpenAPI specs. The package accepts OpenAI key and multiple OpenAPI specs in YAML or JSON format as input, and generates mock responses in JSON for the provided APIs.

### Installation

To install the package globally, run the following command:
```
npm install -g ai-mock-api-generator
```

```

### Usage

To use the package, run the following command:

Replace <OPENAI_KEY> with your OpenAI key, and <OPENAPI_SPECS_FOLDER_PATH> with the path to the folder containing your OpenAPI specs.

The package will read these input values and use the OpenAI key to interact with GPT 3.5Turbo and provide OpenAPI spec to the AI. The AI will then generate mock responses in JSON format for the provided APIs.


#### Validation
The AI/GPT is prompt engineered to provide mock response in JSON only and validate it that it is JSON only before actually providing the response. The mock response is specific to the provided endpoint only.

### Contributing

Contributions are welcome! Please see our contributing guidelines for more information.

### License

This project is licensed under the MIT License(./LICENSE).
