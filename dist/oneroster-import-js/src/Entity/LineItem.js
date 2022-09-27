"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractEntity = _interopRequireDefault(require("./AbstractEntity.js"));

var _ClassRoom = _interopRequireDefault(require("./ClassRoom.js"));

var _Category = _interopRequireDefault(require("./Category.js"));

var _AcademicSession = _interopRequireDefault(require("./AcademicSession.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LineItem extends _AbstractEntity.default {
  getClass() {
    return this.getParentRelationEntity(_ClassRoom.default);
  }

  getCategory() {
    return this.getParentRelationEntity(_Category.default);
  }

  getAcademicSession() {
    return this.getParentRelationEntity(_AcademicSession.default);
  }

  static getType() {
    return 'lineItems';
  }

}

exports.default = LineItem;