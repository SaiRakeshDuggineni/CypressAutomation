import { When, Given , Then, Step , After } from "@badeball/cypress-cucumber-preprocessor";
import Resource from "../../support/APILib/Resource"
import BasicAssertions from "../../support/BasicAssertions";

const resource = new Resource();
const basicAssertions = new BasicAssertions();

After({tags: "@resource-delete"}, function() {
   cy.deleteTestResource()
});

Then("Execute POST API to create a random Resource without optional fields", () => {
   const ranstr = Date.now()
   const url = resource.createResourceUrl()
   const resourceName = "auto"+ranstr
   const payload = resource.createResourcePayload(resourceName)
   const options = resource.post_CreateResource(url,payload)
   cy.wrap(options).as('POSTOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('POSTResponse')
   });      
})


Given("Execute GET API to list all Resource", () => {
   const url = resource.createResourceUrl()
   const options = resource.get_ListResources(url)   
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})  

Given("Execute GET API to fetch specific Resource with ResourceID", ()=>{
   cy.get('@POSTResponse').then((option)=>{   
   const url = resource.createResourceUrl(option.body.resourceId)
   const options = resource.get_ListResources(url)   
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})
})

Given("Execute GET API to fetch specific Resource with incorrect ResourceID of length {int}", (len)=>{
   const url = resource.createResourceUrl(resource.creatingIDWithSpecificLength(len))
   const options = resource.get_ListResources(url)
   cy.wrap(options).as('GETOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})

Then("Validate created Resource exist in the list", () => {
   const url = resource.createResourceUrl()
   const options = resource.get_ListResources(url)  
   let resourceNameArray = []; 
   cy.request(options).then(function(res){
      for (let i = 0; i < res.body.length; i++) {
         resourceNameArray.push(res.body[i].resource)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueExistInArray(resourceNameArray, res.body.resource);
      });
   });
   
});

Then("Validate all the optional field values in Resource post response", () => {
   cy.get('@POSTResponse').then((res)=>{
      basicAssertions.assertFieldValueInResponse("type" , null ,res)
      basicAssertions.assertFieldValueInResponse("category" , null ,res)
   }) 
})

Then("Execute POST API to create resource with existing Resource Name to validate duplicate", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     let url = resource.createResourceUrl()
     const resourceName = option.body.resource
     const payload = resource.createResourcePayload(resourceName)
     const options = resource.post_CreateResource(url,payload)
     cy.wrap(options).as('POSTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('POSTResponse')
     });
   })  
})

Then("Execute POST API to create a resource without providing {string}", (attribute) => {
   const url = resource.createResourceUrl()
   const payload = resource.createResourcePayload()
   delete payload[attribute]
   const options = resource.post_CreateResource(url,payload)
   cy.wrap(options).as('POSTOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('POSTResponse')
   });
})

Given("Execute POST API to create a resource with {string} more than {int} characters",(attribute,len)=>{
   const url = resource.createResourceUrl()
   const ranstr = Date.now()
   let resourceN = "auto"+ranstr
   let payload = resource.createResourcePayload(resourceN)
   console.log(payload)
   delete payload[attribute]
   let newAttribute = resource.creatingStringWithSpecificLength(len+1)
   payload[attribute]= newAttribute
   console.log(newAttribute)
   console.log(payload)
   const options = resource.post_CreateResource(url,payload)
   cy.wrap(options).as('POSTOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('POSTResponse')
   });
})

Then("Validate deleted Resource does not exist in the list", () => {
   const url = resource.createResourceUrl()
   const options = resource.get_ListResources(url)  
   let resourceNameArray = []; 
   cy.request(options).then(function(res){
      for (let i = 0; i < res.body.length; i++) {
         resourceNameArray.push(res.body[i].resource)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueNotExistInArray(resourceNameArray, res.body.resource);
      });
   });
   
});

Then("Execute DELETE API to delete specific Resource", function() { 
      if(this.POSTResponseResource){
         const url = resource.createResourceUrl(this.POSTResponseResource.body.resourceId)
         const options = resource.del_Resource(url)
         cy.wrap(options).as('DELETEOption') 
         cy.request(options).then((res)=>{
            cy.wrap(res).as('DELETEResponse')
         })
      }else{
         cy.get('@POSTResponse').then((option)=>{
            const url = resource.createResourceUrl(option.body.resourceId)
            const options = resource.del_Resource(url)
            cy.wrap(options).as('DELETEOption') 
            cy.request(options).then((res)=>{
               cy.wrap(res).as('DELETEResponse')
            });
          })  
      }
   })

Given("Execute DELETE API to delete specific Resource with incorrect ResourceID of length {int}", (len)=>{
   const url = resource.createResourceUrl(resource.creatingIDWithSpecificLength(len))
   const options = resource.del_Resource(url)
   cy.wrap(options).as('DELETEOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('DELETEResponse')
   });
})

Then("Execute PATCH API to update specific Resource without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = resource.createResourceUrl(option.body.resourceId)
     const resourceName = "auto"+"update"+ranstr
     const payload = resource.patchResourcePayload(resourceName)
     const options = resource.patch_resource(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for incorrect ResourceID", () => {
   cy.get('@POSTResponse').then(()=>{
     const ranstr = Math.floor(100000000 + Math.random() * 900000000);
     const url = resource.createResourceUrl(ranstr)
     const resourceName = "auto"+"update"+ranstr
     const payload = resource.patchResourcePayload(resourceName)
     const options = resource.patch_resource(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for non payload field for Resource data service", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = resource.createResourceUrl(option.body.resourceId)
     const resourceName = "auto"+"update"+ranstr
     const NonPayloadfield = "auto"+"update"+ranstr
     const payload = resource.patchNonColResourcePayload(resourceName, NonPayloadfield)
     const options = resource.patch_resource(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PUT API to update specific Resource without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = resource.createResourceUrl(option.body.resourceId)
     const ResourceName = "auto"+"modified"+ranstr
     const payload = resource.putResourcePayload(ResourceName)
     const options = resource.put_resource(url,payload)
     cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     });
   })  
})

Then("Execute PUT API for incorrect ResourceID of length {int}", (len) => {
     const ranstr = Date.now()
     const url = resource.createResourceUrl(resource.creatingIDWithSpecificLength(len))
     const resourceName = "auto"+"modified"+ranstr
     const payload = resource.putResourcePayload(resourceName)
     const options = resource.put_resource(url,payload)
     cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     });
})