"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StudentsManagement = void 0;

class StudentsManagement {
  constructor(oneRosterApi) {
    this.oneRosterApi = oneRosterApi;
  }
  /**
   * Get all students in the district
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getAllStudents(urlParams = {}) {
    const resource = `/students`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get a specific student in the district
   * @param {string} sourcedId sourcedId of the student
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getStudent(sourcedId, urlParams = {}) {
    const resource = `/students/${sourcedId}`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all classes in the district in which student is enrolled
   * @param {string} sourcedId sourcedId of the student
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getClassesForStudent(sourcedId, urlParams = {}) {
    const resource = `/students/${sourcedId}/classes`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }

}

exports.StudentsManagement = StudentsManagement;