"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractEntity = _interopRequireDefault(require("./AbstractEntity.js"));

var _LineItem = _interopRequireDefault(require("./LineItem.js"));

var _User = _interopRequireDefault(require("./User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Result extends _AbstractEntity.default {
  getLineItem() {
    return this.getParentRelationEntity(_LineItem.default);
  }

  getUser() {
    return this.getParentRelationEntity(_User.default);
  }

  static getType() {
    return 'results';
  }

}

exports.default = Result;