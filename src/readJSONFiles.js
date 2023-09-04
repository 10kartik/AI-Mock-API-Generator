const fs = require("fs").promises;
const path = require("path");

// Function to read and print JSON files in a folder
async function readJSONFilesInFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    const fileContents = {};

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const data = await fs.readFile(filePath, "utf8");
      fileContents[file] = data;
    }

    return fileContents;
  } catch (error) {
    console.error("Error reading folder:", error);
    throw error; // You may want to handle this error at a higher level
  }
}

module.exports = { readJSONFilesInFolder };
