"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GradingPeriodsManagement = void 0;

class GradingPeriodsManagement {
  constructor(oneRosterApi) {
    this.oneRosterApi = oneRosterApi;
  }
  /**
   * Get all grading periods for the district
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getAllGradingPeriods(urlParams = {}) {
    const resource = `/gradingPeriods`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }
  /**
   * Get specific grading period in the district
   * @param {string} sourcedId sourcedId of the grading period
   * @param  {object} urlParams url parameters (limit | offset | filter | sort)
   */


  getGradingPeriod(sourcedId, urlParams = {}) {
    const resource = `/gradingPeriods/${sourcedId}`;
    return this.oneRosterApi.makeRosterRequest(resource, urlParams);
  }

}

exports.GradingPeriodsManagement = GradingPeriodsManagement;