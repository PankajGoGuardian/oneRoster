"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _request = _interopRequireDefault(require("request"));

var _util = require("util");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const rp = (0, _util.promisify)(_request.default);
/**
 * Key and secret for the request
 * @constructor
 * @param {string} clientId
 * @param {string} clientSecret 
 */

function OneRoster(baseUrl, clientId, clientSecret) {
  this.baseUrl = baseUrl;
  this.clientId = clientId;
  this.clientSecret = clientSecret;
}
/**
 * Makes a GET request to the given url with the stored key and secret
 * @param {*} pathUrl  The path url of the request
 * @param {object} urlParams url parameters to filter, order, sort, paginate
 */


OneRoster.prototype.makeRosterRequest = async function (pathUrl, urlParams) {
  const url = this.baseUrl + pathUrl;
  let limit = urlParams.limit;
  let DEFAULT_PAGE_SIZE = 2000;
  let offset = (urlParams === null || urlParams === void 0 ? void 0 : urlParams.offset) || 0; // calculating iteration required for the given limit

  let iteration = limit ? Math.ceil(limit / DEFAULT_PAGE_SIZE) : 0; // If only one iteration require, changing page size to limit

  if (iteration === 1) {
    DEFAULT_PAGE_SIZE = limit;
  }

  let result = [];
  let key;

  do {
    let response = await this.buildReqHeaderAndmakeRosterRequest(url, _objectSpread(_objectSpread({}, urlParams), {}, {
      limit: DEFAULT_PAGE_SIZE,
      offset
    })); // In case of no limit passed, considering total data size as limit

    if (!limit) {
      limit = response.headers['x-total-count']; // Recalculating iteration in case of no limit

      iteration = Math.ceil(limit / DEFAULT_PAGE_SIZE);
    }

    let body = JSON.parse(response.body);
    key = Object.keys(body)[0]; // in api response key will be class or classes etc. so getting first key data

    let data = body[key]; // if API throws any error, same will be thrown from here

    if (data === 'error') {
      throw new Error(body.Description);
    }

    if ((0, _lodash.isArray)(data)) {
      // In case of multiple record query like getAllCourses, getClassesForCourse, etc.
      // the data from API will be array of object
      result.push(...data);
    } else {
      // In case of single record query like getCourse, getClass
      // the data from API will be single object
      result.push(data);
    } // If there is no data from the API OR data size is less than default page size
    // then it indicates, no further data available to fetch, so returning the result


    if (!data.length || data.length < DEFAULT_PAGE_SIZE) {
      break;
    } // Decrementing the iteration after API call


    iteration--; // Calculating offset after every API response

    offset += DEFAULT_PAGE_SIZE; // If next iteration is the last iteration and we have data to fetch 
    // updating the page size equal to remaining data size

    if (iteration === 1 && limit % DEFAULT_PAGE_SIZE !== 0) {
      DEFAULT_PAGE_SIZE = limit % DEFAULT_PAGE_SIZE;
    }
  } while (iteration);

  return modifyDataFromApiToCsvParsedData(result, key);
};

OneRoster.prototype.buildReqHeaderAndmakeRosterRequest = async function (url, urlParams = {}) {
  // Generate timestamp and nonce
  let timestamp = time().toString();
  let nonce = generateNonce(timestamp.length); // Definte oauth params

  let oauth = {
    'oauth_consumer_key': this.clientId,
    'oauth_signature_method': 'HMAC-SHA256',
    'oauth_timestamp': timestamp,
    'oauth_nonce': nonce
  }; // Create object with all the params from the url mixed with oauth params

  let urlPieces = url.split("?");

  let params = _objectSpread({}, oauth);

  let query = {};

  if (Object.keys(urlParams).length) {
    // to convert query params in the url to object
    // let urlParams = paramsToObject(urlPieces[1]);
    let modifiedUrlParams = filterSupportedUrlParams(urlParams);
    query = modifiedUrlParams;
    Object.assign(params, modifiedUrlParams);
  } // Generate oauth signature


  let baseInfo = buildBaseString(urlPieces[0], 'GET', params);
  let compositeKey = encodeURIComponent(this.clientSecret) + "&";

  let oauthSignature = _cryptoJs.default.enc.Base64.stringify(_cryptoJs.default.HmacSHA256(baseInfo, compositeKey));

  oauth.oauth_signature = oauthSignature; // Generate header and make request

  let authHeader = buildAuthorizationHeader(oauth);
  return makeRequest(authHeader, urlPieces[0], query);
};
/**
 * Builds an authorization header for the request
 * @param {object} oauthInfo The oauth header params
 * @returns Returns the authorization header for the request as a string
 */


