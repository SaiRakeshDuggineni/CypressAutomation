Feature: Validating Group-controller microservice

    @Group-delete 
    Scenario: To validate GET method for Group-Controller microservice
		Given Execute POST API to create a random Group without optional fields to create Group
        Then Validate POST status_code for "success" 
        Given Execute GET API to list all Groups
        Then Validate GET status_code for "success"
        Given Execute GET API to fetch specific Group with GroupId
        Then Validate GET status_code for "success" 
        Given Execute GET API to fetch specific Group with incorrect GroupId of length 9
        Then Validate GET status_code for "failure" for incorrect "GroupId"
        Then Validate GET error_code for "errorCodeNotFound"

    @Group-delete 
    Scenario: To validate POST method to create a Group without optional fields for Group-Controller microservice
        Given Execute POST API to create a random Group without optional fields to create Group
        Then Validate POST status_code for "success"
        Then Validate created Group exist in the list

    @Group-delete
    Scenario: To validate POST method for duplicate Group name
		Given Execute POST API to create a random Group without optional fields to create Group
        Then Validate POST status_code for "success" 
        Given Execute POST API to create Group with existing GroupName to validate duplicate
        Then Validate POST status_code for "invalidData"
        Then Validate POST error_code for "errorCodeDuplicateEntry"

    @Group-delete
    Scenario: To validate POST method to create a Group without providing mandatory fields for Group-Controller microservice      
        Given Execute POST API to create a Group without providing "tenantId"
        Then Validate POST status_code for missing mandatory field "Tenant Id"
        Then Validate POST error_code for "errorCodeBadRequest"
        Given Execute POST API to create a Group without providing "groupName"
        Then Validate POST status_code for missing mandatory field "Group"
        Then Validate POST error_code for "errorCodeBadRequest"

    
    @Group-delete 
    # Scenario: To validate POST method for verifying attributes permissible length 
    #     Given Execute POST API to create a Group with "externalGroupId" more than 128 characters
    #     Then Validate POST status_code for "invalidData" value of payload
    #     Then Validate POST error_code for "errorCodeUnprocessableEntity"
    #     Given Execute POST API to create a Group with "firstName" more than 64 characters
    #     Then Validate POST status_code for "invalidData" value of payload
    #     Then Validate POST error_code for "errorCodeUnprocessableEntity"
    #     Given Execute POST API to create a Group with "lastName" more than 64 characters
    #     Then Validate POST status_code for "invalidData" value of payload
    #     Then Validate POST error_code for "errorCodeUnprocessableEntity"
        # Given Execute POST API to create a Group with "email" more than 64 characters
        # Then Validate POST status_code for "invalidData" value of payload
        # Then Validate POST error_code for "errorCodeUnprocessableEntity"

   @Group-delete
    Scenario: To validate DELETE method for Group-Controller microservice
        Given Execute POST API to create a random Group without optional fields to create Group
        Then Validate POST status_code for "success"
        Then Validate created Group exist in the list
        Then Execute DELETE API to delete specific Group
        Then Validate DELETE status_code for "success"
        Then Validate deleted Group does not exist in the list
    
    Scenario: To validate DELETE method using incorrect GroupId for Group-Controller microservice   
        Given Execute DELETE API to delete specific Group with incorrect GroupId of length 9
        Then Validate DELETE status_code for "failure" for incorrect "GroupId"
        Then Validate DELETE error_code for "errorCodeNotFound"

   @Group-delete
    Scenario: To validate PATCH method for Group-Controller microservice
        Given Execute POST API to create a random Group without optional fields to create Group
        Then Validate POST status_code for "success"
        Given Execute PATCH API to update specific Group without optional fields
        Then Validate PATCH status_code for "success"  
        Given Execute PATCH API for incorrect GroupId
        Then Validate PATCH status_code for "failure" for incorrect "GroupId"
        Then Validate PATCH error_code for "errorCodeNotFound"
        Given Execute PATCH API for Group controller non payload field
        Then Validate PATCH status_code for "failure" for non payload field
        Then Validate PATCH error_code for "errorCodeBadRequest"
        
   @Group-delete
    Scenario: To validate PUT method for Group-Controller microservice
        Given Execute POST API to create a random Group without optional fields to create Group
        Then Validate POST status_code for "success"
        Given Execute PUT API to update specific Group without optional fields
        Then Validate PUT status_code for "success"  
        Given Execute PUT API for incorrect GroupId of length 9
        Then Validate PUT status_code for "failure" for incorrect "GroupId"
        Then Validate PUT error_code for "errorCodeNotFound"
