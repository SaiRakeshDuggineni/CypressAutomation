import { When, Given , Then, Step , After } from "@badeball/cypress-cucumber-preprocessor";
import Session from "../../support/APILib/Session"
import Tenant from "../../support/APILib/Tenant"
import TenantSec from "../../support/APILib/TenantSec"
import User from "../../support/APILib/User"
import Product from "../../support/APILib/Product"
import BasicAssertions from "../../support/BasicAssertions";

const session = new Session();
const tenant = new Tenant();
const tenantSec = new TenantSec();
const user = new User();
const product = new Product();
const basicAssertions = new BasicAssertions();

After({tags: "@session-delete"}, function() {
   cy.log("Delete created session")
   cy.deleteTestSession()
   cy.log("Delete created Product")
   cy.deleteTestProduct()
   cy.log("Delete created User")
   cy.deleteTestUsers()
   cy.log("Delete created Tenant Sec")
   cy.deleteTestTenantSec()
   cy.log("Delete created Tenant")
   cy.deleteTestTenant()
});

 Given("Execute POST API to create a random Session without optional fields to create session", () => {
   // Tenant   
   const ranstr = Date.now()
   const tenanturl = tenant.createTenantUrl()
   const companyName = "auto" + ranstr
   const tenantName = "automation" + ranstr
   const tenantpayload = tenant.createTenantPayload(companyName, tenantName)
   const tenantoptions = tenant.post_CreateTenant(tenanturl, tenantpayload)
   cy.request(tenantoptions).then((tenantres) => {
      const tenantSecurl = tenantSec.createTenantSecSecUrl()
      const idpName = "auto"+ranstr
      const idpUrl = "auto"+ranstr
      const tenantId = tenantres.body.tenantId
      cy.log(tenantSecurl , idpName,idpUrl ,tenantId)
      const tenantSecpayload = tenantSec.createTenantSecPayload(idpName,idpUrl,tenantId)
      const tenantSecoptions = tenantSec.post_CreateTenantSec(tenantSecurl,tenantSecpayload)
      cy.request(tenantSecoptions).then((tenantSecres) => {
      // User
      const Userurl = user.createUserUrl()
      const externalUserId = "auto"+ranstr
      const email = "auto"+ranstr+"@gmail.com"
      const tenantId = tenantres.body.tenantId 
      const tenantSecId = tenantSecres.body.tenantSecId
      cy.log(Userurl,externalUserId,email,tenantId,tenantName)
      const Userpayload = user.createUserPayload(externalUserId,email,tenantId,tenantSecId)
      const Useroptions = user.post_CreateUser(Userurl,Userpayload)
      cy.log(Userpayload,Useroptions)
      cy.request(Useroptions).then((Userres)=>{
      // Product
      const producturl = product.createProductUrl()
      const prodctName = "auto"+ranstr
      const productBaseUrl = "auto"+ranstr
      const Productpayload = product.createProductPayload(prodctName,productBaseUrl)
      const Productoptions = product.post_CreateProduct(producturl,Productpayload)
      cy.request(Productoptions).then((Productres)=>{
      // Session
      const Sessionurl = session.createSessionUrl()
      const tenantId = tenantres.body.tenantId
      const tenantName = tenantres.body.tenantName
      const userId = Userres.body.userId 
      const productId = Productres.body.productId 
      const endpointUrl =  "https://Testing"+ranstr 
      const status = "Logged-in" 
      const bearerTokenHash = ranstr  
      const payload = session.createSessionPayload(tenantId,tenantName,userId,productId,endpointUrl,status,bearerTokenHash)
      const options = session.post_CreateSession(Sessionurl,payload)
      cy.wrap(options).as('POSTOption')
      cy.request(options).then((res)=>{
         cy.wrap(res).as('POSTResponse')
      });      
      });  
      }); 
      });
   });      
})

Given("Execute GET API to list all Session", () => {
   const url = session.createSessionUrl()
   const options = session.get_ListSessions(url)   
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})  

Given("Execute GET API to fetch specific Session with SessionID", ()=>{
   cy.get('@POSTResponse').then((option)=>{   
   const url = session.createSessionUrl(option.body.id)
   const options = session.get_ListSessions(url)   
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})
})

