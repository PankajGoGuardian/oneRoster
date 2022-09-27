"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _config = /*#__PURE__*/new WeakMap();

var _CommonConfig = /*#__PURE__*/new WeakMap();

class JsonDataImportService {
  constructor(configurationObj) {
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _CommonConfig, {
      writable: true,
      value: {
        ExpressionType: "SQL",
        InputSerialization: {
          JSON: {
            Type: "DOCUMENT"
          }
        },
        OutputSerialization: {
          JSON: {}
        }
      }
    });

    _classPrivateFieldSet(this, _config, configurationObj);
  }

  getJsonFolderPath() {
    return _classPrivateFieldGet(this, _config).folderPath || '';
  }

  async convertBufferDataToJsonData(eventStream) {
    const result = [];
    return new Promise((resolve, reject) => eventStream.on("data", event => {
      if (event.Records) {
        result.push(event.Records.Payload);
      } else if (event.Stats) {// console.log('bytes processed: ', event.Stats.Details.BytesProcessed)
      } else if (event.End) {
        // console.log(
        //   'buffer_size_in_Bytes',
        //   Buffer.byteLength(Buffer.concat(result))
        // )
        const data = Buffer.concat(result).toString();
        const jsonData = JSON.parse(`[${data.split('\n').splice(0, data.split('\n').length - 1)}]`);
        resolve(jsonData);
      }
    }).on("error", error => reject(error)));
  }

  async getDistrict() {
    const entityType = 'orgs';
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*] s WHERE s.type = 'district'`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getAllTerms() {
    const entityType = "academicSessions";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*] s where s.type = 'schoolYear'`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getAllCourses() {
    const entityType = "courses";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*]`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getCourseById(sourcedId) {
    const entityType = "courses";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*] s WHERE s.sourcedId = '${sourcedId}'`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getDataFromS3InBatch(entityType, limit = 5000, offset = 0) {
    const startIndex = offset;
    const endIndex = offset + limit;
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*] s WHERE s.index >= ${startIndex} AND s.index < ${endIndex}` // zero based index

    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getAllSchools() {
    const entityType = "orgs";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*]`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getAllClasses() {
    const entityType = "classes";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*]`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getClassesInSchool(schoolSourcedId) {
    const entityType = "classes";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*] s WHERE s.schoolSourcedId = '${schoolSourcedId}'`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getAllEnrollments() {
    const entityType = "enrollments";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*]`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getEnrollmentsForClass(classSourcedId) {
    const entityType = "enrollments";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*] s WHERE s.classSourcedId = '${classSourcedId}'`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getAllUsers() {
    const entityType = "users";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*]`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getAllUsersByRole(role) {
    const entityType = "users";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*] s WHERE s.role = '${role}'`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getAllUsersByRoleInOrg(role, orgSourcedId) {
    const entityType = "users";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*] s WHERE s.role = '${role}' AND '${orgSourcedId}' in s.orgSourcedIds`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getUsersInClass(classSourcedId) {
    const entityType = "users";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*] s WHERE '${classSourcedId}' in s.classSourcedIds`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getAllDemographics() {
    const entityType = "demographics";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*]`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

  async getDemoGraphicsForUsersInClass(classSourcedId) {
    const entityType = "demographics";
    const jsonData = await _classPrivateFieldGet(this, _config).s3Obj.selectObjectContent(_objectSpread(_objectSpread({
      Bucket: _classPrivateFieldGet(this, _config).bucketName,
      Key: `${_classPrivateFieldGet(this, _config).folderPath}/${entityType}_${_classPrivateFieldGet(this, _config).orgId}.json`
    }, _classPrivateFieldGet(this, _CommonConfig)), {}, {
      Expression: `SELECT * FROM S3Object[*][*] s WHERE '${classSourcedId}' in s.classSourcedIds`
    })).promise();

    if (jsonData !== null && jsonData !== void 0 && jsonData.Payload) {
      return this.convertBufferDataToJsonData(jsonData.Payload);
    }

    return [];
  }

}

exports.default = JsonDataImportService;