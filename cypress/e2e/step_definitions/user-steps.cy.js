import { When, Given , Then, Step , After } from "@badeball/cypress-cucumber-preprocessor";
import User from "../../support/APILib/User"
import Tenant from "../../support/APILib/Tenant"
import BasicAssertions from "../../support/BasicAssertions";

const tenant = new Tenant();
const user = new User();
const basicAssertions = new BasicAssertions();

After({tags: "@user-delete"}, function() {
   cy.log("Delete created User")
   cy.deleteTestUsers()
   cy.log("Delete created Tenant")
   cy.deleteTestTenant()
   
});

 Given("Execute POST API to create a random User without optional fields to create User", () => {
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
      const options = user.post_CreateUser(url,payload)
      cy.wrap(options).as('POSTOption')
      cy.request(options).then((res)=>{
         cy.wrap(res).as('POSTResponse')
      });      
      });  
      }); 

Given("Execute GET API to list all users", () => {
    const url = user.createUserUrl()
   const options = user.get_ListUser(url)   
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})  

Given("Execute GET API to fetch specific User with userId", ()=>{
   cy.get('@POSTResponse').then((option)=>{   
    const url = user.createUserUrl(option.body.userId)
    const options = user.get_ListUser(url) 
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})
})

Given("Execute GET API to fetch specific User with incorrect userId of length {int}", (len)=>{
    const url = user.createUserUrl(user.creatingIDWithSpecificLength(len))
   const options = user.get_ListUser(url) 
   cy.wrap(options).as('GETOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})

Then("Validate created User exist in the list", () => {
    const url = user.createUserUrl()
    const options = user.get_ListUser(url) 
   let userIdArray = []; 
   cy.request(options).then(function(res){
      cy.log(res)
      for (let i = 0; i < res.body.length; i++) {
        userIdArray.push(res.body[i].userId)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueExistInArray(userIdArray, res.body.userId);
      });
   });
   
});

Then("Execute POST API to create User with existing userName to validate duplicate", () => {
   cy.get('@POSTResponse').then((option)=>{
        const url = user.createUserUrl()
        const tenantId = option.body.tenantId 
        const externalUserId = option.body.externalUserId
        const email = option.body.email
        const payload = user.createUserPayload(externalUserId,email,tenantId)
        const options = user.post_CreateUser(url,payload)
         cy.wrap(options).as('POSTOption')
         cy.request(options).then((res)=>{
            cy.wrap(res).as('POSTResponse')
         });      
         });  
         }); 

Then("Execute POST API to create a Feature without providing {string}", (attribute) => {
    const ranstr = Date.now()
    // Product
      const producturl = product.createProductUrl()
      const prodctName = "auto"+ranstr
      const productBaseUrl = "auto"+ranstr
      const Productpayload = product.createProductPayload(prodctName,productBaseUrl)
      const Productoptions = product.post_CreateProduct(producturl,Productpayload)
      cy.request(Productoptions).then((Productres)=>{
      // Feature
      const Featureurl = feature.createFeatureUrl()
      const productId = Productres.body.productId 
      const featureName =  "AutomationFeature"+ranstr 
    const payload = feature.createFeaturePayload(productId,featureName)
   delete payload[attribute]
   const options = feature.post_CreateFeature(Featureurl,payload)
      cy.wrap(options).as('POSTOption')
      cy.request(options).then((res)=>{
         cy.wrap(res).as('POSTResponse')
      });      
      });  
})

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

Then("Execute DELETE API to delete specific User", function() { 
   cy.get('@POSTResponse').then((option)=>{
      const url = user.createUserUrl(option.body.userId)
      const options = user.del_User(url)
      cy.wrap(options).as('DELETEOption') 
      cy.request(options).then((res)=>{
         cy.wrap(res).as('DELETEResponse')
      });
    })
})

Then("Validate deleted User does not exist in the list", () => {
   const url = user.createUserUrl()
   const options = user.get_ListUser(url)  
   let userIdArray = []; 
   cy.request(options).then(function(res){
      for (let i = 0; i < res.body.length; i++) {
        userIdArray.push(res.body[i].userId)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueNotExistInArray(userIdArray, res.body.userId);
      });
   });
   
});

Given("Execute DELETE API to delete specific User with incorrect userId of length {int}", (len)=>{
    const url = user.createUserUrl(user.creatingIDWithSpecificLength(len))
   const options = user.del_User(url)
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
