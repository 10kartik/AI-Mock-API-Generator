const fs = require("fs").promises;
const path = require("path");

// Function to read and print JSON files in a folder
async function readJSONFilesInFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    const fileContentsByFileNameMap = {};

    for (const file of files) {
      const fileExt = path.extname(file);    
      if(fileExt !== '.json') {
        continue
      }
      const filePath = path.join(folderPath, file);
      const data = await fs.readFile(filePath, "utf8");
      fileContentsByFileNameMap[file] = data;
    }

    return fileContentsByFileNameMap;
  } catch (error) {
    console.error("Error reading folder:", error);
    throw error; // You may want to handle this error at a higher level
  }
}

module.exports = { readJSONFilesInFolder };
