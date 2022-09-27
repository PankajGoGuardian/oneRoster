"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractEntity = _interopRequireDefault(require("./AbstractEntity.js"));

var _Course = _interopRequireDefault(require("./Course.js"));

var _Resource = _interopRequireDefault(require("./Resource.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CourseResource extends _AbstractEntity.default {
  getCourse() {
    return this.getParentRelationEntity(_Course.default);
  }

  getResource() {
    return this.getParentRelationEntity(_Resource.default);
  }

  static getType() {
    return 'courseResources';
  }

}

exports.default = CourseResource;