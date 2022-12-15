Feature:Validating Resource-controller microservice

   @resource-delete
    Scenario: To validate GET method for Resource-Controller microservice
        Given Execute POST API to create a random Resource without optional fields 
        Then Validate POST status_code for "success"
        Then Validate all the optional field values in Resource post response
        Given Execute GET API to list all Resource
        Then Validate GET status_code for "success"
        Given Execute GET API to fetch specific Resource with ResourceID
        Then Validate GET status_code for "success" 
        Given Execute GET API to fetch specific Resource with incorrect ResourceID of length 9
        Then Validate GET status_code for "failure" for incorrect "ResourceID"
        Then Validate GET error_code for "errorCodeNotFound"


   @resource-delete 
    Scenario: To validate POST method to create a Resource without optional fields for Resource-Controller microservice
        Given Execute POST API to create a random Resource without optional fields 
        Then Validate POST status_code for "success"  
        Then Validate created Resource exist in the list
        Then Validate all the optional field values in Resource post response

   @resource-delete 
    Scenario: To validate POST method for duplicate resource name
        Given Execute POST API to create a random Resource without optional fields 
        Then Validate POST status_code for "success"
        Given Execute POST API to create resource with existing Resource Name to validate duplicate
        Then Validate POST status_code for "invalidData"
        Then Validate POST error_code for "errorCodeDuplicateEntry"

    Scenario: To validate POST method to create a resource without providing mandatory fields for Resource-Controller microservice      
        Given Execute POST API to create a resource without providing "resourceName"
        Then Validate POST status_code for missing mandatory field "resourceName" 
        Then Validate POST error_code for "errorCodeBadRequest"
    
    Scenario: To validate POST method for verifying attributes permissible length 
        Given Execute POST API to create a resource with "resource" more than 128 characters
        Then Validate POST status_code for "invalidData" value of payload
        Then Validate POST error_code for "errorCodeUnprocessableEntity"
        Given Execute POST API to create a resource with "type" more than 64 characters
        Then Validate POST status_code for "invalidData" value of payload
        Then Validate POST error_code for "errorCodeUnprocessableEntity"
        Given Execute POST API to create a resource with "category" more than 64 characters
        Then Validate POST status_code for "invalidData" value of payload
        Then Validate POST error_code for "errorCodeUnprocessableEntity"
    
    @resource-delete
    Scenario: To validate DELETE method for Resource-Controller microservice
        Given Execute POST API to create a random Resource without optional fields 
        Then Validate POST status_code for "success"  
        Then Validate created Resource exist in the list
        Then Execute DELETE API to delete specific Resource
        Then Validate DELETE status_code for "success"
        Then Validate deleted Resource does not exist in the list
    
    Scenario: To validate DELETE method using incorrect ResourceID for Resource-Controller microservice   
        Given Execute DELETE API to delete specific Resource with incorrect ResourceID of length 9
        Then Validate DELETE status_code for "failure" for incorrect "ResourceID"
        Then Validate DELETE error_code for "errorCodeNotFound"

    @resource-delete 
    Scenario: To validate PATCH method for Resource-Controller microservice
        Given Execute POST API to create a random Resource without optional fields
        Then Validate POST status_code for "success"  
        Given Execute PATCH API to update specific Resource without optional fields 
        Then Validate PATCH status_code for "success"  
        Given Execute PATCH API for incorrect ResourceID
        Then Validate PATCH status_code for "failure" for incorrect "ResourceID"
        Then Validate PATCH error_code for "errorCodeNotFound"
        Given Execute PATCH API for non payload field for Resource data service
        Then Validate PATCH status_code for "failure" for non payload field
        Then Validate PATCH error_code for "errorCodeBadRequest"
        
    @resource-delete 
    Scenario: To validate PUT method for Resource-Controller microservice
        Given Execute POST API to create a random Resource without optional fields
        Then Validate POST status_code for "success"  
        Given Execute PUT API to update specific Resource without optional fields
        Then Validate PUT status_code for "success"  
        Given Execute PUT API for incorrect ResourceID of length 9
        Then Validate PUT status_code for "failure" for incorrect "ResourceID"
        Then Validate PUT error_code for "errorCodeNotFound"