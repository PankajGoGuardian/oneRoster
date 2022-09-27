"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _validator = _interopRequireDefault(require("validator"));

var _FormatException = _interopRequireDefault(require("./FormatException.js"));

var _RequiredException = _interopRequireDefault(require("./RequiredException.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _DATE_FORMAT = /*#__PURE__*/new WeakMap();

var _DATE_TIME_FORMAT = /*#__PURE__*/new WeakMap();

var _schema = /*#__PURE__*/new WeakMap();

class Validator {
  constructor(schema) {
    _classPrivateFieldInitSpec(this, _DATE_FORMAT, {
      writable: true,
      value: 'YYYY-MM-DD'
    });

    _classPrivateFieldInitSpec(this, _DATE_TIME_FORMAT, {
      writable: true,
      value: 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
    });

    _classPrivateFieldInitSpec(this, _schema, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _schema, schema);
  }

  validate(dataRow) {
    this.validateRequiredFields(dataRow);
    return this.validateFormat(dataRow);
  }

  validateRequiredFields(dataRow) {
    const requiredFields = this.extractRequiresFields();
    requiredFields.forEach(requiredField => {
      if (_lodash.default.isEmpty(dataRow[requiredField])) {
        throw new _RequiredException.default(requiredField);
      }
    });
  }

  validateFormat(dataRow) {
    var _classPrivateFieldGet2;

    let _dataRow = {};
    (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _schema)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.forEach(itemSchema => {
      const columnIdentifier = itemSchema['columnId'];

      if (_lodash.default.isEmpty(dataRow[columnIdentifier])) {
        return;
      }

      const format = itemSchema['format'];
      let value = dataRow[columnIdentifier];

      if (format === 'boolean') {
        if (_validator.default.isBoolean(value, {
          loose: true
        })) {
          value = true;
        } else {
          value = false;
        }
      }

      if (format === 'date' || format === 'datetime') {
        let dateFormat = format === 'date' ? _classPrivateFieldGet(this, _DATE_FORMAT) : _classPrivateFieldGet(this, _DATE_TIME_FORMAT);
        value = (0, _moment.default)(new Date(value)).format(dateFormat);

        if (value === 'Invalid date' && this.isFieldRequired(columnIdentifier)) {
          throw new _FormatException.default(columnIdentifier, format, typeof value);
        }
      } else if (format === 'list') {
        value = value.split(',').map(_val => _val.trim());
      } else if (format === 'float') {
        if (isNaN(value) && this.isFieldRequired(columnIdentifier)) {
          throw new _FormatException.default(columnIdentifier, format, typeof value);
        }
      } else if (format === 'year') {
        const date = new Date(value);

        if (date === 'Invalid Date') {
          throw new _FormatException.default(columnIdentifier, format, typeof value);
        }

        value = date.getFullYear().toString();
      } else {
        if (typeof value !== format && this.isFieldRequired(columnIdentifier)) {
          throw new _FormatException.default(columnIdentifier, format, typeof value);
        }
      }

      _dataRow[columnIdentifier] = value;
    });
    return _dataRow;
  }

  extractRequiresFields() {
    var _classPrivateFieldGet3;

    const requiredFields = [];
    (_classPrivateFieldGet3 = _classPrivateFieldGet(this, _schema)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.forEach(itemSchema => {
      if (itemSchema['required']) {
        requiredFields.push(itemSchema['columnId']);
      }
    });
    return requiredFields;
  }

  isFieldRequired(field) {
    const requiredFields = this.extractRequiresFields();
    return requiredFields.indexOf(field) !== -1;
  }

}

exports.default = Validator;