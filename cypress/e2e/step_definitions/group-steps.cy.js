import { When, Given , Then, Step , After } from "@badeball/cypress-cucumber-preprocessor";
import Group from "../../support/APILib/Group"
import Tenant from "../../support/APILib/Tenant"
import BasicAssertions from "../../support/BasicAssertions";

const tenant = new Tenant();
const group = new Group();
const basicAssertions = new BasicAssertions();

After({tags: "@group-delete"}, function() {
   cy.log("Delete created Group")
   cy.deleteTestGroups()
   cy.log("Delete created Tenant")
   cy.deleteTestTenant()
   
});

 Given("Execute POST API to create a random Group without optional fields to create Group", () => {
    const ranstr = Date.now()
    // tenant
    const tenantUrl = tenant.createTenantUrl()
    const companyName = "auto"+ranstr
    const tenantName = "auto"+ranstr
    const tenantPayload = tenant.createTenantPayload(companyName,tenantName)
    const tenantOptions = tenant.post_CreateTenant(tenantUrl,tenantPayload)
      cy.request(tenantOptions).then((tenantres)=>{
      // User
      const url = group.createGroupUrl()
      const tenantId = tenantres.body.tenantId 
      const groupName = "autoTest"+ranstr
    //   const email = "autoTest"+ranstr+"@gmail.com"
      const payload = group.createGroupPayload(tenantId,groupName)
      const options = group.post_CreateGroup(url,payload)
      cy.wrap(options).as('POSTOption')
      cy.request(options).then((res)=>{
         cy.wrap(res).as('POSTResponse')
      });      
      });  
      }); 

Given("Execute GET API to list all Groups", () => {
    const url = group.createGroupUrl()
   const options = group.get_ListGroup(url)   
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})  

Given("Execute GET API to fetch specific Group with GroupId", ()=>{
   cy.get('@POSTResponse').then((option)=>{   
    const url = group.createGroupUrl(option.body.groupId)
    const options = group.get_ListGroup(url) 
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})
})

