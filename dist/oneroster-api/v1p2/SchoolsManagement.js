"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchoolsMangement = void 0;

class SchoolsMangement {
  constructor(oneRosterApi) {
    this.oneRosterApi = oneRosterApi;
  }
  /**
   * Get all schools in the district
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getAllSchools(urlParams = {}) {
    let resource = `/schools`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get a specific school in the district
   * @param {string} sourcedId sourcedId of the school
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getSchool(sourcedId, urlParams = {}) {
    let resource = `/schools/${sourcedId}`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all classes in the school
   * @param {string} sourcedId sourcedId of the school
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getClassesForSchool(sourcedId, urlParams = {}) {
    let resource = `/schools/${sourcedId}/classes`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all Enrollment for a class in the school
   * @param {string} schoolSourcedId sourcedId of the school
   * @param {string} classSourcedId sourcedId of the class
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getEnrollmentsForClassInSchool(schoolSourcedId, classSourcedId, urlParams = {}) {
    let resource = `/schools/${schoolSourcedId}/classes/${classSourcedId}/enrollments`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all students for a class in the school
   * @param {string} schoolSourcedId sourcedId of the school
   * @param {string} classSourcedId sourcedId of the class
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getStudentsForClassInSchool(schoolSourcedId, classSourcedId, urlParams = {}) {
    let resource = `/schools/${schoolSourcedId}/classes/${classSourcedId}/students`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all teachers for a class in the school
   * @param {string} schoolSourcedId sourcedId of the school
   * @param {string} classSourcedId sourcedId of the class
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getTeachersForClassInSchool(schoolSourcedId, classSourcedId, urlParams = {}) {
    let resource = `/schools/${schoolSourcedId}/classes/${classSourcedId}/teachers`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all courses for the school
   * @param {string} sourcedId sourcedId of the school
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getCoursesForSchool(sourcedId, urlParams = {}) {
    let resource = `/schools/${sourcedId}/courses`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all enrollments for the school
   * @param {string} sourcedId sourcedId of the school
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getEnrollmentsForSchool(sourcedId, urlParams = {}) {
    let resource = `/schools/${sourcedId}/enrollments`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all students for the school
   * @param {string} sourcedId sourcedId of the school
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getStudentsForSchool(sourcedId, urlParams = {}) {
    let resource = `/schools/${sourcedId}/students"`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all teachers for the school
   * @param {string} sourcedId sourcedId of the school
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getTeachersForSchool(sourcedId, urlParams = {}) {
    let resource = `/schools/${sourcedId}/teachers`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all terms(academicSessions) for the school
   * @param {string} sourcedId sourcedId of the school
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getTermsForSchool(sourcedId, urlParams = {}) {
    let resource = `/schools/${sourcedId}/terms`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }

}

exports.SchoolsMangement = SchoolsMangement;