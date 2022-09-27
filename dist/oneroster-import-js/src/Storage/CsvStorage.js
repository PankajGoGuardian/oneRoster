"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _importService = /*#__PURE__*/new WeakMap();

var _imports = /*#__PURE__*/new WeakMap();

class CsvStorage {
  constructor(importService) {
    _classPrivateFieldInitSpec(this, _importService, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _imports, {
      writable: true,
      value: {}
    });

    _classPrivateFieldSet(this, _importService, importService);
  }

  clearEntityData(entityType) {
    _classPrivateFieldGet(this, _imports)[entityType] = {};
  }

  clearAllEntityData() {
    _classPrivateFieldSet(this, _imports, {});
  }

  async findAllEntity() {
    const allowedEntityTypes = ['academicSessions', 'classes', 'courses', 'demographics', 'enrollments', 'orgs', 'users', 'categories', 'classResources', 'courseResources', 'lineItems', 'results', 'resources'];

    if (!_lodash.default.isEmpty(_classPrivateFieldGet(this, _imports))) {
      return _classPrivateFieldGet(this, _imports);
    }

    let pathToFolder = _classPrivateFieldGet(this, _importService).getPathToFolder();

    if (_lodash.default.isEmpty(pathToFolder)) {
      const directory = _classPrivateFieldGet(this, _importService).getFileStream();

      for await (const file of directory.files) {
        var _file$path$split, _fileName$split;

        const fileName = (_file$path$split = file.path.split('/')) === null || _file$path$split === void 0 ? void 0 : _file$path$split[1];

        if (_lodash.default.isEmpty(fileName)) {
          continue;
        }

        const typeOfEntity = fileName === null || fileName === void 0 ? void 0 : (_fileName$split = fileName.split('.')) === null || _fileName$split === void 0 ? void 0 : _fileName$split[0];

        if (!allowedEntityTypes.includes(typeOfEntity)) {
          continue;
        }

        const file_stream = await file.stream();
        if (file_stream) _classPrivateFieldGet(this, _imports)[typeOfEntity] = await _classPrivateFieldGet(this, _importService).import(file_stream, typeOfEntity);else _classPrivateFieldGet(this, _imports)[typeOfEntity] = {};
      }
    } else {
      for (const typeOfEntity of allowedEntityTypes) _classPrivateFieldGet(this, _imports)[typeOfEntity] = await _classPrivateFieldGet(this, _importService).import(`${pathToFolder}${typeOfEntity}.csv`, typeOfEntity);
    }

    return _classPrivateFieldGet(this, _imports);
  }

  async findByType(typeOfEntity) {
    if (!_lodash.default.isEmpty(_classPrivateFieldGet(this, _imports)[typeOfEntity])) {
      return _classPrivateFieldGet(this, _imports)[typeOfEntity];
    }

    let pathToFolder = _classPrivateFieldGet(this, _importService).getPathToFolder();

    if (_lodash.default.isEmpty(pathToFolder)) {
      const directory = _classPrivateFieldGet(this, _importService).getFileStream();

      let file_stream;

      for await (const file of directory.files) {
        var _file$path$split2, _fileName$split2;

        const fileName = (_file$path$split2 = file.path.split('/')) === null || _file$path$split2 === void 0 ? void 0 : _file$path$split2[1];

        if (_lodash.default.isEmpty(fileName)) {
          continue;
        }

        const entityType = fileName === null || fileName === void 0 ? void 0 : (_fileName$split2 = fileName.split('.')) === null || _fileName$split2 === void 0 ? void 0 : _fileName$split2[0];

        if (entityType === typeOfEntity) {
          file_stream = await file.stream();
          break;
        }
      }

      if (file_stream) _classPrivateFieldGet(this, _imports)[typeOfEntity] = await _classPrivateFieldGet(this, _importService).import(file_stream, typeOfEntity);else _classPrivateFieldGet(this, _imports)[typeOfEntity] = {};
    } else {
      _classPrivateFieldGet(this, _imports)[typeOfEntity] = await _classPrivateFieldGet(this, _importService).import(`${pathToFolder}${typeOfEntity}.csv`, typeOfEntity);
    }

    return _classPrivateFieldGet(this, _imports)[typeOfEntity];
  }

  async findByTypeAndId(typeOfEntity, id) {
    if (!_lodash.default.isEmpty(_classPrivateFieldGet(this, _imports)[typeOfEntity])) {
      return _classPrivateFieldGet(this, _imports)[typeOfEntity][id];
    }

    if (_lodash.default.isEmpty(_classPrivateFieldGet(this, _imports)[typeOfEntity])) {
      let pathToFolder = _classPrivateFieldGet(this, _importService).getPathToFolder();

      if (_lodash.default.isEmpty(pathToFolder)) {
        const directory = _classPrivateFieldGet(this, _importService).getFileStream();

        let file_stream;

        for await (const file of directory.files) {
          var _file$path$split3, _fileName$split3;

          const fileName = (_file$path$split3 = file.path.split('/')) === null || _file$path$split3 === void 0 ? void 0 : _file$path$split3[1];

          if (_lodash.default.isEmpty(fileName)) {
            continue;
          }

          const entityType = fileName === null || fileName === void 0 ? void 0 : (_fileName$split3 = fileName.split('.')) === null || _fileName$split3 === void 0 ? void 0 : _fileName$split3[0];

          if (entityType === typeOfEntity) {
            file_stream = await file.stream();
            break;
          }
        }

        if (file_stream) _classPrivateFieldGet(this, _imports)[typeOfEntity] = await _classPrivateFieldGet(this, _importService).import(_classPrivateFieldGet(this, _importService).getFileStream(), typeOfEntity);else _classPrivateFieldGet(this, _imports)[typeOfEntity] = {};
      } else {
        _classPrivateFieldGet(this, _imports)[typeOfEntity] = await _classPrivateFieldGet(this, _importService).import(`${pathToFolder}${typeOfEntity}.csv`, typeOfEntity);
      }
    }

    _classPrivateFieldGet(this, _imports)[typeOfEntity].forEach(item => {
      if (item['sourcedId'] === id) {
        return item;
      }
    });
  }

}

exports.default = CsvStorage;