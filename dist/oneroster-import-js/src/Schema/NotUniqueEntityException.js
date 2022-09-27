"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class NotUniqueEntityException extends Error {
  constructor(field, sourceId) {
    const message = `Entity with sourcedId ${sourceId} already exist.`;
    super(message);
    this.name = 'NotUniqueEntityException';
    this.field = field;
  }

}

exports.default = NotUniqueEntityException;