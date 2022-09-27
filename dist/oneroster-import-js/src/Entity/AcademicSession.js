"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractEntity = _interopRequireDefault(require("./AbstractEntity.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AcademicSession extends _AbstractEntity.default {
  static getType() {
    return 'academicSessions';
  }

}

exports.default = AcademicSession;