Given("Execute GET API to fetch specific Session with incorrect SessionID of length {int}", (len)=>{
   const url = session.createSessionUrl(session.creatingIDWithSpecificLength(len))
   const options = session.get_ListSessions(url)
   cy.wrap(options).as('GETOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})

Then("Validate created Session exist in the list", () => {
   const url = session.createSessionUrl()
   const options = session.get_ListSessions(url)  
   let sessionIdArray = []; 
   cy.request(options).then(function(res){
      cy.log(res)
      for (let i = 0; i < res.body.length; i++) {
         sessionIdArray.push(res.body[i].sessionId)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueExistInArray(sessionIdArray, res.body.sessionId);
      });
   });
   
});

Then("Validate all the optional field values in Session post response", () => {
   cy.get('@POSTResponse').then((res)=>{
      basicAssertions.assertFieldValueInResponse("externalUserId" , null ,res)
      basicAssertions.assertFieldValueInResponse("externalGroupId" , null ,res)
      basicAssertions.assertFieldValueInResponse("maxInactiveTime" , 0 ,res)
      basicAssertions.assertFieldValueInResponse("loginTime" , null ,res)
      basicAssertions.assertFieldValueInResponse("logoutTime" , null ,res)
      basicAssertions.assertFieldValueInResponse("lastModifiedDate" , null ,res)
      basicAssertions.assertFieldValueInResponse("lastActivityTime" , null ,res)
      basicAssertions.assertFieldValueInResponse("lastActivityUrl" , null ,res)
      basicAssertions.assertFieldValueInResponse("bearerExpireDate" , null ,res)
      basicAssertions.assertFieldValueInResponse("bearerIssueDate" , null ,res)
      basicAssertions.assertFieldValueInResponse("info" , null ,res)
   }) 
})

Then("Execute POST API to create session with existing bearerTokenHash to validate duplicate", () => {
   cy.get('@POSTResponse').then((option)=>{
      const ranstr = Date.now()
      // Session
         const Sessionurl = session.createSessionUrl()
         const tenantId = option.body.tenantId
         const tenantName = option.body.tenantName
         const userId = option.body.userId 
         const productId = option.body.productId 
         const endpointUrl =  "https://Testing"+ranstr 
         const status = "Logged-in" 
         const bearerTokenHash = option.body.bearerTokenHash  
         cy.log("tenantId"+tenantId,"tenantName"+tenantName,"userId"+userId,"productId"+productId,"endpointUrl"+endpointUrl,"status"+status,"bearerTokenHash"+bearerTokenHash)
         const payload = session.createSessionPayload(tenantId,tenantName,userId,productId,endpointUrl,status,bearerTokenHash)
         const options = session.post_CreateSession(Sessionurl,payload)
         cy.log(options,payload,tenantId,tenantName,userId,productId,endpointUrl,status,bearerTokenHash)
         cy.wrap(options).as('POSTOption')
         cy.request(options).then((res)=>{
            cy.wrap(res).as('POSTResponse')
         });      
         });  
         }); 

Then("Execute POST API to create a session without providing {string}", (attribute) => {
    // Tenant   
    const ranstr = Date.now()
    const tenanturl = tenant.createTenantUrl()
    const companyName = "auto" + ranstr
    const tenantName = "auto" + ranstr
    const tenantpayload = tenant.createTenantPayload(companyName, tenantName)
    const tenantoptions = tenant.post_CreateTenant(tenanturl, tenantpayload)
    cy.request(tenantoptions).then((tenantres) => {
       const tenantSecurl = tenantSec.createTenantSecSecUrl()
       const idpName = "auto"+ranstr
       const idpUrl = "auto"+ranstr
       const tenantId = tenantres.body.tenantId
       cy.log(tenantSecurl , idpName,idpUrl ,tenantId)
       const tenantSecpayload = tenantSec.createTenantSecPayload(idpName,idpUrl,tenantId)
       const tenantSecoptions = tenantSec.post_CreateTenantSec(tenantSecurl,tenantSecpayload)
       cy.request(tenantSecoptions).then((tenantSecres) => {
       // User
       const Userurl = user.createUserUrl()
       const externalUserId = "auto"+ranstr
       const email = "auto"+ranstr+"@gmail.com"
       const tenantId = tenantres.body.tenantId 
       const tenantSecId = tenantSecres.body.tenantSecId
       cy.log(Userurl,externalUserId,email,tenantId,tenantName)
       const Userpayload = user.createUserPayload(externalUserId,email,tenantId,tenantSecId)
       const Useroptions = user.post_CreateUser(Userurl,Userpayload)
       cy.log(Userpayload,Useroptions)
       cy.request(Useroptions).then((Userres)=>{
       // Product
       const producturl = product.createProductUrl()
       const prodctName = "auto"+ranstr
       const Productpayload = product.createProductPayload(prodctName)
       const Productoptions = product.post_CreateProduct(producturl,Productpayload)
       cy.request(Productoptions).then((Productres)=>{
       // Session
       const Sessionurl = session.createSessionUrl()
       const tenantId = tenantres.body.tenantId
       const tenantName = tenantres.body.tenantName
       const userId = Userres.body.userId 
       const productId = Productres.body.productId 
       const endpointUrl =  "https://Testing"+ranstr 
       const status = "Logged-in" 
       const bearerTokenHash = ranstr  
       cy.log("tenantId"+tenantId,"tenantName"+tenantName,"userId"+userId,"productId"+productId,"endpointUrl"+endpointUrl,"status"+status,"bearerTokenHash"+bearerTokenHash)
       const payload = session.createSessionPayload(tenantId,tenantName,userId,productId,endpointUrl,status,bearerTokenHash)
       delete payload[attribute]
       const options = session.post_CreateSession(Sessionurl,payload)
       cy.log(options,payload,tenantId,tenantName,userId,productId,endpointUrl,status,bearerTokenHash)
       cy.wrap(options).as('POSTOption')
       cy.request(options).then((res)=>{
          cy.wrap(res).as('POSTResponse')
       });      
       });  
       }); 
       });
    });      
})

Given("Execute POST API to create a session with {string} more than {int} characters",(attribute,len)=>{
   // Tenant   
   const ranstr = Date.now()
   const tenanturl = tenant.createTenantUrl()
   const companyName = "auto" + ranstr
   const tenantName = "auto" + ranstr
   const tenantpayload = tenant.createTenantPayload(companyName, tenantName)
   const tenantoptions = tenant.post_CreateTenant(tenanturl, tenantpayload)
   cy.request(tenantoptions).then((tenantres) => {
      const tenantSecurl = tenantSec.createTenantSecSecUrl()
      const idpName = "auto"+ranstr
      const idpUrl = "auto"+ranstr
      const tenantId = tenantres.body.tenantId
      cy.log(tenantSecurl , idpName,idpUrl ,tenantId)
      const tenantSecpayload = tenantSec.createTenantSecPayload(idpName,idpUrl,tenantId)
      const tenantSecoptions = tenantSec.post_CreateTenantSec(tenantSecurl,tenantSecpayload)
      cy.request(tenantSecoptions).then((tenantSecres) => {
      // User
      const Userurl = user.createUserUrl()
      const externalUserId = "auto"+ranstr
      const email = "auto"+ranstr+"@gmail.com"
      const tenantId = tenantres.body.tenantId 
      const tenantSecId = tenantSecres.body.tenantSecId
      cy.log(Userurl,externalUserId,email,tenantId,tenantName)
      const Userpayload = user.createUserPayload(externalUserId,email,tenantId,tenantSecId)
      const Useroptions = user.post_CreateUser(Userurl,Userpayload)
      cy.log(Userpayload,Useroptions)
      cy.request(Useroptions).then((Userres)=>{
      // Product
      const producturl = product.createProductUrl()
      const prodctName = "auto"+ranstr
      const Productpayload = product.createProductPayload(prodctName)
      const Productoptions = product.post_CreateProduct(producturl,Productpayload)
      cy.request(Productoptions).then((Productres)=>{
      // Session
      const Sessionurl = session.createSessionUrl()
      const tenantId = tenantres.body.tenantId
      const tenantName = tenantres.body.tenantName
      const userId = Userres.body.userId 
      const productId = Productres.body.productId 
      const endpointUrl =  "https://Testing"+ranstr 
      const status = "Logged-in" 
      const bearerTokenHash = ranstr  
      cy.log("tenantId"+tenantId,"tenantName"+tenantName,"userId"+userId,"productId"+productId,"endpointUrl"+endpointUrl,"status"+status,"bearerTokenHash"+bearerTokenHash)
      const payload = session.createSessionPayload(tenantId,tenantName,userId,productId,endpointUrl,status,bearerTokenHash)
      delete payload[attribute]
      let newAttribute = tenant.creatingStringWithSpecificLength(len+1)
      payload[attribute]= newAttribute
      const options = session.post_CreateSession(Sessionurl,payload)
      cy.log(options,payload,tenantId,tenantName,userId,productId,endpointUrl,status,bearerTokenHash)
      cy.wrap(options).as('POSTOption')
      cy.request(options).then((res)=>{
         cy.wrap(res).as('POSTResponse')
      });      
      });  
      }); 
      });
   });      
})

Then("Execute DELETE API to delete specific Session", function() { 
   cy.get('@POSTResponse').then((option)=>{
      const url = session.createSessionUrl(option.body.sessionId)
      const options = session.del_Session(url)
      cy.wrap(options).as('DELETEOption') 
      cy.request(options).then((res)=>{
         cy.wrap(res).as('DELETEResponse')
      });
    })
})

Then("Validate deleted Session does not exist in the list", () => {
   const url = session.createSessionUrl()
   const options = session.get_ListSessions(url)  
   let sessionIdArray = []; 
   cy.request(options).then(function(res){
      for (let i = 0; i < res.body.length; i++) {
         sessionIdArray.push(res.body[i].sessionId)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueNotExistInArray(sessionIdArray, res.body.sessionId);
      });
   });
   
});

Given("Execute DELETE API to delete specific Session with incorrect SessionId of length {int}", (len)=>{
   const url = session.createSessionUrl(tenant.creatingIDWithSpecificLength(len))
   const options = session.del_Session(url)
   cy.wrap(options).as('DELETEOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('DELETEResponse')
   });
})