let buildAuthorizationHeader = function (oauthInfo) {
  let result = 'OAuth ';
  let values = [];

  for (let key in oauthInfo) {
    values.push(key + '="' + encodeURIComponent(oauthInfo[key]) + '"');
  }

  result += values.join(",");
  return result;
};
/**
 * Generates a random nonce
 * @param {number} length The length of the non
 * @returns The nonce as a string
 */


let generateNonce = function (length) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
/**
 * Converts a string of url parameters into an object
 * @param {string} urlParams A string with the parameters from the URL
 * @returns An object with the parameters
 */


let paramsToObject = function (urlParams) {
  let params = urlParams.trim().split('&');
  let result = {};

  for (let i = 0; i < params.length; i++) {
    if (typeof params[i] == undefined) {
      break;
    }

    let value = decodeURIComponent(params[i]);
    let paramParts = value.split("=");

    if (paramParts.length == 2) {
      result[paramParts[0]] = paramParts[1];
    } else {
      result.filter = value.substr(7);
    }
  }

  return result;
};

let filterSupportedUrlParams = function (urlParams) {
  const {
    filter,
    sort,
    orderBy,
    limit,
    offset,
    feilds,
    ext_basic
  } = urlParams;
  let modifiedUrlParams = {};

  if (filter) {
    modifiedUrlParams.filter = filter;
  }

  if (sort) {
    modifiedUrlParams.sort = sort;
  }

  if (orderBy) {
    modifiedUrlParams.orderBy = orderBy;
  }

  if (limit) {
    modifiedUrlParams.limit = limit;
  }

  if (offset) {
    modifiedUrlParams.offset = offset;
  }

  if (feilds) {
    modifiedUrlParams.feilds = feilds;
  }

  if (ext_basic) {
    modifiedUrlParams.ext_basic = ext_basic;
  }

  return modifiedUrlParams;
};
/**
 * Sorts the keys of an object
 * @param {object} o the object to be sorted
 * @returns The object with its keys sorted
 */


let sortObject = function (o) {
  return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
};

