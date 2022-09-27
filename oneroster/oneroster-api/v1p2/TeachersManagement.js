export class TeachersManagement
{
    constructor(oneRosterApi)
    {
       this.oneRosterApi = oneRosterApi;
    }

    /**
     * Get all teachers in the district
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getAllTeachers(urlParams = {})
    {
        const resource = `/teachers`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }
    
    /**
     * Get a specific teacher in the district
     * @param {string} sourcedId sourcedId of the student
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getTeacher(sourcedId, urlParams = {})
    {
        const resource = `/teachers/${sourcedId}`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }
    
    /**
     * Get all classes in the district in which teacher is enrolled
     * @param {string} sourcedId sourcedId of the teacher
     * @param  {object} urlParams url parameters (limit | offset | filter | sort)
     */
    getClassesForTeacher(sourcedId, urlParams = {})
    {
        const resource = `/teachers/${sourcedId}/classes`;
        return this.oneRosterApi.makeRosterRequest(resource, urlParams)
    }
}
