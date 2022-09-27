"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCsvDataAndUploadToS3 = void 0;

var _Organisation = _interopRequireDefault(require("../Entity/Organisation.js"));

var _User = _interopRequireDefault(require("../Entity/User.js"));

var _ClassRoom = _interopRequireDefault(require("../Entity/ClassRoom.js"));

var _AcademicSession = _interopRequireDefault(require("../Entity/AcademicSession.js"));

var _Course = _interopRequireDefault(require("../Entity/Course.js"));

var _Demographic = _interopRequireDefault(require("../Entity/Demographic.js"));

var _Enrollment = _interopRequireDefault(require("../Entity/Enrollment.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const addClassSourcedIdsToDocumentHavingUserSourcedId = (docs = [], userSourcedIdToClassSourcedIds = {}) => {
  return docs.map(doc => {
    return _objectSpread(_objectSpread({}, doc), {}, {
      classSourcedIds: userSourcedIdToClassSourcedIds[doc.sourcedId] || []
    });
  });
};

const addIndexToDocument = (objArr = []) => {
  return objArr.map((obj, index) => _objectSpread(_objectSpread({}, obj), {}, {
    index
  }));
};
/**
 *
 * @param {object} entityRepository
 * @param {object} jsonService
 * @param {object} csvStorage
 */


const parseCsvDataAndUploadToS3 = async (entityRepository, jsonService, csvStorage) => {
  const typeToClassMap = {
    academicSessions: _AcademicSession.default,
    classes: _ClassRoom.default,
    courses: _Course.default,
    orgs: _Organisation.default
  };
  let data; // parsing and uploading academicSessions, classes, courses and orgs to s3

  for (const entityType of Object.keys(typeToClassMap)) {
    data = await entityRepository.getAll(typeToClassMap[entityType]);
    data = addIndexToDocument(data);
    await jsonService.uploadService.uploadJsonDataToS3(entityType, data);
    csvStorage.clearEntityData(entityType);
  } // parsing and uploading enrollment to S3


  let enrollments = await entityRepository.getAll(_Enrollment.default);
  enrollments = addIndexToDocument(enrollments);
  await jsonService.uploadService.uploadJsonDataToS3(_Enrollment.default.getType(), enrollments);
  csvStorage.clearEntityData(_Enrollment.default.getType()); // calculating userSourcedIdToClassSourcedIds map using enrollments
  // userSourcedIdToClassSourcedIds will help to populate classSourcedIds to user and demographic objects
  // classSourcedIds will help to fetch class level user and demographic from s3

  const userSourcedIdToClassSourcedIds = {};

  for (const enrollment of enrollments) {
    const {
      classSourcedId,
      userSourcedId
    } = enrollment;
    const classSourcedIds = userSourcedIdToClassSourcedIds[userSourcedId] || [];
    classSourcedIds.push(classSourcedId);
    userSourcedIdToClassSourcedIds[userSourcedId] = classSourcedIds;
  }

  enrollments = null; // populating users json documents with associated classSourcedIds using userSourcedIdToClassSourcedIds map

  let users = await entityRepository.getAll(_User.default);
  users = addClassSourcedIdsToDocumentHavingUserSourcedId(users, userSourcedIdToClassSourcedIds);
  users = addIndexToDocument(users); // uploading modified user documents to s3

  await jsonService.uploadService.uploadJsonDataToS3(_User.default.getType(), users);
  users = null;
  csvStorage.clearEntityData(_User.default.getType()); // populating demographic json documents of users with associated classSourcedIds using userSourcedIdToClassSourcedIds map

  let demographics = await entityRepository.getAll(_Demographic.default);
  demographics = addClassSourcedIdsToDocumentHavingUserSourcedId(demographics, userSourcedIdToClassSourcedIds);
  demographics = addIndexToDocument(demographics); // uploading modified demographic documents to s3

  await jsonService.uploadService.uploadJsonDataToS3(_Demographic.default.getType(), demographics);
  demographics = null;
  csvStorage.clearEntityData(_Demographic.default.getType());
};

exports.parseCsvDataAndUploadToS3 = parseCsvDataAndUploadToS3;