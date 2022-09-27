"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class S3Configuration {
  constructor(s3Obj, bucketName, folderPath, orgId) {
    _defineProperty(this, "s3Obj", void 0);

    _defineProperty(this, "folderPath", void 0);

    _defineProperty(this, "orgId", void 0);

    _defineProperty(this, "bucketName", void 0);

    this.s3Obj = s3Obj;
    this.bucketName = bucketName;
    this.folderPath = folderPath;
    this.orgId = orgId;
  }

}

exports.default = S3Configuration;