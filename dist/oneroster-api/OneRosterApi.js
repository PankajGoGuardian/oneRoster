"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _V1p1Api = require("./v1p1/V1p1Api.js");

var _V1p2Api = require("./v1p2/V1p2Api.js");

class OneRosterApi {
  constructor() {} // make oneRoster api requests for v1.1


  v1p1(baseUrl, consumerKey, consumerSecret, useOAuth2, tokenUrl) {
    return new _V1p1Api.V1p1Api(baseUrl, consumerKey, consumerSecret, useOAuth2, tokenUrl);
  } // make oneRoster api requests for v1.2


  v1p2(baseUrl, consumerKey, consumerSecret, useOAuth2, tokenUrl) {
    return new _V1p2Api.V1p2Api(baseUrl, consumerKey, consumerSecret, useOAuth2, tokenUrl);
  }

}

exports.default = OneRosterApi;