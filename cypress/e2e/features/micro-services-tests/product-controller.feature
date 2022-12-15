Feature:Validating product-controller microservice

    @product-delete
    Scenario: To validate GET method for Product-Controller microservice
        Given Execute POST API to create a product with random product name without optional fields 
        Then Validate POST status_code for "success"
        Given Execute GET API to list all products
        Then Validate GET status_code for "success"
        Given Execute GET API to fetch specific product with ProductID
        Then Validate GET status_code for "success"
        Given Execute GET API to fetch specific product with incorrect ProductID
        Then Validate GET status_code for "failure" for incorrect ProductID
        Then Validate GET error_code for "errorCodeNotFound"

    @product-delete
    Scenario: To validate POST method to create a product with default attributes for product-controller microservice
        Given Execute POST API to create a product with random product name without optional fields
        Then Validate POST status_code for "success"
        Then Validate created product exist in the list
        Given Execute POST API to create a product with duplicate product name without optional fields
        Then Validate POST status_code for "invalidData"
        Then Validate POST error_code for "errorCodeDuplicateEntry"

    @product-delete
    Scenario: To validate POST method to create a product without providing mandatory fields for product-controller microservice
        Given Execute POST API to create a product without providing "productName"
        Then Validate POST status_code for missing mandatory field "Product name"
        Then Validate POST error_code for "errorCodeBadRequest"
    
    @product-delete
    #Known and reported bug.
    Scenario: To validate POST method for verifying attributes permissible length
        Given Execute POST API to create a product with "productName" more than 32 characters
        Then Validate POST status_code for "invalidData"
        Then Validate POST error_code for "errorCodeUnprocessableEntity"

    Scenario: To validate POST method for verifying attributes permissible length for optional field
        Given Execute POST API to create a product with optional field "base_url" more than 128 characters
        Then Validate POST status_code for "invalidData"

    @product-delete 
    Scenario: To validate PUT method by modifying specified ProductID for Product-Controller microservice
        Given Execute POST API to create a product with random product name without optional fields 
        Then Validate POST status_code for "success"
        Given Execute PUT API to modify specific product with correct ProductID
        Then Validate PUT status_code for "success" 
        Given Execute PUT API to modify specific product with incorrect ProductID
        Then Validate PUT status_code for "failure" 
        Then Validate PUT error_code for "errorCodeNotFound"

    @product-delete
    Scenario: To validate PATCH method for Product-Controller microservice
        Given Execute POST API to create a product with random product name without optional fields
        Then Validate POST status_code for "success"
        Given Execute PATCH API to update specific Product with mandatory field
        Then Validate PATCH status_code for "success"
        Given Execute PATCH API for incorrect ProductID
        Then Validate PATCH status_code for "failure" for incorrect "ProductID"
        Then Validate PATCH error_code for "errorCodeNotFound"

    @product-delete
    Scenario: To validate Delete method for Product-Controller microservice
        Given Execute POST API to create a product with random product name without optional fields
        Then Validate POST status_code for "success"
        Then Validate created product exist in the list
        Then Execute DELETE API to delete specific product
        Then Validate DELETE status_code for "success"
        Then Validate deleted product does not exist in the list


    @product-delete
    Scenario: To validate Delete method using incorrect ProductID for Product-Controller microservice
        Given Execute DELETE API to delete specific product with incorrect ProductID of length 9
        Then Validate DELETE status_code for "failure" for incorrect ProductID 
        Then Validate DELETE error_code for "errorCodeNotFound"

