export class EnrollmentsManagement
{
    constructor(oneRosterApi)
    {
       this.oneRosterApi = oneRosterApi;
    }
    
    /**
     * Get all enrollments in the district
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getAllEnrollments(urlParams = {})
    {
        const resource = `/enrollments`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }

    /**
     * Get specific enrollment
     * @param {string} sourcedId sourcedId of the enrollment
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getEnrollment(sourcedId, urlParams = {})
    {
        const resource = `/enrollments/${sourcedId}`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }
}