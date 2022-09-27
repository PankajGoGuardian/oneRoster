"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractEntity = _interopRequireDefault(require("./AbstractEntity.js"));

var _ClassRoom = _interopRequireDefault(require("./ClassRoom.js"));

var _Resource = _interopRequireDefault(require("./Resource.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClassResource extends _AbstractEntity.default {
  constructor() {}

  getClass() {
    return this.getParentRelationEntity(_ClassRoom.default);
  }

  getResource() {
    return this.getParentRelationEntity(_Resource.default);
  }

  static getType() {
    return 'classResources';
  }

}

exports.default = ClassResource;