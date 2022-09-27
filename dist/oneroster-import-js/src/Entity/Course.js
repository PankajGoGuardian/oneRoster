"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractEntity = _interopRequireDefault(require("./AbstractEntity.js"));

var _Organisation = _interopRequireDefault(require("./Organisation.js"));

var _AcademicSession = _interopRequireDefault(require("./AcademicSession.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Course extends _AbstractEntity.default {
  getOrg() {
    return this.getParentRelationEntity(_Organisation.default);
  }

  getAcademicCourse() {
    return this.getParentRelationEntity(_AcademicSession.default);
  }

  static getType() {
    return 'courses';
  }

}

exports.default = Course;