Then("Execute PATCH API to update specific Session without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = session.createSessionUrl(option.body.sessionId)
     const status = "Terminated"
     const tenantName = "auto"+"update"+ranstr
     const payload = session.patchSessionPayload(status,tenantName)
     const options = session.patch_Session(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for incorrect SessionId", () => {
   cy.get('@POSTResponse').then(()=>{
     const ranstr = Math.floor(100000000 + Math.random() * 900000000);
     const url = session.createSessionUrl(ranstr)
     const status = "Terminated"
     const tenantName = "auto"+"update"+ranstr
     const payload = session.patchSessionPayload(status,tenantName)
     const options = session.patch_Session(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for session controller non payload field", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = session.createSessionUrl(option.body.sessionId)
     const tenantName = "auto"+"updatePatch"+ranstr
     const NonPayloadfield = "auto"+"update"+ranstr
     const payload = session.patchNonColSessionPayload(tenantName, NonPayloadfield)
     const options = session.patch_Session(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PUT API to update specific Session without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
   const ranstr = Date.now()
   const Sessionurl = session.createSessionUrl(option.body.sessionId)
   const tenantId = option.body.tenantId
   const tenantName = option.body.tenantName
   const userId = option.body.userId
   const productId = option.body.productId
      const endpointUrl =  "https://Testing"+ranstr+ranstr
      const status = "Logged-in" 
      const bearerTokenHash = option.body.bearerTokenHash  
      const payload = session.createSessionPayload(tenantId,tenantName,userId,productId,endpointUrl,status,bearerTokenHash)
      const options = session.put_Session(Sessionurl,payload)
      cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     });
   })  
})

