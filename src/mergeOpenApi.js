const fs = require("fs");
const path = require("path");
const { mergedOpenAPI } = require("./localStorage");

// Function to merge multiple OpenAPI objects into one
async function mergeOpenAPIFiles(folderPath) {
  // Initialize an empty object for the merged OpenAPI spec

  // Get a list of file names in the folder
  const fileNames = fs.readdirSync(folderPath);

  // Iterate through each file in the folder
  for (const fileName of fileNames) {
    const fileExt = path.extname(fileName);    
    if(fileExt !== '.json') {
      continue
    }
    // Construct the full file path
    const filePath = path.join(folderPath, fileName);
    
    // Read the JSON file and parse it into an object
    const fileData = fs.readFileSync(filePath, "utf8");
    const openAPIObject = JSON.parse(fileData);

    // Merge the paths and components from the current file into the mergedOpenAPI object
    Object.assign(mergedOpenAPI.info, openAPIObject.info);
    Object.assign(mergedOpenAPI.servers, openAPIObject.servers);
    Object.assign(mergedOpenAPI.paths, openAPIObject.paths);
    Object.assign(mergedOpenAPI.components, openAPIObject.components);
  }

  if(Object.keys(mergedOpenAPI.paths).length == 0) {
    throw Error ("Please make sure you have atleast one valid openAPI specification file in json format under iven folder location.");
  }
  
  // // Write the merged OpenAPI spec to a JSON file in the current directory
  const outputFilePath = "merged_openapi.json";
  fs.writeFileSync(outputFilePath, JSON.stringify(mergedOpenAPI, null, 2));

  console.log("Merged OpenAPI spec written to", outputFilePath);
  return mergedOpenAPI;
}

module.exports = { mergeOpenAPIFiles };
