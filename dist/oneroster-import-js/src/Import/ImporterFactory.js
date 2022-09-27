"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _Validator = _interopRequireDefault(require("../Schema/Validator.js"));

var _Importer = _interopRequireDefault(require("./Importer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _version = /*#__PURE__*/new WeakMap();

var _fileHandler = /*#__PURE__*/new WeakMap();

var _types = /*#__PURE__*/new WeakMap();

class ImporterFactory {
  constructor(version, fileHandler, types = {}) {
    _classPrivateFieldInitSpec(this, _version, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _fileHandler, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _types, {
      writable: true,
      value: {
        manifest: 'manifest.json',
        categories: 'categories.json',
        classResources: 'classResources.json',
        courseResources: 'courseResources.json',
        orgs: 'orgs.json',
        classes: 'classes.json',
        users: 'users.json',
        enrollments: 'enrollments.json',
        lineItems: 'lineItems.json',
        courses: 'courses.json',
        academicSessions: 'academicSessions.json',
        demographics: 'demographics.json',
        resources: 'resources.json',
        results: 'results.json'
      }
    });

    _classPrivateFieldSet(this, _version, version);

    _classPrivateFieldSet(this, _fileHandler, fileHandler);

    _classPrivateFieldSet(this, _types, _objectSpread(_objectSpread({}, _classPrivateFieldGet(this, _types)), types));
  }

  build(type) {
    if (!_classPrivateFieldGet(this, _types)[type]) {
      throw new Error(`${type} not supported by FactoryImporter`);
    }

    const pathToSchemaJson = __dirname + '/../../config/' + _classPrivateFieldGet(this, _version) + '/' + _classPrivateFieldGet(this, _types)[type];

    const schema = JSON.parse(_classPrivateFieldGet(this, _fileHandler).getContents(pathToSchemaJson));
    return new _Importer.default(new _Validator.default(schema));
  }

}

exports.default = ImporterFactory;