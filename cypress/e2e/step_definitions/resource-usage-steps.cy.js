import { When, Given , Then, Step , After } from "@badeball/cypress-cucumber-preprocessor";
import ResourceUsage from "../../support/APILib/ResourceUsage"
import Tenant from "../../support/APILib/Tenant"
import Resource from "../../support/APILib/Resource"
import BasicAssertions from "../../support/BasicAssertions";

const resourceusage = new ResourceUsage();
const resource = new Resource();
const tenant = new Tenant();
const basicAssertions = new BasicAssertions();

After({tags: "@resourceusage-delete"}, function() {
   cy.deleteTestResourceUsage()
   cy.deleteTestResource()
   cy.deleteTestTenant()
});

After({tags: "@resource-delete"}, function() {
   
});


Given("Execute GET API to list all ResourceUsages", () => {
    const url = resourceusage.createResourceUsageUrl()
    const options = resourceusage.get_ListResourceUsages(url)   
    cy.request(options).then((res)=>{
       cy.wrap(res).as('GETResponse')
    });
 })  

 Then("Execute POST API to create a random ResourceUsage without optional fields", () => {
    //create resource
    const resourceUrl = resource.createResourceUrl()
    const ranstr = Date.now()
    const resourceName = "auto"+ranstr
    const resourcePayload = resource.createResourcePayload(resourceName)
    const resourceOptions = resource.post_CreateResource(resourceUrl,resourcePayload)
    cy.request(resourceOptions).then((resourceres)=>{
        console.log(resourceres)
        const resourceId = resourceres.body.resourceId
        console.log(resourceId)
    //create tenant
    const tenantUrl = tenant.createTenantUrl()
   const companyName = "auto"+"company"+ranstr
   const tenantName = "auto"+"tenant"+ranstr
   const tenantPayload = tenant.createTenantPayload(companyName,tenantName)
   const tenantoptions = tenant.post_CreateTenant(tenantUrl,tenantPayload)
   cy.log(tenantoptions,tenantPayload,companyName,tenantName)
   cy.request(tenantoptions).then((tenantres)=>{
       const tenantId = tenantres.body.tenantId
       console.log(tenantId)
    //create resourceUsage
    const url = resourceusage.createResourceUsageUrl()
    const payload = resourceusage.createResourceUsagePayload(resourceId,tenantId)
    const options = resourceusage.post_CreateResourceUsage(url,payload)
    cy.wrap(options).as('POSTOption')
    cy.request(options).then((res)=>{
       cy.wrap(res).as('POSTResponse')
    });
    });      
   }); 
 })

 Given("Execute GET API to fetch specific ResourceUsage with ResourceUsageID", ()=>{
    cy.get('@POSTResponse').then((option)=>{   
    const url = resourceusage.createResourceUsageUrl(option.body.resourceUsageId)
    const options = resourceusage.get_ListResourceUsages(url)   
    cy.request(options).then((res)=>{
       cy.wrap(res).as('GETResponse')
    });
 })
 })

 Given("Execute GET API to fetch specific ResourceUsage with incorrect ResourceUsageID of length {int}", (len)=>{
    const url = resourceusage.createResourceUsageUrl(resource.creatingIDWithSpecificLength(len))
    const options = resourceusage.get_ListResourceUsages(url)
    cy.wrap(options).as('GETOption')
    cy.request(options).then((res)=>{
       cy.wrap(res).as('GETResponse')
    });
 })

 Then("Validate created ResourceUsage exist in the list", () => {
    const url = resourceusage.createResourceUsageUrl()
    const options = resourceusage.get_ListResourceUsages(url)  
    let resourceUsageArray = []; 
    cy.request(options).then(function(res){
       for (let i = 0; i < res.body.length; i++) {
          resourceUsageArray.push(res.body[i].resourceUsageId)
       } 
    cy.get('@POSTResponse').then((res) => {
       basicAssertions.assertValueExistInArray(resourceUsageArray, res.body.resourceUsageId);
       });
    });
 });

 Then("Validate all the optional field values in ResourceUsage post response", () => {
   cy.get('@POSTResponse').then((res)=>{
      basicAssertions.assertFieldValueInResponse("info" , null ,res)
      basicAssertions.assertFieldValueInResponse("usage" , null ,res)
      basicAssertions.assertFieldValueInResponse("quota" , null ,res)
      basicAssertions.assertFieldValueInResponse("alertThreshold" , null ,res)
   }) 
})

