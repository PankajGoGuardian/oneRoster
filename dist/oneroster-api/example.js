"use strict";

var _OneRosterApi = _interopRequireDefault(require("./OneRosterApi.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  // // TODO: access baseUrl, clientId, clientSecret from config file
  // const baseUrl = process.env.BASE_URL || ''
  // const clientId = process.env.CONSUMER_KEY || ''// consumerKey
  // const clientSecret = process.env.CONSUMER_SECRET || '' // consumerSecret
  const oneRosterApiObj = new _OneRosterApi.default(); // using v1p1

  const v1p1Obj = oneRosterApiObj.v1p1(baseUrl, clientId, clientSecret);
  const result = {};
  const params = {
    limit: 200
  }; // result.academicSession = await v1p1Obj.academicSessionsManagement.getAllAcademicSessions(params)
  // result.classes = await v1p1Obj.classesManagement.getAllClasses(params)
  // result.courses = await v1p1Obj.coursesManagement.getAllCourses(params)
  // result.demographics = await v1p1Obj.demographicsManagement.getAllDemographics(params)

  result.enrollments = await v1p1Obj.enrollmentsManagement.getAllEnrollments(params); // result.gradingPeriods = await v1p1Obj.gradingPeriodsManagement.getAllGradingPeriods(params)
  // result.orgs = await v1p1Obj.orgsManagement.getAllOrgs(params)
  // result.schools = await v1p1Obj.schoolsMangement.getAllSchools(params)
  // result.students = await v1p1Obj.studentsManagement.getAllStudents(params)
  // result.teachers = await v1p1Obj.teachersManagement.getAllTeachers(params)
  // result.terms = await v1p1Obj.termsManagement.getAllTerms(params)
  // result.users = await v1p1Obj.usersManagement.getAllUsers(params)

  console.log(result.enrollments.length);
})();