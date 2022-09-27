"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractEntity = _interopRequireDefault(require("./AbstractEntity.js"));

var _Organisation = _interopRequireDefault(require("./Organisation.js"));

var _ClassRoom = _interopRequireDefault(require("./ClassRoom.js"));

var _User = _interopRequireDefault(require("./User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Enrollment extends _AbstractEntity.default {
  getOrg() {
    return this.getParentRelationEntity(_Organisation.default);
  }

  getClass() {
    return this.getParentRelationEntity(_ClassRoom.default);
  }

  getUser() {
    return this.getParentRelationEntity(_User.default);
  }

  static getType() {
    return 'enrollments';
  }

}

exports.default = Enrollment;