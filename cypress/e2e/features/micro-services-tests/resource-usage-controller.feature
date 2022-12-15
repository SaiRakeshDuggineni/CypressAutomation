Feature:Validating Resource-Usage-controller microservice

    @resourceusage-delete
    Scenario: To validate GET method for Resource-Usage-Controller microservice
        Given Execute POST API to create a random ResourceUsage without optional fields 
        Then Validate POST status_code for "success" 
        Given Execute GET API to list all ResourceUsages
        Then Validate GET status_code for "success"
        Given Execute GET API to fetch specific ResourceUsage with ResourceUsageID
        Then Validate GET status_code for "success" 
        Given Execute GET API to fetch specific ResourceUsage with incorrect ResourceUsageID of length 9
        Then Validate GET status_code for "failure" for incorrect "ResourceID"
        Then Validate GET error_code for "errorCodeNotFound"

    @resourceusage-delete
    Scenario: To validate POST method to create a ResourceUsage without optional fields for ResourceUsage-Controller microservice
        Given Execute POST API to create a random ResourceUsage without optional fields 
        Then Validate POST status_code for "success" 
        Then Validate all the optional field values in ResourceUsage post response
        Then Validate created ResourceUsage exist in the list

    @resourceusage-delete
    Scenario: To validate POST method to create a resourceUsage without providing mandatory fields for ResourceUsage-Controller microservice      
        Given Execute POST API to create a resourceUsage without providing "resourceId"
        Then Validate POST status_code for missing mandatory field "resourceId" 
        Then Validate POST error_code for "errorCodeBadRequest"
        Given Execute POST API to create a resourceUsage without providing "tenantId"
        Then Validate POST status_code for missing mandatory field "tenantId" 
        Then Validate POST error_code for "errorCodeBadRequest"

    @resourceusage-delete
    Scenario: To validate POST method to create resourceUsage with incorrect attributes
        Given Execute POST API to create a resourceUsage with incorrect "tenantId"
        Then Validate POST status_code for "invalidData" value of payload
        Then Validate POST error_code for "errorCodeUnprocessableEntity"
        Given Execute POST API to create a resourceUsage with incorrect "resourceId"
        Then Validate POST status_code for "invalidData" value of payload
        Then Validate POST error_code for "errorCodeUnprocessableEntity"

    @resourceusage-delete 
    Scenario: To validate PUT method for ResourceUsage-Controller microservice with incorrect tenantId
        Given Execute POST API to create a random ResourceUsage without optional fields 
        Then Validate POST status_code for "success"
        Given Execute PUT API to update specific ResourceUsage with incorrect tenantId
        Then Validate PUT status_code for "invalidData"
        Then Validate PUT error_code for "errorCodeUnprocessableEntity"

    @resourceusage-delete 
    Scenario: To validate PUT method for ResourceUsage-Controller microservice with incorrect resourceId
        Given Execute POST API to create a random ResourceUsage without optional fields 
        Then Validate POST status_code for "success"
        Given Execute PUT API to update specific ResourceUsage with incorrect resourceId
        Then Validate PUT status_code for "invalidData"
        Then Validate PUT error_code for "errorCodeUnprocessableEntity"
 
    @resourceusage-delete
    Scenario: To validate PUT method for ResourceUsage-Controller microservice with another resourceId
        Given Execute POST API to create a random ResourceUsage without optional fields 
        Then Validate POST status_code for "success"
        Given Execute PUT API to update specific ResourceUsage with another resourceId
        Then Validate PUT status_code for "success"
 
    @resourceusage-delete
    Scenario: To validate PUT method for ResourceUsage-Controller microservice with incorrect resourceusageId
        Given Execute POST API to create a random ResourceUsage without optional fields 
        Then Validate POST status_code for "success"
        Given Execute PUT API for incorrect ResourceUsageID of length 9
        Then Validate PUT status_code for "failure" for incorrect "ResourceusageID"
        Then Validate PUT error_code for "errorCodeNotFound"
    
    @resourceusage-delete 
    Scenario: To validate PATCH method for ResourceUsage-Controller microservice with incorrect tenantId
        Given Execute POST API to create a random ResourceUsage without optional fields 
        Then Validate POST status_code for "success"
        Given Execute PATCH API to update specific ResourceUsage with incorrect tenantId
        Then Validate PATCH status_code for "invalidData"
        Then Validate PATCH error_code for "errorCodeUnprocessableEntity"

    @resourceusage-delete 
    Scenario: To validate PATCH method for ResourceUsage-Controller microservice with incorrect resourceId
        Given Execute POST API to create a random ResourceUsage without optional fields 
        Then Validate POST status_code for "success"
        Given Execute PATCH API to update specific ResourceUsage with incorrect resourceId
        Then Validate PATCH status_code for "invalidData"
        Then Validate PATCH error_code for "errorCodeUnprocessableEntity"

    @resourceusage-delete
    Scenario: To validate PATCH method for ResourceUsage-Controller microservice with another resourceId
        Given Execute POST API to create a random ResourceUsage without optional fields 
        Then Validate POST status_code for "success"
        Given Execute PATCH API to update specific ResourceUsage with another resourceId
        Then Validate PATCH status_code for "success"
 
    @resourceusage-delete
    Scenario: To validate PATCH method for ResourceUsage-Controller microservice with incorrect resourceusageId
        Given Execute POST API to create a random ResourceUsage without optional fields 
        Then Validate POST status_code for "success"
        Given Execute PATCH API for incorrect ResourceUsageID of length 9
        Then Validate PATCH status_code for "failure" for incorrect "ResourceusageID"
        Then Validate PATCH error_code for "errorCodeNotFound"        
