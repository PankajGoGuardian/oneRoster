"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.V1p1Api = void 0;

var _AcademicSessionsManagement = require("./AcademicSessionsManagement.js");

var _ClassesManagement = require("./ClassesManagement.js");

var _CoursesManagement = require("./CoursesManagement.js");

var _DemographicsManagement = require("./DemographicsManagement.js");

var _EnrollmentsManagement = require("./EnrollmentsManagement.js");

var _GradingPeriodsManagement = require("./GradingPeriodsManagement.js");

var _OrgsManagement = require("./OrgsManagement.js");

var _SchoolsManagement = require("./SchoolsManagement.js");

var _StudentsManagement = require("./StudentsManagement.js");

var _TeachersManagement = require("./TeachersManagement.js");

var _TermsManagement = require("./TermsManagement.js");

var _UsersManagement = require("./UsersManagement.js");

var _OneRoster = _interopRequireDefault(require("../OneRoster.js"));

var _OneRoster2 = _interopRequireDefault(require("../OneRoster2.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Class for oneroster v1.1 api call
* @param {string} baseUrl baseUrl of SIS
* @param {string} clientId clientId of SIS
* @param {string} clientSecret clientSecret of SIS
* @param {boolean} useOAuth2 flag to indicate, use oAuth 2.0 for making request
* @param {string} tokenUrl tokenUrl of SIS (used for oAuth 2.0) 
*/
class V1p1Api {
  constructor(baseUrl, clientId, clientSecret, useOAuth2 = false, tokenUrl) {
    let oneRosterObj;

    if (useOAuth2) {
      oneRosterObj = new _OneRoster2.default(tokenUrl, baseUrl, clientId, clientSecret);
    } else {
      oneRosterObj = new _OneRoster.default(baseUrl, clientId, clientSecret);
    }

    this.academicSessionsManagement = new _AcademicSessionsManagement.AcademicSessionsManagement(oneRosterObj);
    this.classesManagement = new _ClassesManagement.ClassesManagement(oneRosterObj);
    this.coursesManagement = new _CoursesManagement.CoursesManagement(oneRosterObj);
    this.demographicsManagement = new _DemographicsManagement.DemographicsManagement(oneRosterObj);
    this.enrollmentsManagement = new _EnrollmentsManagement.EnrollmentsManagement(oneRosterObj);
    this.gradingPeriodsManagement = new _GradingPeriodsManagement.GradingPeriodsManagement(oneRosterObj);
    this.orgsManagement = new _OrgsManagement.OrgsManagement(oneRosterObj);
    this.schoolsMangement = new _SchoolsManagement.SchoolsMangement(oneRosterObj);
    this.studentsManagement = new _StudentsManagement.StudentsManagement(oneRosterObj);
    this.teachersManagement = new _TeachersManagement.TeachersManagement(oneRosterObj);
    this.termsManagement = new _TermsManagement.TermsManagement(oneRosterObj);
    this.usersManagement = new _UsersManagement.UsersManagement(oneRosterObj);
  }

}

exports.V1p1Api = V1p1Api;