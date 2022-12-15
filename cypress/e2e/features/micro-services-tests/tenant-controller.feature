Feature:Validating Tenant-controller microservice

   @tenant-delete 
    Scenario: To validate GET method for Tenant-Controller microservice
        Given Execute POST API to create a random Tenant without optional fields 
        Then Validate POST status_code for "success" 
        Given Execute GET API to list all Tenant
        Then Validate GET status_code for "success"
        Given Execute GET API to fetch specific Tenant with TenantID
        Then Validate GET status_code for "success" 
        Given Execute GET API to fetch specific tenant with incorrect TenantID of length 9
        Then Validate GET status_code for "failure" for incorrect "TenantID"    

   @tenant-delete 
    Scenario: To validate POST method to create a Tenant without optional fields for Tenant-Controller microservice
        Given Execute POST API to create a random Tenant without optional fields 
        Then Validate POST status_code for "success"  
        Then Validate created Tenant exist in the list
        Then Validate all the optional field values in Tenant post response

    @tenant-delete 
    Scenario: To validate POST method for duplicate tenant name
        Given Execute POST API to create a random Tenant without optional fields 
        Then Validate POST status_code for "success"
        Given Execute POST API to create tenant with existing Tenant Name to validate duplicate
        Then Validate POST status_code for "invalidData"

    @tenant-delete 
    Scenario: To validate POST method to create a tenant without providing mandatory fields for Tenant-Controller microservice      
        Given Execute POST API to create a tenant without providing "tenantName"
        Then Validate POST status_code for missing mandatory field "tenantName"
        Given Execute POST API to create a tenant without providing "companyName"
        Then Validate POST status_code for missing mandatory field "companyName"
    
    @tenant-delete
    # Bug :  Count of number of character
    Scenario: To validate POST method for verifying attributes permissible length 
        Given Execute POST API to create a tenant with "tenantName" more than 32 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a tenant with "companyName" more than 128 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a tenant with "subsidiaryName" more than 64 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a tenant with "street" more than 128 characters
        Then Validate POST status_code for "invalidData" value of payload
        Given Execute POST API to create a tenant with "city" more than 64 characters
        Then Validate POST status_code for "invalidData" value of payload

   @tenant-delete
    Scenario: To validate DELETE method for Tenant-Controller microservice
        Given Execute POST API to create a random Tenant without optional fields 
        Then Validate POST status_code for "success"  
        Then Validate created Tenant exist in the list
        Then Execute DELETE API to delete specific Tenant 
        Then Validate DELETE status_code for "success"
        Then Validate deleted Tenant does not exist in the list
    
    Scenario: To validate DELETE method using incorrect TenantID for Tenant-Controller microservice   
        Given Execute DELETE API to delete specific Tenant with incorrect TenantID of length 9
        Then Validate DELETE status_code for "failure" for incorrect "TenantID"

    @tenant-delete 
    Scenario: To validate PATCH method for Tenant-Controller microservice
        Given Execute POST API to create a random Tenant without optional fields
        Then Validate POST status_code for "success"  
        Given Execute PATCH API to update specific Tenant without optional fields 
        Then Validate PATCH status_code for "success"  
        Given Execute PATCH API for incorrect TenantID
        Then Validate PATCH status_code for "failure" for incorrect "TenantID"
        Given Execute PATCH API for non payload field for Tenant data service
        Then Validate PATCH status_code for "failure" for non payload field
        
    @tenant-delete 
    Scenario: To validate PUT method for Tenant-Controller microservice
        Given Execute POST API to create a random Tenant without optional fields
        Then Validate POST status_code for "success"  
        Given Execute PUT API to update specific Tenant without optional fields
        Then Validate PUT status_code for "success"  
        Given Execute PUT API for incorrect TenantID of length 9
        Then Validate PUT status_code for "failure" for incorrect "TenantID"
   
    @tenant-delete
    Scenario: To validate GET method for Tenant-RSQL
        Given Execute POST API to create a random Tenant without optional fields
        Then Validate POST status_code for "success"  
        Given Execute queried GET API on tenant controller on attribute "tenantName" with operator as "=="
        Then Validate GET status_code for "success"
        Then Validate the queried value for "==" operator
        Then Validate the queried value for tenantName and count
        Given Execute queried GET API on tenant controller on attribute "tenantName" with operator as "!="
        Then Validate GET status_code for "success"
        Then Validate the queried value for "!=" not equal operator
        Given Execute multiple queried GET API on tenant controller on attribute "tenantName" and "companyName" with operator as "==" and "=="
        Then Validate GET status_code for "success"
        Then Validate the queried value for tenantName and companyName
