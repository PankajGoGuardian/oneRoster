"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersManagement = void 0;

class UsersManagement {
  constructor(oneRosterApi) {
    this.oneRosterApi = oneRosterApi;
  }
  /**
   * Get all the users in the district
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getAllUsers(urlParams = {}) {
    const resource = `/users`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get a specific user in the district
   * @param {string} sourcedId sourcedId of the user
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getUser(sourcedId, urlParams = {}) {
    const resource = `/users/${sourcedId}`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get all classes for a user in which he is enrolled
   * @param {string} sourcedId sourcedId of the user
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getClassesForUser(sourcedId, urlParams = {}) {
    const resource = `/users/${sourcedId}/classes`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }

}

exports.UsersManagement = UsersManagement;