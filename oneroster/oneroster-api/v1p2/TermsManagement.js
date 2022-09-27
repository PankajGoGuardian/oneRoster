export class TermsManagement
{
    constructor(oneRosterApi)
    {
       this.oneRosterApi = oneRosterApi;
    }

    /**
     * Get a all terms in the district
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getAllTerms(urlParams = {})
    {
        const resource = `/terms`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }
    
    /**
     * Get a specific term in the district
     * @param {string} sourcedId sourcedId of the term
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getTerm(sourcedId, urlParams = {})
    {
        const resource = `/terms/${sourcedId}`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }
    
    /**
     * Get all terms for a class in the district
     * @param {string} sourcedId sourcedId of the class
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getClassesForTerm(sourcedId, urlParams = {})
    {
        const resource = `/terms/${sourcedId}/classes`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }
    
    /**
     * Get grading periods for a term in the district
     * @param {string} sourcedId sourcedId of the term
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getGradingPeriodsForTerm(sourcedId, urlParams = {})
    {
        const resource = `/terms/${sourcedId}/gradingPeriods`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }
}