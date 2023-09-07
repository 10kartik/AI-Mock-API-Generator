const express = require("express");
const port = 3000;
const {
  simulateResponse,
  setPathsFromOpenApiSpec,
} = require("./simulateResponse");
const commander = require("commander");
const OpenApiValidator = require("express-openapi-validator");
const { mergeOpenAPIFiles } = require("./mergeOpenApi");
const { readJSONFilesInFolder } = require("./readJSONFiles");
let localDataStoreObject = require("./localStorage");
require("./aiService");

const program = new commander.Command();

program
  .usage("[options]")
  .option(
    "--open-api-specification-folder-path <required>",
    "Open API file absolute path"
  )
  .option("--openAI-Key", "OpenAI Key")
  .parse(process.argv);

// Access the options
const options = program.opts();

if (!options.openApiSpecificationFolderPath) {
  console.error("--open-api-specification-folder-path options is required.");
  program.help(); // Show help message and exit
}

async function performInitializationTasks() {
  await mergeOpenAPIFiles(options.openApiSpecificationFolderPath);

  localDataStoreObject.setFileContentByFileNameMap =
    await readJSONFilesInFolder(options.openApiSpecificationFolderPath);

  // console.log(
  //   "File content map:",
  //   localDataStoreObject.getFileContentByFileNameMap
  // );

  // Set paths from Open API Spec to pathsMap
  localDataStoreObject.setPathsMap = await setPathsFromOpenApiSpec(
    localDataStoreObject.getFileContentByFileNameMap
  );

  // console.log("Paths map:", localDataStoreObject.getPathsMap);
}

async function startServer() {
  await performInitializationTasks();

  const app = express();

  // Middleware to log request body
  app.use(express.json()); // Parse JSON requests

  app.use((req, res, next) => {
    req.extractedParams = Object.assign({}, req.params, req.query, req.body); // Extract all parameters
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log("Full URL:", fullUrl);
    console.log("Request route:", req.originalUrl);

    next();
  });

  app.use(
    OpenApiValidator.middleware({
      apiSpec: "./merged_openapi.json",
      validateRequests: true, // (default)
      validateResponses: false, // false by default
    })
  );

  app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
      message:
        "Request route mismatch or One or more parameters are missing or invalid." +
        " List of Valid Routes:[" +
        Object.keys(localDataStoreObject.getPathsMap).join(", ") +
        "]",
      errors: err.errors,
    });
  });

  app.get("/*", async function (req, res) {
    const resp = await simulateResponse(
      req.originalUrl,
      "GET",
      options.openApiSpecificationFolderPath
    );
    res.status(200).send(resp);
  });

  app.post("/*", async function (req, res) {
    const resp = await simulateResponse(
      req.originalUrl,
      "POST",
      options.openApiSpecificationFolderPath
    );
    res.status(200).send(resp);
  });

  app.delete("/*", async function (req, res) {
    const resp = await simulateResponse(
      req.originalUrl,
      "DELETE",
      options.openApiSpecificationFolderPath
    );
    res.status(200).send(resp);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