Then("Execute POST API to create a resourceUsage without providing {string}", (attribute) => {
   //create resource
   const resourceUrl = resource.createResourceUrl()
   const ranstr = Date.now()
   const resourceName = "auto"+ranstr
   const resourcePayload = resource.createResourcePayload(resourceName)
   const resourceOptions = resource.post_CreateResource(resourceUrl,resourcePayload)
   cy.request(resourceOptions).then((resourceres)=>{
       const resourceId = resourceres.body.resourceId
   //create tenant
   const tenantUrl = tenant.createTenantUrl()
  const companyName = "auto"+"company"+ranstr
  const tenantName = "auto"+"tenant"+ranstr
  const tenantPayload = tenant.createTenantPayload(companyName,tenantName)
  const tenantoptions = tenant.post_CreateTenant(tenantUrl,tenantPayload)
  cy.log(tenantoptions,tenantPayload,companyName,tenantName)
  cy.request(tenantoptions).then((tenantres)=>{
      const tenantId = tenantres.body.tenantId
   const payload = resourceusage.createResourceUsagePayload(resourceId, tenantId)
   delete payload[attribute]
   const url = resourceusage.createResourceUsageUrl()
   const options = resourceusage.post_CreateResourceUsage(url,payload)
   cy.wrap(options).as('POSTOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('POSTResponse')
   });
});
   });
});

Given("Execute POST API to create a resourceUsage with incorrect {string}" ,(attribute,len)=>{
   const url = resourceusage.createResourceUsageUrl()
   //create resource
   const resourceUrl = resource.createResourceUrl()
   const ranstr = Date.now()
   const resourceName = "auto"+ranstr
   const resourcePayload = resource.createResourcePayload(resourceName)
   const resourceOptions = resource.post_CreateResource(resourceUrl,resourcePayload)
   cy.request(resourceOptions).then((resourceres)=>{
       const resourceId = resourceres.body.resourceId
   //create tenant
   const tenantUrl = tenant.createTenantUrl()
   const companyName = "auto"+"company"+ranstr
   const tenantName = "auto"+"tenant"+ranstr
   const tenantPayload = tenant.createTenantPayload(companyName,tenantName)
   const tenantoptions = tenant.post_CreateTenant(tenantUrl,tenantPayload)
   cy.log(tenantoptions,tenantPayload,companyName,tenantName)
   cy.request(tenantoptions).then((tenantres)=>{
   const tenantId = tenantres.body.tenantId
   let payload = resourceusage.createResourceUsagePayload(resourceId, tenantId)
   console.log(payload)
   let newAttribute = 1234567
   payload[attribute]= newAttribute
   console.log(newAttribute)
   console.log(payload)
   const options = resourceusage.post_CreateResourceUsage(url,payload)
   cy.wrap(options).as('POSTOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('POSTResponse')
   });
})
   });
});

Then("Execute PUT API to update specific ResourceUsage with incorrect tenantId", () => {
   cy.get('@POSTResponse').then((option)=>{
     const url = resourceusage.createResourceUsageUrl(option.body.resourceUsageId)
     console.log()
     //Get resourceId from resource usage
     const resourceId = option.body.resourceId
     const newTenantId = 99999
     let payload = resourceusage.putResourceUsagePayload(resourceId, newTenantId)
     console.log(payload)
     const options = resourceusage.put_resourceusage(url,payload)
     cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     });
   })  
})

Then("Execute PUT API to update specific ResourceUsage with incorrect resourceId", () => {
   cy.get('@POSTResponse').then((option)=>{
     const url = resourceusage.createResourceUsageUrl(option.body.resourceUsageId)
     //Get resourceId from resource usage
     const tenantId = option.body.tenantId
     const newResourceId = 999999
     let payload = resourceusage.putResourceUsagePayload(newResourceId, tenantId)
     console.log(payload)
     const options = resourceusage.put_resourceusage(url,payload)
     cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     });
   })  
})

