"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _dataConfig = /*#__PURE__*/new WeakMap();

class RelationConfig {
  constructor(dataConfig) {
    _classPrivateFieldInitSpec(this, _dataConfig, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _dataConfig, dataConfig);
  }

  getConfig(configKey) {
    let parts = configKey.split('.');
    let val = this.iterate(_classPrivateFieldGet(this, _dataConfig), parts);
    return val;
  }

  iterate(data, parts, index = 0) {
    let value = data[parts[index]];

    if (!_lodash.default.isEmpty(parts[index + 1])) {
      if (_lodash.default.isEmpty(value[parts[index + 1]])) {
        return null;
      }

      parts[index] = null;
      index++;
      return this.iterate(value, parts, index);
    }

    return value;
  }

}

exports.default = RelationConfig;