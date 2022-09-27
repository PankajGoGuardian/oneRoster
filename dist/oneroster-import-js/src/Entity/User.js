"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractEntity = _interopRequireDefault(require("./AbstractEntity.js"));

var _Organisation = _interopRequireDefault(require("./Organisation.js"));

var _Demographic = _interopRequireDefault(require("./Demographic.js"));

var _Enrollment = _interopRequireDefault(require("./Enrollment.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _AbstractEntity.default {
  getOrgs() {
    return this.getParentRelationEntity(_Organisation.default, true);
  }

  getDemographics() {
    return this.getChildrenRelationEntities(_Demographic.default);
  }

  getEnrollments() {
    return this.getChildrenRelationEntities(_Enrollment.default);
  }

  static getType() {
    return 'users';
  }

}

exports.default = User;