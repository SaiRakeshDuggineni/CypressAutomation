import { When, Given , Then, Step , After } from "@badeball/cypress-cucumber-preprocessor";
import Tenant from "../../support/APILib/Tenant"
import BasicAssertions from "../../support/BasicAssertions";

const tenant = new Tenant();
const basicAssertions = new BasicAssertions();

After({tags: "@tenant-delete"}, function() {
   cy.deleteTestTenant()
});

Given("Execute GET API to list all Tenant", () => {
   const url = tenant.createTenantUrl()
   const options = tenant.get_ListTenants(url)   
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})  

Given("Execute GET API to fetch specific Tenant with TenantID", ()=>{
   cy.get('@POSTResponse').then((option)=>{   
   const url = tenant.createTenantUrl(option.body.id)
   const options = tenant.get_ListTenants(url)   
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})
})

Given("Execute GET API to fetch specific tenant with incorrect TenantID of length {int}", (len)=>{
   const url = tenant.createTenantUrl(tenant.creatingIDWithSpecificLength(len))
   const options = tenant.get_ListTenants(url)
   cy.wrap(options).as('GETOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})

Then("Execute POST API to create a random Tenant without optional fields", () => {
   const ranstr = Date.now()
   const url = tenant.createTenantUrl()
   const companyName = "auto"+ranstr
   const tenantName = "auto"+ranstr
   const payload = tenant.createTenantPayload(companyName,tenantName)
   const options = tenant.post_CreateTenant(url,payload)
   cy.log(options,payload,companyName,tenantName)
   cy.wrap(options).as('POSTOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('POSTResponse')
   });      
})

Then("Execute POST API to create a tenant without providing {string}", (attribute) => {
   const ranstr = Date.now()
   const url = tenant.createTenantUrl()
   const companyName = "auto"+ranstr
   const tenantName = "auto"+ranstr
   const payload = tenant.createTenantPayload(companyName,tenantName)
   delete payload[attribute]
   const options = tenant.post_CreateTenant(url,payload)
   cy.wrap(options).as('POSTOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('POSTResponse')
   });
})

Given("Execute POST API to create a tenant with {string} more than {int} characters",(attribute,len)=>{
   const url = tenant.createTenantUrl()
   const ranstr = Date.now()
   let companyName = "auto"+ranstr
   let tenantName = "auto"+ ranstr
   let payload = tenant.createTenantPayload(companyName,tenantName)
   delete payload[attribute]
   let newAttribute = tenant.creatingStringWithSpecificLength(len+1)
   payload[attribute]= newAttribute
   const options = tenant.post_CreateTenant(url,payload)
   cy.wrap(options).as('POSTOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('POSTResponse')
   });
})


Then("Validate created Tenant exist in the list", () => {
   const url = tenant.createTenantUrl()
   const options = tenant.get_ListTenants(url)  
   let tenantNameArray = []; 
   cy.request(options).then(function(res){
      for (let i = 0; i < res.body.result.length; i++) {
         tenantNameArray.push(res.body.result[i].tenantName)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueExistInArray(tenantNameArray, res.body.tenantName);
      });
   });
   
});

Then("Validate deleted Tenant does not exist in the list", () => {
   const url = tenant.createTenantUrl()
   const options = tenant.get_ListTenants(url)  
   let tenantNameArray = []; 
   cy.request(options).then(function(res){
      for (let i = 0; i < res.body.result.length; i++) {
         tenantNameArray.push(res.body.result[i].tenantName)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueNotExistInArray(tenantNameArray, res.body.tenantName);
      });
   });
   
});

Then("Execute DELETE API to delete specific Tenant", function() { 
      if(this.POSTResponseTenant){
         const url = tenant.createTenantUrl(this.POSTResponseTenant.body.tenantId)
         const options = tenant.del_Tenant(url)
         cy.wrap(options).as('DELETEOption') 
         cy.request(options).then((res)=>{
            cy.wrap(res).as('DELETEResponse')
         })
      }else{
         cy.get('@POSTResponse').then((option)=>{
            const url = tenant.createTenantUrl(option.body.tenantId)
            const options = tenant.del_Tenant(url)
            cy.wrap(options).as('DELETEOption') 
            cy.request(options).then((res)=>{
               cy.wrap(res).as('DELETEResponse')
            });
          })  
      }
   })

Given("Execute DELETE API to delete specific Tenant with incorrect TenantID of length {int}", (len)=>{
   const url = tenant.createTenantUrl(tenant.creatingIDWithSpecificLength(len))
   const options = tenant.del_Tenant(url)
   cy.wrap(options).as('DELETEOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('DELETEResponse')
   });
})

