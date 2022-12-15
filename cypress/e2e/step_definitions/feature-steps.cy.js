import { When, Given , Then, Step , After } from "@badeball/cypress-cucumber-preprocessor";
import Feature from "../../support/APILib/Feature"
import Product from "../../support/APILib/Product"
import BasicAssertions from "../../support/BasicAssertions";

const feature = new Feature();
const product = new Product();
const basicAssertions = new BasicAssertions();

After({tags: "@feature-delete"}, function() {
   cy.log("Delete created Feature")
   cy.deleteTestFeature()
   cy.log("Delete created Product")
   cy.deleteTestProduct()
   
});

 Given("Execute POST API to create a random Feature without optional fields to create Feature", () => {
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
      const options = feature.post_CreateFeature(Featureurl,payload)
      cy.wrap(options).as('POSTOption')
      cy.request(options).then((res)=>{
         cy.wrap(res).as('POSTResponse')
      });      
      });  
      }); 

Given("Execute GET API to list all Features", () => {
   const url = feature.createFeatureUrl()
   const options = feature.get_ListFeature(url)   
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})  

Given("Execute GET API to fetch specific Feature with FeatureId", ()=>{
   cy.get('@POSTResponse').then((option)=>{   
    const url = feature.createFeatureUrl(option.body.id)
    const options = feature.get_ListFeature(url)
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})
})

Given("Execute GET API to fetch specific Feature with incorrect FeatureId of length {int}", (len)=>{
    const url = feature.createFeatureUrl(feature.creatingIDWithSpecificLength(len))
   const options = feature.get_ListFeature(url)
   cy.wrap(options).as('GETOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('GETResponse')
   });
})

Then("Validate created Feature exist in the list", () => {
   const url = feature.createFeatureUrl()
   const options = feature.get_ListFeature(url)  
   let featureIdArray = []; 
   cy.request(options).then(function(res){
      cy.log(res)
      for (let i = 0; i < res.body.length; i++) {
        featureIdArray.push(res.body[i].featureId)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueExistInArray(featureIdArray, res.body.featureId);
      });
   });
   
});

Then("Execute POST API to create Feature with existing FeatureName to validate duplicate", () => {
   cy.get('@POSTResponse').then((option)=>{
      const url = feature.createFeatureUrl()
         const productId = option.body.productId 
         const featureName =  option.body.feature
         const payload = feature.createFeaturePayload(productId,featureName)
         const options = feature.post_CreateFeature(url,payload)
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

Given("Execute POST API to create a Feature with {string} more than {int} characters",(attribute,len)=>{
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
      let newAttribute = feature.creatingStringWithSpecificLength(len+1)
      payload[attribute]= newAttribute
      const options = feature.post_CreateFeature(Featureurl,payload)
      console.log(Featureurl,payload)
      cy.wrap(options).as('POSTOption')
      cy.request(options).then((res)=>{
         cy.wrap(res).as('POSTResponse')
      });      
      });  
 })

Then("Execute DELETE API to delete specific Feature", function() { 
   cy.get('@POSTResponse').then((option)=>{
      const url = feature.createFeatureUrl(option.body.featureId)
      const options = feature.del_Feature(url)
      cy.wrap(options).as('DELETEOption') 
      cy.request(options).then((res)=>{
         cy.wrap(res).as('DELETEResponse')
      });
    })
})

Then("Validate deleted Feature does not exist in the list", () => {
   const url = feature.createFeatureUrl()
   const options = feature.get_ListFeature(url)  
   let featureIdArray = []; 
   cy.request(options).then(function(res){
      for (let i = 0; i < res.body.length; i++) {
        featureIdArray.push(res.body[i].featureId)
      } 
   cy.get('@POSTResponse').then((res) => {
      basicAssertions.assertValueNotExistInArray(featureIdArray, res.body.featureId);
      });
   });
   
});

Given("Execute DELETE API to delete specific Feature with incorrect featureId of length {int}", (len)=>{
   const url = feature.createFeatureUrl(feature.creatingIDWithSpecificLength(len))
   const options = feature.del_Feature(url)
   cy.wrap(options).as('DELETEOption')
   cy.request(options).then((res)=>{
      cy.wrap(res).as('DELETEResponse')
   });
})

Then("Execute PATCH API to update specific Feature without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = feature.createFeatureUrl(option.body.featureId)
     const productId = option.body.productId
     const featureName  = "AutomationFeaturePatch"+ranstr
     const payload = feature.patchFeaturePayload(productId,featureName)
     const options = feature.patch_Feature(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for incorrect featureId", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Math.floor(100000000 + Math.random() * 900000000);
     const url = feature.createFeatureUrl(ranstr)
     const productId = option.body.productId
     const featureName  = "AutomationFeaturePatch"+ranstr
     const payload = feature.patchFeaturePayload(productId,featureName)
     const options = feature.patch_Feature(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PATCH API for Feature controller non payload field", () => {
   cy.get('@POSTResponse').then((option)=>{
     const ranstr = Date.now()
     const url = feature.createFeatureUrl(option.body.featureId)
     const productId = option.body.productId
     const NonPayloadfield = "auto"+"update"+ranstr
     const payload = feature.patchNonColFeaturePayload(productId, NonPayloadfield)
     const options = feature.patch_Feature(url,payload)
     cy.wrap(options).as('PATCHOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PATCHResponse')
     });
   })  
})

Then("Execute PUT API to update specific Feature without optional fields", () => {
   cy.get('@POSTResponse').then((option)=>{
   const ranstr = Date.now()
   const Featureurl = feature.createFeatureUrl(option.body.featureId)
   const productId = option.body.productId 
   const featureName =  "AutomationFeature"+ranstr+"PUTAPI"
   const payload = feature.putFeaturePayload(productId,featureName)
   const options = feature.put_Feature(Featureurl,payload)
      cy.wrap(options).as('PUTOption') 
     cy.request(options).then((res)=>{
        cy.wrap(res).as('PUTResponse')
     });
   })  
})

Then("Execute PUT API for incorrect featureId of length {int}", (len) => {
   cy.get('@POSTResponse').then((option)=>{ 
   const ranstr = Date.now()
   const Featureurl = feature.createFeatureUrl(feature.creatingIDWithSpecificLength(len))
     const productId = option.body.productId 
     const featureName =  "AutomationFeature"+ranstr+"PUTAPI"
     const payload = feature.putFeaturePayload(productId,featureName)
     const options = feature.put_Feature(Featureurl,payload)
        cy.wrap(options).as('PUTOption') 
       cy.request(options).then((res)=>{
          cy.wrap(res).as('PUTResponse')
       });
})
})
