"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class RequiredException extends Error {
  constructor(field) {
    const message = `Required field ${field} does not exists or it is empty`;
    super(message);
    this.name = 'RequiredException';
    this.field = field;
  }

}

exports.default = RequiredException;