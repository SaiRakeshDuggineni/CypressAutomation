Feature:Validating Server-controller microservice

    @server-delete 
    Scenario: To validate GET method for Server-Controller microservice
        Given Execute POST API to create a random Server without optional fields 
        Then Validate POST status_code for "success" 
        Given Execute GET API to list all Servers
        Then Validate GET status_code for "success"
        Given Execute GET API to fetch specific Server with ServerID
        Then Validate GET status_code for "success" 
        Given Execute GET API to fetch specific Server with incorrect ServerID of length 9
        Then Validate GET status_code for "failure" for incorrect "ServerID"
        Then Validate GET error_code for "errorCodeNotFound"

    @server-delete
    Scenario: To validate POST method to create a Server without optional fields for Server-Controller microservice
        Given Execute POST API to create a random Server without optional fields 
        Then Validate POST status_code for "success"  
        Then Validate created Server exist in the list
        Then Validate all the optional field values in Server post response

    @server-delete 
    Scenario: To validate POST method for duplicate server name
        Given Execute POST API to create a random Server without optional fields 
        Then Validate POST status_code for "success"
        Given Execute POST API to create server with existing Server Name to validate duplicate
        Then Validate POST status_code for "invalidData"
        Then Validate POST error_code for "errorCodeDuplicateEntry"


    @server-delete
    Scenario: To validate POST method to create a Server without providing mandatory fields for Server-Controller microservice      
        Given Execute POST API to create a server without providing "name"
        Then Validate POST status_code for missing mandatory field "Server Name"
        Given Execute POST API to create a server without providing "type"
        Then Validate POST status_code for missing mandatory field "Type"
        Given Execute POST API to create a server without providing "url"
        Then Validate POST status_code for missing mandatory field "Url"
    
    @server-delete
    # # Bug :  Count of number of character
    Scenario: To validate POST method for verifying attributes permissible length 
        Given Execute POST API to create a server with "name" more than 32 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a server with "type" more than 32 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a server with "url" more than 512 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a server with "driver" more than 64 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a server with "user" more than 64 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a server with "password" more than 64 characters
        Then Validate POST status_code for "invalidData" value of payload
        Then Validate POST error_code for "errorCodeUnprocessableEntity"

   
   @server-delete
    Scenario: To validate DELETE method for Server-Controller microservice
        Given Execute POST API to create a random Server without optional fields 
        Then Validate POST status_code for "success"  
        Then Validate created Server exist in the list
        Then Execute DELETE API to delete specific Server 
        Then Validate DELETE status_code for "success"
        Then Validate deleted Server does not exist in the list
    
    Scenario: To validate DELETE method using incorrect ServerID for Server-Controller microservice   
        Given Execute DELETE API to delete specific Server with incorrect ServerID of length 9
        Then Validate DELETE status_code for "failure" for incorrect "ServerID"
        Then Validate DELETE error_code for "errorCodeNotFound"

    @server-delete
    Scenario: To validate PATCH method for Server-Controller microservice
        Given Execute POST API to create a random Server without optional fields
        Then Validate POST status_code for "success"  
        Given Execute PATCH API to update specific Server without optional fields 
        Then Validate PATCH status_code for "success"  
        Given Execute PATCH API for incorrect ServerID
        Then Validate PATCH status_code for "failure" for incorrect "ServerID"
        Given Execute PATCH API for non payload field for Server data service
        Then Validate PATCH status_code for "failure" for non payload field
        Then Validate PATCH error_code for "errorCodeBadRequest"
        
        
    @server-delete 
    Scenario: To validate PUT method for Server-Controller microservice
        Given Execute POST API to create a random Server without optional fields
        Then Validate POST status_code for "success"  
        Given Execute PUT API to update specific Server without optional fields
        Then Validate PUT status_code for "success"  
        Given Execute PUT API for incorrect ServerID of length 9
        Then Validate PUT status_code for "failure" for incorrect "ServerID"
        Then Validate PUT error_code for "errorCodeNotFound"