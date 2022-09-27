"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractEntity = _interopRequireDefault(require("./AbstractEntity.js"));

var _Organisation = _interopRequireDefault(require("./Organisation.js"));

var _Enrollment = _interopRequireDefault(require("./Enrollment.js"));

var _AcademicSession = _interopRequireDefault(require("./AcademicSession.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClassRoom extends _AbstractEntity.default {
  async getOrg() {
    return this.getParentRelationEntity(_Organisation.default);
  }

  async getEnrollments() {
    return this.getChildrenRelationEntities(_Enrollment.default);
  }

  async getAcademicSession() {
    return this.getParentRelationEntity(_AcademicSession.default);
  }

  static getType() {
    return 'classes';
  }

}

exports.default = ClassRoom;