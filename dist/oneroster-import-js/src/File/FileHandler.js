"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _csvParse = require("csv-parse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FileHandler {
  constructor() {}

  async open(filePath, mode = 'r') {
    let isFileReadable = false;

    try {
      await _fs.default.promises.access(filePath, _fs.default.constants.R_OK);
      isFileReadable = true;

      const filePathExists = _fs.default.existsSync(filePath);

      const fileHandler = _fs.default.createReadStream(filePath, {
        flag: mode,
        encoding: 'UTF-8'
      });

      if (!filePathExists || !isFileReadable || !fileHandler) {
        throw new Error('File to import cannot be loaded.');
      }

      return fileHandler;
    } catch (e) {
      return null;
    }
  }

  getContents(fileName) {
    var fileContent = _fs.default.readFileSync(fileName, 'utf8');

    return fileContent;
  }

  async readCsvLines(handle, length = 0, delimiter = ',', enclosure = '"', escape = '\\') {
    const parsedFileLines = [];
    return new Promise((resolve, reject) => handle.pipe((0, _csvParse.parse)({
      delimiter: [',', '"'],
      escape,
      enclosure
    })).on('data', data => {
      parsedFileLines.push(data);
    }).on('end', () => {
      resolve(parsedFileLines);
    }).on('error', err => {
      reject(err);
    }));
  }

}

exports.default = FileHandler;