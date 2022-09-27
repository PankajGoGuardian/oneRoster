"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _RelationConfig = _interopRequireDefault(require("../RelationConfig.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _fileHandler = /*#__PURE__*/new WeakMap();

class RelationConfigFactory {
  constructor(fileHandler) {
    _classPrivateFieldInitSpec(this, _fileHandler, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _fileHandler, fileHandler);
  }

  create() {
    const pathToSchemaJson = __dirname + '/../../../config/v1.1/relations.json';

    const content = _classPrivateFieldGet(this, _fileHandler).getContents(pathToSchemaJson);

    const dataConfig = JSON.parse(content);
    return new _RelationConfig.default(dataConfig);
  }

}

exports.default = RelationConfigFactory;