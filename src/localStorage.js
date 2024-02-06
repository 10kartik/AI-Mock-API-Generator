class LocalDataStore {
  constructor() {
    this.cachedResponse = {};
    this.mergedOpenAPI = {
      openapi: "3.0.3",
      info: {},
      servers: [],
      tags: [],
      paths: {},
      components: {},
    };
    this.fileContentByFileNameMap = {};
    this.pathsMap = {};
  }

  // Getter and Setter for cachedResponse
  get getCachedResponse() {
    return this.cachedResponse;
  }

  set setCachedResponse(data) {
    this.cachedResponse = data;
  }

  // Getter and Setter for mergedOpenAPI
  get getMergedOpenAPI() {
    return this.mergedOpenAPI;
  }

  set setMergedOpenAPI(data) {
    this.mergedOpenAPI = data;
  }

  // Getter and Setter for fileContentByFileNameMap
  get getFileContentByFileNameMap() {
    return this.fileContentByFileNameMap;
  }

  set setFileContentByFileNameMap(data) {
    this.fileContentByFileNameMap = data;
  }

  // Getter and Setter for pathsMap
  get getPathsMap() {
    return this.pathsMap;
  }

  set setPathsMap(data) {
    this.pathsMap = data;
  }
}

module.exports = new LocalDataStore();