Then("Execute PATCH API to update specific Tenant without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = tenant.createTenantUrl(option.body.tenantId)
     const companyName = "auto"+"update"+ranstr
     const tenantName = "auto"+"update"+ranstr
     const payload = tenant.patchTenantPayload(companyName,tenantName)
     const options = tenant.patch_tenant(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for incorrect TenantID", () => {
   cy.get('@POSTResponse').then(()=>{
     const ranstr = Math.floor(100000000 + Math.random() * 900000000);
     const url = tenant.createTenantUrl(ranstr)
     const companyName = "auto"+"update"+ranstr
     const tenantName = "auto"+"update"+ranstr
     const payload = tenant.patchTenantPayload(companyName,tenantName)
     const options = tenant.patch_tenant(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for non payload field for Tenant data service", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = tenant.createTenantUrl(option.body.tenantId)
     const companyName = "auto"+"update"+ranstr
     const NonPayloadfield = "auto"+"update"+ranstr
     const payload = tenant.patchNonColTenantPayload(companyName, NonPayloadfield)
     const options = tenant.patch_tenant(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PUT API to update specific Tenant without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = tenant.createTenantUrl(option.body.tenantId)
     const companyName = "auto"+"modified"+ranstr
     const tenantName = option.body.tenantName
     const payload = tenant.putTenantPayload(companyName,tenantName)
     const options = tenant.put_tenant(url,payload)
     cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     });
   })  
})

Then("Execute PUT API for incorrect TenantID of length {int}", (len) => {
     const ranstr = Date.now()
     const url = tenant.createTenantUrl(tenant.creatingIDWithSpecificLength(len))
     const companyName = "auto"+"modified"+ranstr
     const tenantName = "auto"+"modified"+ranstr
     const payload = tenant.putTenantPayload(companyName,tenantName)
     const options = tenant.put_tenant(url,payload)
     cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     });
})

Then("Validate all the optional field values in Tenant post response", () => {
   cy.get('@POSTResponse').then((res)=>{
      basicAssertions.assertFieldValueInResponse("city" , null ,res)
      basicAssertions.assertFieldValueInResponse("country" , null ,res)
      basicAssertions.assertFieldValueInResponse("deleted" , false ,res)
      basicAssertions.assertFieldValueInResponse("enabled" , true ,res)
      basicAssertions.assertFieldValueInResponse("phone" , null ,res)
      basicAssertions.assertFieldValueInResponse("primaryContact" , null ,res)
      basicAssertions.assertFieldValueInResponse("state" , null ,res)
      basicAssertions.assertFieldValueInResponse("street" , null ,res)
      basicAssertions.assertFieldValueInResponse("subscriptionTier" , null ,res)
      basicAssertions.assertFieldValueInResponse("subsidiaryName" , null ,res)
      basicAssertions.assertFieldValueInResponse("tenantInfo" , null ,res)
      basicAssertions.assertFieldValueInResponse("websiteUrl" , null ,res)
      basicAssertions.assertFieldValueInResponse("zip" , null ,res)
      // basicAssertions.assertIfValidUUID(res.body.uniqueTenantId)

   }) 
})


Then("Execute POST API to create tenant with existing Tenant Name to validate duplicate", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     let url = tenant.createTenantUrl()
     const companyName = "auto"+"duplicate"+ranstr
     const tenantName = option.body.tenantName
     const payload = tenant.createTenantPayload(companyName,tenantName)
     const options = tenant.post_CreateTenant(url,payload)
     cy.wrap(options).as('POSTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('POSTResponse')
     });
   })  
})

Given("Execute queried GET API on tenant controller on attribute {string} with operator as {string}", (attributeName ,operator ) => {   
     cy.get('@POSTResponse').then((option)=>{
     const url = tenant.createTenantRSQLUrl(attributeName,operator,option.body[attributeName])
      const options = tenant.get_ListTenants(url)   
      cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
    })  
})


Then("Validate the queried value for tenantName and count", (operator) => {
   cy.get('@GETResponse').then((option)=>{
      var tenantNameFromGet = option.body.result[0].tenantName
      cy.get('@POSTResponse').then((res)=>{
      basicAssertions.assertFieldValueInResponse("tenantName" , tenantNameFromGet ,res)
      })
})
})

Then("Validate the queried value for tenantName and companyName", () => {
   cy.get('@GETResponse').then((option)=>{
      var tenantNameFromGet = option.body.result[0].tenantName
      var companyNameFromGet = option.body.result[0].companyName
      cy.get('@POSTResponse').then((res)=>{
      basicAssertions.assertFieldValueInResponse("tenantName" , tenantNameFromGet ,res)
      basicAssertions.assertFieldValueInResponse("companyName" , companyNameFromGet ,res)
      })
})
})

Given("Execute multiple queried GET API on tenant controller on attribute {string} and {string} with operator as {string} and {string}", (attributeName1,attributeName2 ,operator1,operator2 ) => {   
   cy.get('@POSTResponse').then((option)=>{
   const url = tenant.createTenantRSQLUrl(attributeName1,operator1,option.body[attributeName1],attributeName2,operator2,option.body[attributeName2])
    cy.log(url)
    const options = tenant.get_ListTenants(url)   
    cy.request(options).then((res)=>{
    cy.wrap(res).as('GETResponse')
   });
  })  
})

Then("Validate the queried value for {string} not equal operator", (operator) => {
   cy.log("Quering to check the not equal to operator")
   cy.get('@GETResponse').then((response)=>{
      basicAssertions.assertFieldValueInResponseNotEqual("count" , 1 , response)

}) 
})

Then("Validate the queried value for {string} operator", (operator) => {
   cy.log("Quering to check the equal to operator")
   cy.get('@GETResponse').then((response)=>{
      basicAssertions.assertFieldValueInResponse("count" , 1 , response)

}) 
})