Then("Execute PUT API for incorrect SessionId of length {int}", (len) => {
   cy.get('@POSTResponse').then((option)=>{ 
   const ranstr = Date.now()
     const Sessionurl = session.createSessionUrl(session.creatingIDWithSpecificLength(len))
     const tenantId = option.body.tenantId
     const tenantName = option.body.tenantName
     const userId = option.body.userId
     const productId = option.body.productId
        const endpointUrl =  "https://Testing"+ranstr+ranstr
        const status = "Logged-in" 
        const bearerTokenHash = option.body.bearerTokenHash  
        const payload = session.createSessionPayload(tenantId,tenantName,userId,productId,endpointUrl,status,bearerTokenHash)
        const options = session.put_Session(Sessionurl,payload)
        cy.wrap(options).as('PUTOption') 
       cy.request(options).then((res)=>{
          cy.wrap(res).as('PUTResponse')
       });
})
})

Given("Execute queried GET API on Session controller on attribute {string} with operator as {string}", (attributeName ,operator ) => {   
     cy.get('@POSTResponse').then((option)=>{
     const url = session.createSessionRSQLUrl(attributeName,operator,option.body[attributeName])
      const options = session.get_ListSessions(url)   
      cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
    })  
})

Then("Validate the queried value for {string} operator in Session Controller", (operator) => {
   cy.log("Quering to check the equal to operator")
   cy.get('@GETResponse').then((response)=>{
      basicAssertions.assertFieldValueInResponse("count" , 1 , response)

}) 
})


Then("Validate the queried value for bearerTokenHash and count", (operator) => {
   cy.get('@GETResponse').then((option)=>{
      var bearerTokenHashFromGet = option.body[0].bearerTokenHash
      cy.get('@POSTResponse').then((res)=>{
      basicAssertions.assertFieldValueInResponse("bearerTokenHash" , bearerTokenHashFromGet ,res)
      })
})
})

Given("Execute multiple queried GET API on Session controller on attribute {string} and {string} with operator as {string} and {string}", (attributeName1,attributeName2 ,operator1,operator2 ) => {   
   cy.get('@POSTResponse').then((option)=>{
   const url = session.createSessionRSQLUrl(attributeName1,operator1,option.body[attributeName1],attributeName2,operator2,option.body[attributeName2])
    cy.log(url)
    const options = session.get_ListSessions(url)   
    cy.request(options).then((res)=>{
    cy.wrap(res).as('GETResponse')
   });
  })  
})

Then("Validate the queried value for {string} not equal operator in Session Controller", (operator) => {
   cy.log("Quering to check the not equal to operator")
   cy.get('@GETResponse').then((response)=>{
      basicAssertions.assertFieldValueInResponseNotEqual("count" , 1 , response)

}) 
})

Then("Test data delete", () => {
   cy.log("Testing delete")
})