let buildBaseString = function (baseURI, method, params) {
  let r = [];
  params = sortObject(params);

  for (let key in params) {
    let value = params[key];
    value = encodeURIComponent(value);
    value = value.replace(/'/g, "%27");
    r.push(key + "=" + value);
  }

  return method + "&" + encodeURIComponent(baseURI) + "&" + encodeURIComponent(r.join("&"));
};
/**
 * Generates a timestamp
 * @returns a timestamp
 */


let time = function () {
  let timestamp = Math.floor(new Date().getTime() / 1000);
  return timestamp;
};
/**
 * Makes a GET request to the url with the given parameters and the generated authoriztaion header
 * @param {string} authHeader The authoriation header for the request
 * @param {string} url The base url for the request
 * @param {ojbect} urlParams The url params for the request
 */


let makeRequest = function (authHeader, url, urlParams) {
  let options = {
    method: 'GET',
    url: url,
    qs: urlParams,
    headers: {
      'Authorization': authHeader
    }
  };
  return rp(options);
};
/**
 * In case of csv importing whichever field value is string/array<string> and 
 * in case of Api import similar field value is obj/array<obj>, 
 * we are converting it in the format of the csv i.e string/array<string>
 * for eg in case of User
 * In CSV import we have orgSourcedIds:[<String>] = ['orgSourcedId1', 'orgSourcedId2']
 * In API import the same field will be org:[<obj>] = [{href: '', sourcedId: '', type: ''}, {href: '', sourcedId: '', type: ''}]
 * This method will convert the org -> orgSouredIds i.e. [<obj>] -> [<string>]
 * @param {array} apiData array of objects(entity)
 * @param {string} key entityName
 * @returns 
 */


let modifyDataFromApiToCsvParsedData = (apiData, key) => {
  let result = [];

  switch (key) {
    case 'academicSession':
    case 'academicSessions':
      {
        const academicSessions = [];

        for (const academicSession of apiData) {
          const modifiedAcademicSession = _objectSpread({}, academicSession);

          modifiedAcademicSession.parentSourcedId = academicSession.parent.sourcedId;
          delete modifiedAcademicSession.parent;
          academicSessions.push(modifiedAcademicSession);
        }

        result = academicSessions;
        break;
      }

    case 'class':
    case 'classes':
      {
        const classes = [];

        for (const clazz of apiData) {
          const modifiedClassObj = _objectSpread({}, clazz);

          modifiedClassObj.courseSourcedId = clazz.course.sourcedId;
          modifiedClassObj.schoolSourcedId = clazz.school.sourcedId;
          modifiedClassObj.termSourcedIds = clazz.terms.map(o => o.sourcedId);
          delete modifiedClassObj.course;
          delete modifiedClassObj.school;
          delete modifiedClassObj.terms;
          classes.push(modifiedClassObj);
        }

        result = classes;
        break;
      }

    case 'course':
    case 'courses':
      {
        const courses = [];

        for (const course of apiData) {
          const modifiedCourseObj = _objectSpread({}, course);

          modifiedCourseObj.orgSourcedId = course.org.sourcedId;
          modifiedCourseObj.schoolYearId = course.schoolYear.sourcedId;
          delete modifiedCourseObj.org;
          delete modifiedCourseObj.schoolYear;
          courses.push(modifiedCourseObj);
        }

        result = courses;
        break;
      }

    case 'demographic':
    case 'demographics':
      {
        result = apiData;
        break;
      }

    case 'enrollment':
    case 'enrollments':
      {
        const enrollments = [];

        for (const enrollment of apiData) {
          const modifiedEnrollmentObj = _objectSpread({}, enrollment);

          modifiedEnrollmentObj.userSourcedId = enrollment.user.sourcedId;
          modifiedEnrollmentObj.classSourcedId = enrollment.class.sourcedId;
          modifiedEnrollmentObj.schoolSourcedId = enrollment.school.sourcedId;
          delete modifiedEnrollmentObj.user;
          delete modifiedEnrollmentObj.class;
          delete modifiedEnrollmentObj.school;
          enrollments.push(modifiedEnrollmentObj);
        }

        result = enrollments;
        break;
      }

    case 'org':
    case 'orgs':
      {
        const orgs = [];

        for (const org of apiData) {
          const modifiedOrgObj = _objectSpread({}, org);

          modifiedOrgObj.parentSourcedId = org.parent.sourcedId;
          delete modifiedOrgObj.parent;
          orgs.push(modifiedOrgObj);
        }

        result = orgs;
        break;
      }

    case 'user':
    case 'users':
      {
        const users = [];

        for (const user of apiData) {
          const modifiedUserObj = _objectSpread({}, user);

          modifiedUserObj.orgSourcedIds = user.orgs.map(o => o.sourcedId);
          modifiedUserObj.agentSourcedIds = user.agents.map(o => o.sourcedId);
          delete modifiedUserObj.orgs;
          delete modifiedUserObj.agents;
          users.push(modifiedUserObj);
        }

        result = users;
        break;
      }

    default:
      result = apiData;
  }

  return result;
};

var _default = OneRoster;
exports.default = _default;