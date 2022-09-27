"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JsonDataUploadService = _interopRequireDefault(require("./JsonDataUploadService.js"));

var _JsonDataImportService = _interopRequireDefault(require("./JsonDataImportService.js"));

var _S3Configuration = _interopRequireDefault(require("./S3Configuration.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JsonService {
  constructor(s3Obj, bucketName, folderPath, orgId) {
    const configurationObj = new _S3Configuration.default(s3Obj, bucketName, folderPath, orgId);
    this.uploadService = new _JsonDataUploadService.default(configurationObj);
    this.importService = new _JsonDataImportService.default(configurationObj);
  }

}

exports.default = JsonService;