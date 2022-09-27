"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EntityFactory = _interopRequireDefault(require("./Factory/EntityFactory.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _storage = /*#__PURE__*/new WeakMap();

var _relationConfig = /*#__PURE__*/new WeakMap();

class EntityRepository {
  constructor(storage, relationConfig) {
    _classPrivateFieldInitSpec(this, _storage, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _relationConfig, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _storage, storage);

    _classPrivateFieldSet(this, _relationConfig, relationConfig);
  }

  async get(id, entityName) {
    return _EntityFactory.default.create(id, entityName, _classPrivateFieldGet(this, _storage), _classPrivateFieldGet(this, _relationConfig));
  }

  async getAll(entityName) {
    return _EntityFactory.default.createCollection(entityName, _classPrivateFieldGet(this, _storage), _classPrivateFieldGet(this, _relationConfig));
  }

  async getAllEntities() {
    return _EntityFactory.default.createCollections(_classPrivateFieldGet(this, _storage), _classPrivateFieldGet(this, _relationConfig));
  }

}

exports.default = EntityRepository;