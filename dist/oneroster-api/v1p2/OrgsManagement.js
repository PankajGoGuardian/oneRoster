"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrgsManagement = void 0;

class OrgsManagement {
  constructor(oneRosterApi) {
    this.oneRosterApi = oneRosterApi;
  }
  /**
   * Get all organisations in the district
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getAllOrgs(urlParams = {}) {
    const resource = `/orgs`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get specific organisation in the district
   * @param {string} sourcedId sourcedId of the organisation
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getOrg(sourcedId, urlParams = {}) {
    const resource = `/orgs/${sourcedId}`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }

}

exports.OrgsManagement = OrgsManagement;