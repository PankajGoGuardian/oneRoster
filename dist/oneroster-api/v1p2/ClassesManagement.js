"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassesManagement = void 0;

class ClassesManagement {
  constructor(oneRosterApi) {
    this.oneRosterApi = oneRosterApi;
  }
  /**
   * Get all classes in the district
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getAllClasses(urlParams = {}) {
    const resource = `/classes`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get a particular class in district
   * @param {string} sourcedId sourcedId of the class
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getClass(sourcedId, urlParams = {}) {
    const resource = `/classes/${sourcedId}`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all students in a class 
   * @param {string} sourcedId sourcedId of the class
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getStudentsForClass(sourcedId, urlParams = {}) {
    const resource = `/classes/${sourcedId}/students`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all teachers in class
   * @param {string} sourcedId sourcedId of the class
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getTeachersForClass(sourcedId, urlParams = {}) {
    const resource = `/classes/${sourcedId}/teachers`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }

}

exports.ClassesManagement = ClassesManagement;