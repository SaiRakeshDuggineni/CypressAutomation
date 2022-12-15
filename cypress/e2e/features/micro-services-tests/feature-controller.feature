Feature:Validating Session-controller microservice

    @feature-delete
    Scenario: To validate GET method for Feature-Controller microservice
		Given Execute POST API to create a random Feature without optional fields to create Feature
        Then Validate POST status_code for "success" 
        Given Execute GET API to list all Features
        Then Validate GET status_code for "success"
        Given Execute GET API to fetch specific Feature with FeatureId
        Then Validate GET status_code for "success" 
        Given Execute GET API to fetch specific Feature with incorrect FeatureId of length 9
        Then Validate GET status_code for "failure" for incorrect "FeatureId"
        Then Validate GET error_code for "errorCodeNotFound"

    @feature-delete
    Scenario: To validate POST method to create a Feature without optional fields for Feature-Controller microservice
        Given Execute POST API to create a random Feature without optional fields to create Feature
        Then Validate POST status_code for "success"
        Then Validate created Feature exist in the list

    @feature-delete
    Scenario: To validate POST method for duplicate Feature name
		Given Execute POST API to create a random Feature without optional fields to create Feature
        Then Validate POST status_code for "success" 
        Given Execute POST API to create Feature with existing FeatureName to validate duplicate
        Then Validate POST status_code for "invalidData"
        Then Validate POST error_code for "errorCodeDuplicateEntry"

    @feature-delete
    Scenario: To validate POST method to create a Feature without providing mandatory fields for Feature-Controller microservice      
        Given Execute POST API to create a Feature without providing "productId"
        Then Validate POST status_code for missing mandatory field "Product Id"
        Then Validate POST error_code for "errorCodeBadRequest"
        Given Execute POST API to create a Feature without providing "feature"
        Then Validate POST status_code for missing mandatory field "feature"
        Then Validate POST error_code for "errorCodeBadRequest"

    
    @feature-delete
    Scenario: To validate POST method for verifying attributes permissible length 
        Given Execute POST API to create a Feature with "feature" more than 255 characters
        Then Validate POST status_code for "invalidData" value of payload
        Then Validate POST error_code for "errorCodeUnprocessableEntity"


   @feature-delete
    Scenario: To validate DELETE method for Feature-Controller microservice
        Given Execute POST API to create a random Feature without optional fields to create Feature
        Then Validate POST status_code for "success"
        Then Validate created Feature exist in the list
        Then Execute DELETE API to delete specific Feature
        Then Validate DELETE status_code for "success"
        Then Validate deleted Feature does not exist in the list
    
    Scenario: To validate DELETE method using incorrect featureId for Feature-Controller microservice   
        Given Execute DELETE API to delete specific Feature with incorrect featureId of length 9
        Then Validate DELETE status_code for "failure" for incorrect "featureId"
        Then Validate DELETE error_code for "errorCodeNotFound"

   @feature-delete
    Scenario: To validate PATCH method for Feature-Controller microservice
        Given Execute POST API to create a random Feature without optional fields to create Feature
        Then Validate POST status_code for "success"
        Given Execute PATCH API to update specific Feature without optional fields
        Then Validate PATCH status_code for "success"  
        Given Execute PATCH API for incorrect featureId
        Then Validate PATCH status_code for "failure" for incorrect "featureId"
        Then Validate PATCH error_code for "errorCodeNotFound"
        Given Execute PATCH API for Feature controller non payload field
        Then Validate PATCH status_code for "failure" for non payload field
        Then Validate PATCH error_code for "errorCodeBadRequest"
        
   @feature-delete
    Scenario: To validate PUT method for Feature-Controller microservice
        Given Execute POST API to create a random Feature without optional fields to create Feature
        Then Validate POST status_code for "success"
        Given Execute PUT API to update specific Feature without optional fields
        Then Validate PUT status_code for "success"  
        Given Execute PUT API for incorrect featureId of length 9
        Then Validate PUT status_code for "failure" for incorrect "featureId"
        Then Validate PUT error_code for "errorCodeNotFound"
