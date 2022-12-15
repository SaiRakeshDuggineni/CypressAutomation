import { When, Given , Then, Step , After } from "@badeball/cypress-cucumber-preprocessor";
import Server from "../../support/APILib/Server"
import BasicAssertions from "../../support/BasicAssertions";

const server = new Server();
const basicAssertions = new BasicAssertions();

After({tags: "@server-delete"}, function() {
   cy.deleteTestServers()
});

Given("Execute GET API to list all Servers", () => {
   const url = server.createServerUrl()
   const options = server.get_ListServer(url)   
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})  

Given("Execute GET API to fetch specific Server with ServerID", ()=> {
   cy.get('@POSTResponse').then((option)=>{   
   const url = server.createServerUrl(option.body.id)
   const options = server.get_ListServer(url)   
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})
})

Given("Execute GET API to fetch specific Server with incorrect ServerID of length {int}", (len)=>{
   const url = server.createServerUrl(server.creatingIDWithSpecificLength(len))
   const options = server.get_ListServer(url)
   cy.wrap(options).as('GETOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})

Then("Execute POST API to create a random Server without optional fields", () =>{
   const ranstr = Date.now()
   const url = server.createServerUrl()
   const serverName = "auto"+ranstr
   const type = "MySQL"
   const serverUrl = "auto"+ranstr
   const payload = server.createServerPayload(serverName,type,serverUrl)
   const options = server.post_CreateServer(url,payload)
   cy.log(options,payload,serverName,type)
   cy.wrap(options).as('POSTOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('POSTResponse')
   });
})

Then("Execute POST API to create a server without providing {string}", (attribute) => {
   const ranstr = Date.now()
   const url = server.createServerUrl()
   const serverName = "auto"+ranstr
   const type = "auto"+ranstr
   const serverUrl = "auto"+ranstr
   const payload = server.createServerPayload(serverName,type,serverUrl)
   delete payload[attribute]
   const options = server.post_CreateServer(url,payload)
   cy.wrap(options).as('POSTOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('POSTResponse')
   });
})

Given("Execute POST API to create a server with {string} more than {int} characters",(attribute,len)=>{
   const url = server.createServerUrl()
   const ranstr = Date.now()
   let serverName = "auto"+ranstr
   let type = "auto"+ranstr
   let serverUrl = "auto"+ranstr
   let payload = server.createServerPayload(serverName,type,serverUrl)
   delete payload[attribute]
   let newAttribute = server.creatingStringWithSpecificLength(len+1)
   payload[attribute]= newAttribute
   const options = server.post_CreateServer(url,payload)
   cy.wrap(options).as('POSTOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('POSTResponse')
   });
})


Then("Validate created Server exist in the list", () => {
   const url = server.createServerUrl()
   const options = server.get_ListServer(url)  
   let serverNameArray = []; 
   cy.request(options).then(function(res){
      for (let i = 0; i < res.body.length; i++) {
        serverNameArray.push(res.body[i].name)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueExistInArray(serverNameArray, res.body.name);
      });
   });
   
});

Then("Validate deleted Server does not exist in the list", () => {
   const url = server.createServerUrl()
   const options = server.get_ListServer(url)  
   let serverNameArray = []; 
   cy.request(options).then(function(res){
      for (let i = 0; i < res.body.length; i++) {
        serverNameArray.push(res.body[i].name)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueNotExistInArray(serverNameArray, res.body.name);
      });
   });
   
});

Then("Execute DELETE API to delete specific Server", () => {
    cy.get('@POSTResponse').then((option)=>{
      const url = server.createServerUrl(option.body.serverId)
      const options = server.del_Server(url)
      cy.wrap(options).as('DELETEOption') 
      cy.request(options).then((res)=>{
         cy.wrap(res).as('DELETEResponse')
      });
    })  
})

Given("Execute DELETE API to delete specific Server with incorrect ServerID of length {int}", (len)=>{
   const url = server.createServerUrl(server.creatingIDWithSpecificLength(len))
   const options = server.del_Server(url)
   cy.wrap(options).as('DELETEOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('DELETEResponse')
   });
})

Then("Execute PATCH API to update specific Server without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = server.createServerUrl(option.body.serverId)
     const serverName = "auto"+ranstr
     const type = "auto"+ranstr
     const payload = server.patchServerPayload(serverName,type)
     const options = server.patch_Server(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for incorrect ServerID", () => {
   cy.get('@POSTResponse').then(()=>{
     const ranstr = Math.floor(100000000 + Math.random() * 900000000);
     const url = server.createServerUrl(ranstr)
     const servername = "auto"+"update"+ranstr
     const type = "auto"+"update"+ranstr
     const payload = server.patchServerPayload(type,servername)
     const options = server.patch_Server(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for non payload field for Server data service", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = server.createServerUrl(option.body.serverId)
     const serverName = "auto"+"update"+ranstr
     const NonPayloadfield = "auto"+"update"+ranstr
     const payload = server.patchNonColServerPayload(serverName, NonPayloadfield)
     const options = server.patch_Server(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PUT API to update specific Server without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = server.createServerUrl(option.body.serverId) //endpoint
     const serverName = "auto"+"modified"+ranstr
     const serverUrl = "auto"+"modified"+ranstr
     const type = option.body.name
     const payload = server.putServerPayload(serverName,type,serverUrl)
     const options = server.put_Server(url,payload)
     cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     });
   })  
})

Then("Execute PUT API for incorrect ServerID of length {int}", (len) => {
     const ranstr = Date.now()
     const url = server.createServerUrl(server.creatingIDWithSpecificLength(len))
     const serverName = "auto"+"modified"+ranstr
     const type = "auto"+"modified"+ranstr
     const serverUrl = "auto"+"modified"+ranstr
     const payload = server.putServerPayload(serverName,type,serverUrl)
     const options = server.put_Server(url,payload)
     cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     });
})

Then("Validate all the optional field values in Server post response", () => {
   cy.get('@POSTResponse').then((res)=>{
      basicAssertions.assertFieldValueInResponse("driver" , null ,res)
      basicAssertions.assertFieldValueInResponse("user" , null ,res)
      basicAssertions.assertFieldValueInResponse("password" , null ,res)
      basicAssertions.assertFieldValueInResponse("info" , null ,res)
   }) 
})


Then("Execute POST API to create server with existing Server Name to validate duplicate", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     let url = server.createServerUrl()
     const serverUrl = "auto"+"duplicate"+ranstr
     const type = "MySQL"
     const serverName = option.body.name
     const payload = server.createServerPayload(serverName,type,serverUrl)
     const options = server.post_CreateServer(url,payload)
     cy.wrap(options).as('POSTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('POSTResponse')
     });
   })  
})
