Feature:Validating product-server-controller microservice

    @product-delete  @server-delete
    Scenario: To validate PUT method for establishing relationship between product and server
        Given Execute PUT API for establishing product and server relationship
        Then Validate PUT status_code for "junctionTableSuccess"

    @product-delete  @server-delete
    Scenario: To validate Delete method for deleting relationship between product and server
        Given Execute PUT API for establishing product and server relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Given Execute DELETE API for deleting product and server relationship
        Then Validate DELETE status_code for "success"

    @server-delete
    Scenario: To validate PUT method for establishing relationship between non existing product and existing server
        Given Execute PUT API for non-existing product and existing server
        Then Validate PUT status_code for "failure"

    @product-delete
    Scenario: To validate PUT method for establishing relationship between existing product and non-existing server
        Given Execute PUT API for existing product and non-existing server
        Then Validate PUT status_code for "failure"

    @product-delete @server-delete
    Scenario: To validate GET method for fetching list of products for a given server id where relationship exists
        Given Execute PUT API for establishing product and server relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Given Execute GET API for fetching the list of products for a given server id
        Then Validate GET status_code for "success"

    @product-delete @server-delete
    Scenario: To validate GET method for fetching list of products for a given server id where relationship doesn't exist
        Given Execute POST API to create a random Server without optional fields
        Then Validate POST status_code for "success"
        Given Execute GET API for fetching the list of products for a given server id where relationship doesn't exist
        Then Validate GET status_code for "failure"


    @product-delete @server-delete
    Scenario: To validate GET method for fetching specific product for a given server id
        Given Execute PUT API for establishing product and server relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Given Execute GET API for fetching specific product for a given server id
        Then Validate GET status_code for "success"

    @server-delete
    Scenario: To validate Delete method to delete product used for product and server relationship , Then entry for the corresponding relationship should be deleted in the relationship table
        Given Execute PUT API for establishing product and server relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Then Execute DELETE API to delete specific product
        Then Validate DELETE status_code for "success"
        Given Execute GET API for fetching specific product for a given server id
        Then Validate GET status_code for "failure"

    @product-delete
    Scenario: To validate Delete method to delete server used for product and server relationship , Then entry for the corresponding relationship should be deleted in the relationship table
        Given Execute PUT API for establishing product and server relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Then Execute DELETE API to delete specific Server
        Then Validate DELETE status_code for "success"
        Given Execute GET API for fetching specific product for a given server id
        Then Validate GET status_code for "failure"


    # server-product-controller API


    @product-delete @server-delete
    Scenario: To validate GET method for fetching list of servers for a given product id where relationship exists
        Given Execute PUT API for establishing product and server relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Given Execute GET API for fetching the list of servers for a given product id
        Then Validate GET status_code for "success"


    @product-delete @server-delete
    Scenario: To validate GET method for fetching list of servers for a given product id where relationship doesn't exist
        Given Execute POST API to create a random product without optional fields
        Then Validate POST status_code for "success"
        Given Execute GET API for fetching the list of servers for a given product id where relationship doesn't exist
        Then Validate GET status_code for "failure"
