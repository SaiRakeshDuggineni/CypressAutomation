Feature: Validating User-controller microservice

    @user-delete 
    Scenario: To validate GET method for User-Controller microservice
		Given Execute POST API to create a random User without optional fields to create User
        Then Validate POST status_code for "success" 
        Given Execute GET API to list all users
        Then Validate GET status_code for "success"
        Given Execute GET API to fetch specific User with userId
        Then Validate GET status_code for "success" 
        Given Execute GET API to fetch specific User with incorrect userId of length 9
        Then Validate GET status_code for "failure" for incorrect "userId"
        Then Validate GET error_code for "errorCodeNotFound"

    @user-delete 
    Scenario: To validate POST method to create a User without optional fields for User-Controller microservice
        Given Execute POST API to create a random User without optional fields to create User
        Then Validate POST status_code for "success"
        Then Validate created User exist in the list

    @user-delete
    Scenario: To validate POST method for duplicate User name
		Given Execute POST API to create a random User without optional fields to create User
        Then Validate POST status_code for "success" 
        Given Execute POST API to create User with existing userName to validate duplicate
        Then Validate POST status_code for "invalidData"
        Then Validate POST error_code for "errorCodeDuplicateEntry"

    # @user-delete
    # Scenario: To validate POST method to create a User without providing mandatory fields for User-Controller microservice      
    #     Given Execute POST API to create a User without providing "tenantId"
    #     Then Validate POST status_code for missing mandatory field "Tenant Id"
    #     Then Validate POST error_code for "errorCodeBadRequest"
    #     Given Execute POST API to create a User without providing "user"
    #     Then Validate POST status_code for missing mandatory field "user"
    #     Then Validate POST error_code for "errorCodeBadRequest"

    
    @user-delete 
    Scenario: To validate POST method for verifying attributes permissible length 
        Given Execute POST API to create a User with "externalUserId" more than 128 characters
        Then Validate POST status_code for "invalidData" value of payload
        Then Validate POST error_code for "errorCodeUnprocessableEntity"
        Given Execute POST API to create a User with "firstName" more than 64 characters
        Then Validate POST status_code for "invalidData" value of payload
        Then Validate POST error_code for "errorCodeUnprocessableEntity"
        Given Execute POST API to create a User with "lastName" more than 64 characters
        Then Validate POST status_code for "invalidData" value of payload
        Then Validate POST error_code for "errorCodeUnprocessableEntity"
        # Given Execute POST API to create a User with "email" more than 64 characters
        # Then Validate POST status_code for "invalidData" value of payload
        # Then Validate POST error_code for "errorCodeUnprocessableEntity"

   @user-delete @only
    Scenario: To validate DELETE method for User-Controller microservice
        Given Execute POST API to create a random User without optional fields to create User
        Then Validate POST status_code for "success"
        Then Validate created User exist in the list
        Then Execute DELETE API to delete specific User
        Then Validate DELETE status_code for "success"
        Then Validate deleted User does not exist in the list
    
    Scenario: To validate DELETE method using incorrect userId for User-Controller microservice   
        Given Execute DELETE API to delete specific User with incorrect userId of length 9
        Then Validate DELETE status_code for "failure" for incorrect "userId"
        Then Validate DELETE error_code for "errorCodeNotFound"

   @user-delete
    Scenario: To validate PATCH method for User-Controller microservice
        Given Execute POST API to create a random User without optional fields to create User
        Then Validate POST status_code for "success"
        Given Execute PATCH API to update specific User without optional fields
        Then Validate PATCH status_code for "success"  
        Given Execute PATCH API for incorrect userId
        Then Validate PATCH status_code for "failure" for incorrect "userId"
        Then Validate PATCH error_code for "errorCodeNotFound"
        Given Execute PATCH API for User controller non payload field
        Then Validate PATCH status_code for "failure" for non payload field
        Then Validate PATCH error_code for "errorCodeBadRequest"
        
   @user-delete
    Scenario: To validate PUT method for User-Controller microservice
        Given Execute POST API to create a random User without optional fields to create User
        Then Validate POST status_code for "success"
        Given Execute PUT API to update specific User without optional fields
        Then Validate PUT status_code for "success"  
        Given Execute PUT API for incorrect userId of length 9
        Then Validate PUT status_code for "failure" for incorrect "userId"
        Then Validate PUT error_code for "errorCodeNotFound"
