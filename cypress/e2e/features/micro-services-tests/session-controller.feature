Feature:Validating Session-controller microservice

    @session-delete 
    Scenario: To validate GET method for Session-Controller microservice
		Given Execute POST API to create a random Session without optional fields to create session
        Then Validate POST status_code for "success" 
        Given Execute GET API to list all Session
        Then Validate GET status_code for "success"
        Given Execute GET API to fetch specific Session with SessionID
        Then Validate GET status_code for "success" 
        Given Execute GET API to fetch specific Session with incorrect SessionID of length 9
        Then Validate GET status_code for "failure" for incorrect "SessionId"

    @session-delete 
    Scenario: To validate POST method to create a session without optional fields for session-Controller microservice
        Given Execute POST API to create a random Session without optional fields to create session
        Then Validate POST status_code for "success"
        Then Validate created Session exist in the list
        Then Validate all the optional field values in Session post response

    @session-delete
    Scenario: To validate POST method for duplicate session name
		Given Execute POST API to create a random Session without optional fields to create session
        Then Validate POST status_code for "success" 
        Given Execute POST API to create session with existing bearerTokenHash to validate duplicate
        Then Validate POST status_code for "invalidData"

    @session-delete 
    Scenario: To validate POST method to create a session without providing mandatory fields for Session-Controller microservice      
        Given Execute POST API to create a session without providing "tenantName"
        Then Validate POST status_code for missing mandatory field "Tenant Name"
        Given Execute POST API to create a session without providing "tenantId"
        Then Validate POST status_code for missing mandatory field "Tenant Id"
		Given Execute POST API to create a session without providing "userId"
        Then Validate POST status_code for missing mandatory field "User Id"
		Given Execute POST API to create a session without providing "productId"
        Then Validate POST status_code for missing mandatory field "Product Id"
    
    @session-delete 
    Scenario: To validate POST method for verifying attributes permissible length 
        Given Execute POST API to create a session with "tenantName" more than 32 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a session with "externalUserId" more than 128 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a session with "externalGroupId" more than 64 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a session with "message" more than 512 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a session with "endPointUrl" more than 128 characters
        Then Validate POST status_code for "invalidData" value of payload
# 		#bearerToken 
# 		#lastActivityUrl


    @session-delete 
    Scenario: To validate DELETE method for Session-Controller microservice
        Given Execute POST API to create a random Session without optional fields to create session
        Then Validate POST status_code for "success"
        Then Validate created Session exist in the list
        Then Execute DELETE API to delete specific Session 
        Then Validate DELETE status_code for "success"
        Then Validate deleted Session does not exist in the list
    

    Scenario: To validate DELETE method using incorrect SessionId for Session-Controller microservice   
        Given Execute DELETE API to delete specific Session with incorrect SessionId of length 9
        Then Validate DELETE status_code for "failure" for incorrect "SessionID"

    @session-delete 
    Scenario: To validate PATCH method for Session-Controller microservice
        Given Execute POST API to create a random Session without optional fields to create session
        Then Validate POST status_code for "success"
        Given Execute PATCH API to update specific Session without optional fields 
        Then Validate PATCH status_code for "success"  
        Given Execute PATCH API for incorrect SessionId
        Then Validate PATCH status_code for "failure" for incorrect "SessionId"
        Given Execute PATCH API for session controller non payload field 
        Then Validate PATCH status_code for "failure" for non payload field
        
    @session-delete 
    Scenario: To validate PUT method for Session-Controller microservice
        Given Execute POST API to create a random Session without optional fields to create session
        Then Validate POST status_code for "success"
        Given Execute PUT API to update specific Session without optional fields
        Then Validate PUT status_code for "success"  
        Given Execute PUT API for incorrect SessionId of length 9
        Then Validate PUT status_code for "failure" for incorrect "SessionID"
   
   #Commented are the bugs need to discuss with the dev 
    @session-delete 
    Scenario: To validate GET method for queried URLs
        Given Execute POST API to create a random Session without optional fields to create session
        Then Validate POST status_code for "success"
        Given Execute queried GET API on Session controller on attribute "bearerTokenHash" with operator as "=="
        Then Validate GET status_code for "success"
        # Then Validate the queried value for "==" operator in Session Controller
        # Then Validate the queried value for bearerTokenHash and count
        # Given Execute queried GET API on Session controller on attribute "Status" with operator as "=="
        # Then Validate GET status_code for "success"
        # Then Validate the queried value for "!=" not equal operator in Session Controller 
        # Given Execute multiple queried GET API on Session controller on attribute "bearerTokenHash" and "Status" with operator as "==" and "=="
        # Then Validate GET status_code for "success"
        # Then Validate the queried value for bearerTokenHash and Status