Then("Execute PUT API to update specific ResourceUsage with another resourceId", () => {
   cy.get('@POSTResponse').then((option)=>{
     const url = resourceusage.createResourceUsageUrl(option.body.resourceUsageId)
     //Get resourceId from resource usage
     const tenantId = option.body.tenantId
     //create resource
     const resourceUrl = resource.createResourceUrl()
     const ranstr = Date.now()
     const resourceName = "auto"+ranstr
     const resourcePayload = resource.createResourcePayload(resourceName)
     const resourceOptions = resource.post_CreateResource(resourceUrl,resourcePayload)
     cy.request(resourceOptions).then((resourceres)=>{
       const resourceId = resourceres.body.resourceId
     let payload = resourceusage.putResourceUsagePayload(resourceId, tenantId)
     console.log(payload)
     const options = resourceusage.put_resourceusage(url,payload)
     cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     })
     });
   })  
})

Then("Execute PUT API for incorrect ResourceUsageID of length {int}", (len) => {
   cy.get('@POSTResponse').then((option)=>{
      //Get resourceId from resource usage
      const tenantId = option.body.tenantId
      const resourceId = option.body.resourceId
     const url = resourceusage.createResourceUsageUrl(resourceusage.creatingIDWithSpecificLength(len))
     let payload = resourceusage.putResourceUsagePayload(resourceId, tenantId)
     console.log(payload)
     const options = resourceusage.put_resourceusage(url,payload)
     cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     })
   })
})

Then("Execute PATCH API to update specific ResourceUsage with incorrect tenantId", () => {
   cy.get('@POSTResponse').then((option)=>{
     const url = resourceusage.createResourceUsageUrl(option.body.resourceUsageId)
     //Get resourceId from resource usage
     const resourceId = option.body.resourceId
     const newTenantId = 99999
     let payload = resourceusage.patchResourceUsagePayload(resourceId, newTenantId)
     console.log(payload)
     const options = resourceusage.patch_resourceusage(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API to update specific ResourceUsage with incorrect resourceId", () => {
   cy.get('@POSTResponse').then((option)=>{
     const url = resourceusage.createResourceUsageUrl(option.body.resourceUsageId)
     //Get resourceId from resource usage
     const tenantId = option.body.tenantId
     const newResourceId = 99999
     let payload = resourceusage.patchResourceUsagePayload(newResourceId, tenantId)
     console.log(payload)
     const options = resourceusage.patch_resourceusage(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API to update specific ResourceUsage with another resourceId", () => {
   cy.get('@POSTResponse').then((option)=>{
     const url = resourceusage.createResourceUsageUrl(option.body.resourceUsageId)
     //Get resourceId from resource usage
     const tenantId = option.body.tenantId
     //create resource
     const resourceUrl = resource.createResourceUrl()
     const ranstr = Date.now()
     const resourceName = "auto"+ranstr
     const resourcePayload = resource.createResourcePayload(resourceName)
     const resourceOptions = resource.post_CreateResource(resourceUrl,resourcePayload)
     cy.request(resourceOptions).then((resourceres)=>{
       const resourceId = resourceres.body.resourceId
     let payload = resourceusage.patchResourceUsagePayload(resourceId, tenantId)
     console.log(payload)
     const options = resourceusage.patch_resourceusage(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     })
     });
   })  
})

Then("Execute PATCH API for incorrect ResourceUsageID of length {int}", (len) => {
   cy.get('@POSTResponse').then((option)=>{
      //Get resourceId from resource usage
      const tenantId = option.body.tenantId
      const resourceId = option.body.resourceId
     const url = resourceusage.createResourceUsageUrl(resourceusage.creatingIDWithSpecificLength(len))
     let payload = resourceusage.patchResourceUsagePayload(resourceId, tenantId)
     console.log(payload)
     const options = resourceusage.patch_resourceusage(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     })
   })
})