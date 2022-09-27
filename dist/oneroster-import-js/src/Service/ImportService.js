"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ImporterFactory = _interopRequireDefault(require("../Import/ImporterFactory.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _options = /*#__PURE__*/new WeakMap();

var _fileHandler = /*#__PURE__*/new WeakMap();

var _pathToFolder = /*#__PURE__*/new WeakMap();

var _fileStream = /*#__PURE__*/new WeakMap();

var _validationErrorLog = /*#__PURE__*/new WeakMap();

class ImportService {
  constructor(fileHandler) {
    _classPrivateFieldInitSpec(this, _options, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _fileHandler, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _pathToFolder, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _fileStream, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _validationErrorLog, {
      writable: true,
      value: {}
    });

    _classPrivateFieldSet(this, _options, {
      version: 'v1.1',
      csvControl: {
        delimiter: ',',
        enclosure: '"',
        escape: '\\'
      }
    });

    _classPrivateFieldSet(this, _fileHandler, fileHandler);
  }

  async import(filePathOrStream, type, options = {}) {
    _classPrivateFieldSet(this, _options, _objectSpread(_objectSpread({}, _classPrivateFieldGet(this, _options)), options));

    this.validateOptions();
    let importer = new _ImporterFactory.default(_classPrivateFieldGet(this, _options)['version'], _classPrivateFieldGet(this, _fileHandler)).build(type);
    let fileResource;

    if (_classPrivateFieldGet(this, _pathToFolder)) {
      fileResource = await _classPrivateFieldGet(this, _fileHandler).open(filePathOrStream);

      if (!fileResource) {
        return {};
      }
    } else {
      fileResource = filePathOrStream;
    }

    let dataLines = [];
    let header = [];

    const {
      delimiter,
      enclosure,
      escape
    } = _classPrivateFieldGet(this, _options)['csvControl'];

    let index = 0;
    let lines = [];

    try {
      lines = await _classPrivateFieldGet(this, _fileHandler).readCsvLines(fileResource, index, delimiter, enclosure, escape);
    } catch (e) {
      // this.#validationErrorLog = [...this.#validationErrorLog, [`${type}.csv`,'' ,'', e.message]]
      _classPrivateFieldSet(this, _validationErrorLog, _objectSpread(_objectSpread({}, _classPrivateFieldGet(this, _validationErrorLog)), {}, {
        [type]: [{
          error: {
            fileName: `${type}.csv`,
            rowNumber: '',
            message: e.message || '',
            type: 'fileError',
            fieldName: ''
          }
        }]
      }));
    }

    if (!_lodash.default.isEmpty(lines)) {
      for (const line of lines) {
        index++;
        let dataLine = line.map(word => word.trim());

        if (index === 1) {
          header = dataLine;
          continue;
        }

        dataLines.push(dataLine);
      }
    }

    let {
      result,
      validationErrors
    } = importer.import(header, dataLines, type); // this.#validationErrorLog = [...this.#validationErrorLog, ...validationErrors]

    _classPrivateFieldSet(this, _validationErrorLog, _objectSpread(_objectSpread({}, _classPrivateFieldGet(this, _validationErrorLog)), validationErrors));

    return result;
  }

  async importMultiple(pathToFolder, options = {}) {
    _classPrivateFieldSet(this, _options, _objectSpread(_objectSpread({}, _classPrivateFieldGet(this, _options)), options));

    this.validateOptions();
    let results = {};

    if (_classPrivateFieldGet(this, _pathToFolder)) {
      let availableTypes = this.detectAvailableTypes(pathToFolder);
      availableTypes.forEach(async availableType => {
        results[availableType] = await this.import(`${pathToFolder}${availableType}.csv`, availableType, _classPrivateFieldGet(this, _options));
      });
    }

    return results;
  }

  getPathToFolder() {
    return _classPrivateFieldGet(this, _pathToFolder);
  }

  setPathToFolder(pathToFolder) {
    _classPrivateFieldSet(this, _pathToFolder, pathToFolder);
  }

  getFileStream() {
    return _classPrivateFieldGet(this, _fileStream);
  }

  setFileStream(stream) {
    _classPrivateFieldSet(this, _fileStream, stream);
  }

  getValidationErrorLog() {
    return _classPrivateFieldGet(this, _validationErrorLog);
  }

  async detectAvailableTypes(pathToFolder) {
    let types = {};
    index = 0;
    let result = await this.import(`${pathToFolder}manifest.csv`, 'manifest', this.options);
    result.forEach(row => {
      let property = row['propertyName'];
      let value = row['value'];

      if (property.indexOf('file.') !== -1 && value !== 'absent') {
        let parts = property.split('.');
        types[index++] = parts[parts.length - 1];
      }
    });
    return types;
  }

  validateOptions() {
    if (_lodash.default.isEmpty(_classPrivateFieldGet(this, _options)['version'])) {
      throw new Error('Version should be specified as option');
    }

    if (_lodash.default.isEmpty(_classPrivateFieldGet(this, _options)['csvControl'])) {
      throw new Error('csvControl should be specified as option');
    }
  }

}

exports.default = ImportService;