import { After, Before, Then } from "@badeball/cypress-cucumber-preprocessor";
import BasicAssertions from "../../support/BasicAssertions";
import responseCodes from "../../fixtures/TestData/ResCode.json"
import errorCodes from "../../fixtures/TestData/ErrorCode.json"


const basicAssertions = new BasicAssertions();

Then("Validate GET status_code for {string}", (status) => {
    cy.get('@GETResponse').then((res) => {
        basicAssertions.assertResponseCode(res,responseCodes.GET.codes[status])
    }) })

Then("Validate GET status_code for {string} for incorrect {string}", (status , MicroserviceID) => {
    cy.get('@GETResponse').then((res) => {
        basicAssertions.assertResponseCode(res,responseCodes.GET.codes["failure"])
    }) })

Then("Validate POST status_code for {string} value of payload", (status) => {
        cy.get('@POSTResponse').then((res) => {
        basicAssertions.assertResponseCode(res,responseCodes.POST.codes["invalidData"])
        }) }) 

Then("Validate POST status_code for {string}", (status) => {
    cy.get('@POSTResponse').then((res) => {
    basicAssertions.assertResponseCode(res,responseCodes.POST.codes[status])
    }) }) 

Then("Validate DELETE status_code for {string} for incorrect {string}", (status , MicroserviceID) => {
    cy.get('@DELETEResponse').then((res) => {
    basicAssertions.assertResponseCode(res,responseCodes.DELETE.codes["failure"])
    }) })
    
Then("Validate DELETE status_code for {string}", (status) => {
    cy.get('@DELETEResponse').then((res) => {
        basicAssertions.assertResponseCode(res,responseCodes.DELETE.codes[status])
    }) })

Then("Validate POST status_code for missing mandatory field {string}", (attribute)=>{
cy.get('@POSTResponse').then((res) =>{
    basicAssertions.assertResponseCode(res,responseCodes.POST.codes["failure"])
}) }) 


Then("Validate PATCH status_code for {string}", (status) => {
    cy.get('@PATCHResponse').then((res) => {
    basicAssertions.assertResponseCode(res,responseCodes.PATCH.codes[status])
    }) }) 

Then("Validate PATCH status_code for {string} for incorrect {string}", (status ,microServiceID) => {
    cy.get('@PATCHResponse').then((res) => {
        basicAssertions.assertResponseCode(res,responseCodes.PATCH.codes["failure"])
    }) })

Then("Validate PATCH status_code for {string} for non payload field", (status) => {
    cy.get('@PATCHResponse').then((res) => {
        basicAssertions.assertResponseCode(res,responseCodes.PATCH.codes["InvalidCol"])
    }) })

Then("Validate PUT status_code for {string}", (status) => {
    cy.get('@PUTResponse').then((res) => {
    basicAssertions.assertResponseCode(res,responseCodes.PUT.codes[status])
    }) })    

Then("Validate PUT status_code for {string} for incorrect {string}", (status ,microServiceID) => {
    cy.get('@PUTResponse').then((res) => {
        basicAssertions.assertResponseCode(res,responseCodes.PUT.codes["failure"])
    }) })

Then("Validate POST error_code for {string}", (status) => {
    cy.get('@POSTResponse').then((res) => {
        basicAssertions.assertResponseErrorCode(res,errorCodes.errorCodes[status])
    }) })

Then("Validate GET error_code for {string}", (status) => {
    cy.get('@GETResponse').then((res) => {
        basicAssertions.assertResponseErrorCode(res,errorCodes.errorCodes[status])
    }) })

Then("Validate DELETE error_code for {string}", (status) => {
    cy.get('@DELETEResponse').then((res) => {
        basicAssertions.assertResponseErrorCode(res,errorCodes.errorCodes[status])
    }) })

Then("Validate PUT error_code for {string}", (status) => {
    cy.get('@PUTResponse').then((res) => {
        basicAssertions.assertResponseErrorCode(res,errorCodes.errorCodes[status])
    }) })

Then("Validate PATCH error_code for {string}", (status) => {
    cy.get('@PATCHResponse').then((res) => {
        basicAssertions.assertResponseErrorCode(res,errorCodes.errorCodes[status])
    }) })

