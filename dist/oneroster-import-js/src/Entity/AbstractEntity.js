"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EntityFactory = _interopRequireDefault(require("./Factory/EntityFactory.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _id = /*#__PURE__*/new WeakMap();

var _storage = /*#__PURE__*/new WeakMap();

var _relationConfig = /*#__PURE__*/new WeakMap();

class AbstractEntity {
  constructor() {
    _classPrivateFieldInitSpec(this, _id, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _storage, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _relationConfig, {
      writable: true,
      value: void 0
    });

    if (this.constructor == AbstractEntity) {
      throw new Error("Object of Abstract Class cannot be created");
    }
  }

  static getType() {
    throw new Error("Abstract Method has no implementation");
  }

  getData() {
    return _classPrivateFieldGet(this, _storage).findByTypeAndId(this.constructor.getType(), _classPrivateFieldGet(this, _id));
  }

  setStorage(storage) {
    _classPrivateFieldSet(this, _storage, storage);
  }

  setRelationConfig(relationConfig) {
    _classPrivateFieldSet(this, _relationConfig, relationConfig);
  }

  getId() {
    return _classPrivateFieldGet(this, _id);
  }

  setId(id) {
    _classPrivateFieldSet(this, _id, id);
  }

  async getChildrenRelationEntities(className, inLineIds = false) {
    let keyType = className.getType();
    let entities = await _classPrivateFieldGet(this, _storage).findByType(keyType);

    let index = _classPrivateFieldGet(this, _relationConfig).getConfig(`${this.constructor.getType()}.relations.${keyType}.index`);

    let results = {};

    for (const key in entities) {
      var _entity$index;

      const entity = entities[key];

      if (inLineIds && (_entity$index = entity[index]) !== null && _entity$index !== void 0 && _entity$index.includes(_classPrivateFieldGet(this, _id))) {
        results[key] = entity;
      } else if (_classPrivateFieldGet(this, _id) === entity[index]) {
        results[key] = entity;
      }
    }

    return _EntityFactory.default.createCollection(className, _classPrivateFieldGet(this, _storage), _classPrivateFieldGet(this, _relationConfig), results);
  }

  async getParentRelationEntity(className, inLineIds = false) {
    let keyType = className.getType();
    let entities = await _classPrivateFieldGet(this, _storage).findByType(keyType);

    let index = _classPrivateFieldGet(this, _relationConfig).getConfig(`${this.constructor.getType()}.relations.${keyType}.index`);

    let valueOfId;

    if (inLineIds) {
      let data = await this.getData();
      valueOfId = data[index];
      let results = {};

      for (const key in entities) {
        const entity = entities[key];

        if (valueOfId.includes(entity['sourcedId'])) {
          results[key] = entity;
        }
      }

      return _EntityFactory.default.createCollection(className, _classPrivateFieldGet(this, _storage), _classPrivateFieldGet(this, _relationConfig), results);
    }

    valueOfId = (await this.getData())[index];
    return _EntityFactory.default.create(valueOfId, className, _classPrivateFieldGet(this, _storage), _classPrivateFieldGet(this, _relationConfig));
  }

}

exports.default = AbstractEntity;