"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FormatException extends Error {
  constructor(field, shouldBe, itIs) {
    const message = `Format of field ${field} is invalid, it should be ${shouldBe} but it is ${itIs}.`;
    super(message);
    this.name = 'FormatException';
    this.field = field;
  }

}

exports.default = FormatException;