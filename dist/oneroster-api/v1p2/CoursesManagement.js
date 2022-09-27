"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoursesManagement = void 0;

class CoursesManagement {
  constructor(oneRosterApi) {
    this.oneRosterApi = oneRosterApi;
  }
  /**
   * Get all courses for the district
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getAllCourses(urlParams = {}) {
    const resource = `/courses`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get a course in district
   * @param {string} sourcedId sourcedId of the course
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getCourse(sourcedId, urlParams = {}) {
    const resource = `/courses/${sourcedId}`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all classes having this course
   * @param {string} sourcedId sourcedId of the course
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getClassesForCourse(sourcedId, urlParams = {}) {
    const resource = `/courses/${sourcedId}/classes`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }

}

exports.CoursesManagement = CoursesManagement;