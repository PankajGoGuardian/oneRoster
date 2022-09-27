import { AcademicSessionsManagement } from './AcademicSessionsManagement.js'
import { ClassesManagement } from './ClassesManagement.js'
import { CoursesManagement } from './CoursesManagement.js'
import { DemographicsManagement } from './DemographicsManagement.js'
import { EnrollmentsManagement } from './EnrollmentsManagement.js'
import { GradingPeriodsManagement } from './GradingPeriodsManagement.js'
import { OrgsManagement } from './OrgsManagement.js'
import {SchoolsMangement} from './SchoolsManagement.js'
import { StudentsManagement } from './StudentsManagement.js'
import { TeachersManagement } from './TeachersManagement.js'
import { TermsManagement } from './TermsManagement.js'
import { UsersManagement } from './UsersManagement.js'
import OneRoster from '../OneRoster.js'
import OneRoster2 from '../OneRoster2.js'

 /**
 * Class for oneroster v1.2 api call
 * @param {string} baseUrl baseUrl of SIS
 * @param {string} clientId clientId of SIS
 * @param {string} clientSecret clientSecret of SIS
 * @param {boolean} useOAuth2 flag to indicate, use oAuth 2.0 for making request
 * @param {string} tokenUrl tokenUrl of SIS (used for oAuth 2.0) 
 */
export class V1p2Api{
    constructor(baseUrl, clientId, clientSecret, useOAuth2 = false, tokenUrl){
        let oneRosterObj
        if (useOAuth2) {
            oneRosterObj = new OneRoster2(tokenUrl, baseUrl, clientId, clientSecret)
        } else {
            oneRosterObj = new OneRoster(baseUrl, consumerKey, consumerSecret)
        }
        this.academicSessionsManagement = new AcademicSessionsManagement(oneRosterObj)
        this.classesManagement = new ClassesManagement(oneRosterObj)
        this.coursesManagement = new CoursesManagement(oneRosterObj)
        this.demographicsManagement = new DemographicsManagement(oneRosterObj)
        this.enrollmentsManagement = new EnrollmentsManagement(oneRosterObj)
        this.gradingPeriodsManagement = new GradingPeriodsManagement(oneRosterObj)
        this.orgsManagement = new OrgsManagement(oneRosterObj)
        this.schoolsMangement = new SchoolsMangement(oneRosterObj)
        this.studentsManagement = new StudentsManagement(oneRosterObj)
        this.teachersManagement = new TeachersManagement(oneRosterObj)
        this.termsManagement = new TermsManagement(oneRosterObj)
        this.usersManagement = new UsersManagement(oneRosterObj)
    }
}