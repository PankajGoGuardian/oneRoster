export class DemographicsManagement
{
    constructor(oneRosterApi)
    {
        this.oneRosterApi = oneRosterApi;
    }
    
    /**
     * Get all demographics for the district
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getAllDemographics(urlParams = {})
    {
        const resource = `/demographics`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }

    /**
     * Get specific user's demographic
     * @param {string} sourcedId sourcedId of the user
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getDemographics(sourcedId, urlParams = {})
    {
        const resource = `/demographics/${sourcedId}`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }
}