Given("Execute GET API to fetch specific Group with incorrect GroupId of length {int}", (len)=>{
    const url = group.createGroupUrl(group.creatingIDWithSpecificLength(len))
   const options = group.get_ListGroup(url) 
   cy.wrap(options).as('GETOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})

Then("Validate created Group exist in the list", () => {
    const url = group.createGroupUrl()
    const options = group.get_ListGroup(url) 
   let groupIdArray = []; 
   cy.request(options).then(function(res){
      cy.log(res)
      for (let i = 0; i < res.body.length; i++) {
        groupIdArray.push(res.body[i].groupId)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueExistInArray(groupIdArray, res.body.groupId);
      });
   });
   
});

Then("Execute POST API to create Group with existing GroupName to validate duplicate", () => {
   cy.get('@POSTResponse').then((option)=>{
        const url = group.createGroupUrl()
        const tenantId = option.body.tenantId 
        const groupName = option.body.groupName
        // const email = option.body.email
        const payload = group.createGroupPayload(tenantId,groupName)
        const options = group.post_CreateGroup(url,payload)
         cy.wrap(options).as('POSTOption')
         cy.request(options).then((res)=>{
            cy.wrap(res).as('POSTResponse')
         });      
         });  
         }); 

// Then("Execute POST API to create a Feature without providing {string}", (attribute) => {
//     const ranstr = Date.now()
//     // Product
//       const producturl = product.createProductUrl()
//       const prodctName = "auto"+ranstr
//       const productBaseUrl = "auto"+ranstr
//       const Productpayload = product.createProductPayload(prodctName,productBaseUrl)
//       const Productoptions = product.post_CreateProduct(producturl,Productpayload)
//       cy.request(Productoptions).then((Productres)=>{
//       // Feature
//       const Featureurl = feature.createFeatureUrl()
//       const productId = Productres.body.productId 
//       const featureName =  "AutomationFeature"+ranstr 
//     const payload = feature.createFeaturePayload(productId,featureName)
//    delete payload[attribute]
//    const options = feature.post_CreateFeature(Featureurl,payload)
//       cy.wrap(options).as('POSTOption')
//       cy.request(options).then((res)=>{
//          cy.wrap(res).as('POSTResponse')
//       });      
//       });  
// })

Given("Execute POST API to create a User with {string} more than {int} characters",(attribute,len)=>{
    const ranstr = Date.now()
     // tenant
    const tenantUrl = tenant.createTenantUrl()
    const companyName = "auto"+ranstr
    const tenantName = "auto"+ranstr
    const tenantPayload = tenant.createTenantPayload(companyName,tenantName)
    const tenantOptions = tenant.post_CreateTenant(tenantUrl,tenantPayload)
      cy.request(tenantOptions).then((tenantres)=>{
      // User
      const url = user.createUserUrl()
      const tenantId = tenantres.body.tenantId 
      const externalUserId = "autoTest"+ranstr
      const email = "autoTest"+ranstr+"@gmail.com"
      const payload = user.createUserPayload(externalUserId,email,tenantId)
      delete payload[attribute]
      let newAttribute = user.creatingStringWithSpecificLength(len+1)
      payload[attribute]= newAttribute
      const options = user.post_CreateUser(url,payload)
      cy.wrap(options).as('POSTOption')
      cy.request(options).then((res)=>{
         cy.wrap(res).as('POSTResponse')
      });      
      }); 

 })

Then("Execute DELETE API to delete specific Group", function() { 
   cy.get('@POSTResponse').then((option)=>{
      const url = group.createGroupUrl(option.body.groupId)
      const options = group.del_Group(url)
      cy.wrap(options).as('DELETEOption') 
      cy.request(options).then((res)=>{
         cy.wrap(res).as('DELETEResponse')
      });
    })
})

Then("Validate deleted User does not exist in the list", () => {
   const url = group.createGroupUrl()
   const options = group.get_ListGroup(url)  
   let groupIdArray = []; 
   cy.request(options).then(function(res){
      for (let i = 0; i < res.body.length; i++) {
        groupIdArray.push(res.body[i].groupIdArray)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueNotExistInArray(groupIdArray, res.body.groupIdArray);
      });
   });
   
});

Given("Execute DELETE API to delete specific User with incorrect userId of length {int}", (len)=>{
    const url = group.createGroupUrl(group.creatingIDWithSpecificLength(len))
   const options = group.del_Group(url)
   cy.wrap(options).as('DELETEOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('DELETEResponse')
   });
})

Then("Execute PATCH API to update specific User without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
    const ranstr = Date.now()
    const url = user.createUserUrl(option.body.tenantId)
    const tenantId = option.body.tenantId 
    const externalUserId = "autoTest"+"update"+ranstr
     const payload = user.patchUserPayload(externalUserId,tenantId)
     const options = user.patch_User(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for incorrect userId", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Math.floor(100000000 + Math.random() * 900000000);
     const url = user.createUserUrl(ranstr)
     const tenantId = option.body.tenantId 
     const externalUserId = "autoTest"+"update"+ranstr
      const payload = user.patchUserPayload(externalUserId,tenantId)
      const options = user.patch_User(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for User controller non payload field", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
      const url = user.createUserUrl(ranstr)
     const tenantId = option.body.tenantId 
     const externalUserId = "autoTest"+"update"+ranstr
      const payload = user.patchNonColUserPayload(externalUserId,tenantId)
      const options = user.patch_User(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PUT API to update specific User without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
   const ranstr = Date.now()
   const url = user.createUserUrl(ranstr)
   const tenantId = option.body.tenantId 
   const externalUserId = "autoTest"+"updatePUTAPI"+ranstr
   const payload = user.putUserPayload(externalUserId,tenantId)
   const options = user.put_User(url,payload)
      cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     });
   })  
})

Then("Execute PUT API for incorrect featureId of length {int}", (len) => {
   cy.get('@POSTResponse').then((option)=>{ 
   const ranstr = Date.now()
   const url = user.createUserUrl(user.creatingIDWithSpecificLength(len))
   const tenantId = option.body.tenantId 
   const externalUserId = "autoTest"+"updatePUTAPI"+ranstr
   const payload = user.putUserPayload(externalUserId,tenantId)
   const options = user.put_User(url,payload)
        cy.wrap(options).as('PUTOption') 
       cy.request(options).then((res)=>{
          cy.wrap(res).as('PUTResponse')
       });
})
})
