export class AcademicSessionsManagement{
    constructor(oneRosterApi)
    {
       this.oneRosterApi = oneRosterApi;
    }

    /**
     * Get All academic sessions for the district
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getAllAcademicSessions(urlParams)
    {
        const resource = `/academicSessions`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }
    
    /**
     * Get a particular academic session for the district
     * @param {string} sourcedId sourcedId of the academic session
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getAcademicSession(sourcedId, urlParams)
    {
        const resource = `/academicSessions/${sourcedId}`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }
}
