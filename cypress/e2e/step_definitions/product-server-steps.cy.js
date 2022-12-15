import { When, Given, Then, Step, After } from "@badeball/cypress-cucumber-preprocessor";
import ProductServer from "../../support/APILib/ProductServer"
import Product from "../../support/APILib/Product"
import Server from "../../support/APILib/Server"
import BasicAssertions from "../../support/BasicAssertions";

const productserver = new ProductServer();
const product = new Product();
const server = new Server();

const basicAssertions = new BasicAssertions();
const nonExistentID = 1234567

After({ tags: "@product-delete" }, function () {
   cy.deleteTestProduct()
});

After({ tags: "@server-delete" }, function () {
   cy.deleteTestServers()
});


Given("Execute GET API for fetching the list of products for a given server id", () => {
   cy.get('@ServerID').then((id) => {
      const url = productserver.createProductServerUrl(id)
      const options = productserver.get_listProductServerRel(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('GETResponse')
      });
   })
})

Given("Execute GET API for fetching the list of products for a given server id where relationship doesn't exist", () => {
   cy.get('@POSTResponse').then((option) => {
      const serverid = option.body.id
      const url = productserver.createProductServerUrl(serverid)
      const options = productserver.get_listProductServerRel(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('GETResponse')
      });
   })
})

Given("Execute GET API for fetching specific product for a given server id", () => {
   cy.get('@ServerID').then((serverid) => {
      cy.get('@ProductID').then((productid) => {
         const url = productserver.createProductServerUrl(serverid, productid)
         const options = productserver.get_listProductServerRel(url)
         cy.request(options).then((res) => {
            cy.wrap(res).as('GETResponse')
         });
      })
   })
})

Given("Execute PUT API for establishing product and server relationship", function () {
   //post for product
   const ranstr = Date.now()
   const producturl = product.createProductUrl()
   const companyName = "auto" + ranstr
   const productName = "auto" + ranstr
   const uniqueproductId = "de85399f-7b5e-40a6-a12f-94e8429cfbac"
   const productpayload = product.createProductPayload(companyName, productName, uniqueproductId)
   const productoptions = product.post_CreateProduct(producturl, productpayload)
   cy.request(productoptions).then((productres) => {
      const productid = productres.body.id
      this.POSTResponseProduct = productres
      //post for server
      const serverurl = server.createServerUrl();
      const serverName = "auto" + ranstr;
      const serverpayload = server.putServerPayload(serverName);
      const serveroptions = server.post_CreateServer(serverurl, serverpayload);
      cy.request(serveroptions).then((serverres) => {
         const serverid = serverres.body.id
         this.POSTResponseServer = serverres
         //put request for establishing relation.
         const url = productserver.createProductServerUrl(serverid, productid)
         cy.wrap(productid).as('ProductID')
         cy.wrap(serverid).as('ServerID')
         const options = productserver.put_ProducttoServer(url)
         cy.request(options).then((res) => {
            cy.wrap(res).as('PUTResponse')
         })
      });
   });
});

Given("Execute DELETE API for deleting product and server relationship", () => {
   cy.get('@productID').then((id) => {
      const url = productserver.createProductServerUrl(3, id)
      const options = productserver.delete_ProductbyServerId(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('DELETEResponse')
      });
   })
});

Given("Execute PUT API for non-existing product and existing server", () => {
   // post server
   const serverid = 3
   const url = productserver.createProductServerUrl(serverid, nonExistentID)
   const options = productserver.put_ProducttoServer(url)
   cy.request(options).then((res) => {
      cy.wrap(res).as('PUTResponse')
   });
});

Given("Execute PUT API for existing product and non-existing server", () => {
   const ranstr = Date.now()
   const producturl = product.createProductUrl()
   const companyName = "auto" + ranstr
   const productName = "auto" + ranstr
   const uniqueproductId = "de85399f-7b5e-40a6-a12f-94e8429cfbac"
   const productpayload = product.createProductPayload(companyName, productName, uniqueproductId)
   const productoptions = product.post_CreateProduct(producturl, productpayload)
   cy.request(productoptions).then((productres) => {
      const productid = productres.body.id
      const url = productserver.createProductServerUrl(nonExistentID, productid)
      const options = productserver.put_ProducttoServer(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('PUTResponse')
      });
   })
});

Given("Execute GET API for fetching the list of servers for a given product id", () => {
   cy.get('@ProductID').then((id) => {
      const url = productserver.createServerProductUrl(id)
      const options = productserver.get_listProductServerRel(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('GETResponse')
      });
   })
})

Given("Execute GET API for fetching the list of servers for a given product id where relationship doesn't exist", () => {
   cy.get('@POSTResponse').then((option) => {
      const productid = option.body.id
      const url = productserver.createServerProductUrl(productid)
      const options = productserver.get_listProductServerRel(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('GETResponse')
      });
   })
})

Given("Execute GET API for fetching the list of servers for a non existing product id", () => {
   const url = productserver.createServerProductUrl(nonExistentID)
   const options = productserver.get_listProductServerRel(url)
   cy.request(options).then((res) => {
      cy.wrap(res).as('GETResponse')
   });
})