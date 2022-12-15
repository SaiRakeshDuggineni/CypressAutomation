Feature:Validating tenant-product-controller microservice

    @tenant-delete  @product-delete
    Scenario: To validate PUT method for establishing relationship between tenant and product
        Given Execute PUT API for establishing tenant and product relationship
        Then Validate PUT status_code for "junctionTableSuccess"

    @tenant-delete  @product-delete
    Scenario: To validate Delete method for deleting relationship between tenant and product
        Given Execute PUT API for establishing tenant and product relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Given Execute DELETE API for deleting tenant and product relationship
        Then Validate DELETE status_code for "success"

    @product-delete
    Scenario: To validate PUT method for establishing relationship between non existing tenant and existing product
        Given Execute PUT API for non-existing tenant and existing product
        Then Validate PUT status_code for "failure"

    @tenant-delete
    Scenario: To validate PUT method for establishing relationship between existing tenant and non-existing product
        Given Execute PUT API for existing tenant and non-existing product
        Then Validate PUT status_code for "failure"

    @tenant-delete @product-delete
    Scenario: To validate GET method for fetching list of tenants for a given product id where relationship exists
        Given Execute PUT API for establishing tenant and product relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Given Execute GET API for fetching the list of tenants for a given product id
        Then Validate GET status_code for "success"

    @tenant-delete @product-delete
    Scenario: To validate GET method for fetching list of tenants for a given product id where relationship doesn't exist
        Given Execute POST API to create a product with random product id without optional fields
        Then Validate POST status_code for "success"
        Given Execute GET API for fetching the list of tenants for a given product id where relationship doesn't exist
        Then Validate GET status_code for "failure"


    @tenant-delete @product-delete
    Scenario: To validate GET method for fetching specific tenant for a given product id
        Given Execute PUT API for establishing tenant and product relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Given Execute GET API for fetching specific tenant for a given product id
        Then Validate GET status_code for "success"

    @product-delete
    Scenario: To validate Delete method to delete tenant used for tenant and product relationship , Then entry for the corresponding relationship should be deleted in the relationship table
        Given Execute PUT API for establishing tenant and product relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Then Execute DELETE API to delete specific Tenant
        Then Validate DELETE status_code for "success"
        Given Execute GET API for fetching specific tenant for a given product id
        Then Validate GET status_code for "failure"

    @tenant-delete
    Scenario: To validate Delete method to delete product used for tenant and product relationship , Then entry for the corresponding relationship should be deleted in the relationship table
        Given Execute PUT API for establishing tenant and product relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Then Execute DELETE API to delete specific product
        Then Validate DELETE status_code for "success"
        Given Execute GET API for fetching specific tenant for a given product id
        Then Validate GET status_code for "failure"


    # product-tenant-controller API


    @tenant-delete @product-delete
    Scenario: To validate GET method for fetching list of products for a given tenant id where relationship exists
        Given Execute PUT API for establishing tenant and product relationship
        Then Validate PUT status_code for "junctionTableSuccess"
        Given Execute GET API for fetching the list of products for a given tenant id
        Then Validate GET status_code for "success"


    @tenant-delete @product-delete
    Scenario: To validate GET method for fetching list of products for a given tenant id where relationship doesn't exist
        Given Execute POST API to create a random Tenant without optional fields
        Then Validate POST status_code for "success"
        Given Execute GET API for fetching the list of products for a given tenant id where relationship doesn't exist
        Then Validate GET status_code for "failure"




