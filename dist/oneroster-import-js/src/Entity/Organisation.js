"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractEntity = _interopRequireDefault(require("./AbstractEntity.js"));

var _ClassRoom = _interopRequireDefault(require("./ClassRoom.js"));

var _User = _interopRequireDefault(require("./User.js"));

var _Enrollment = _interopRequireDefault(require("./Enrollment.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Organisation extends _AbstractEntity.default {
  getClasses() {
    return this.getChildrenRelationEntities(_ClassRoom.default);
  }

  getUsers() {
    return this.getChildrenRelationEntities(_User.default, true);
  }

  getEnrollments() {
    return this.getChildrenRelationEntities(_Enrollment.default);
  }

  static getType() {
    return 'orgs';
  }

}

exports.default = Organisation;