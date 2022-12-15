import { When, Given, Then, Step, After } from "@badeball/cypress-cucumber-preprocessor";
import TenantProduct from "../../support/APILib/TenantProduct"
import Tenant from "../../support/APILib/Tenant"
import Product from "../../support/APILib/Product"
import BasicAssertions from "../../support/BasicAssertions";

const tenantproduct = new TenantProduct();
const tenant = new Tenant();
const product = new Product();

const basicAssertions = new BasicAssertions();
const nonExistentID = 1234567

After({ tags: "@tenant-delete" }, function () {
   cy.deleteTestTenant()
});

After({ tags: "@product-delete" }, function () {
   cy.deleteTestProduct()
});


Given("Execute GET API for fetching the list of tenants for a given product id", () => {
   cy.get('@ProductID').then((id) => {
      const url = tenantproduct.createTenantProductUrl(id)
      const options = tenantproduct.get_listTenantProductRel(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('GETResponse')
      });
   })
})

Given("Execute GET API for fetching the list of tenants for a given product id where relationship doesn't exist", () => {
   cy.get('@POSTResponse').then((option) => {
      const productid = option.body.id
      const url = tenantproduct.createTenantProductUrl(productid)
      const options = tenantproduct.get_listTenantProductRel(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('GETResponse')
      });
   })
})

Given("Execute GET API for fetching specific tenant for a given product id", () => {
   cy.get('@ProductID').then((productid) => {
      cy.get('@TenantID').then((tenantid) => {
         const url = tenantproduct.createTenantProductUrl(productid, tenantid)
         const options = tenantproduct.get_listTenantProductRel(url)
         cy.request(options).then((res) => {
            cy.wrap(res).as('GETResponse')
         });
      })
   })
})

Given("Execute PUT API for establishing tenant and product relationship", function () {
   //post for tenant
   const ranstr = Date.now()
   const tenanturl = tenant.createTenantUrl()
   const companyName = "auto" + ranstr
   const tenantName = "auto" + ranstr
   const uniqueTenantId = "de85399f-7b5e-40a6-a12f-94e8429cfbac"
   const tenantpayload = tenant.createTenantPayload(companyName, tenantName, uniqueTenantId)
   const tenantoptions = tenant.post_CreateTenant(tenanturl, tenantpayload)
   cy.request(tenantoptions).then((tenantres) => {
      const tenantid = tenantres.body.id
      this.POSTResponseTenant = tenantres
      //post for product
      const producturl = product.createProductUrl();
      const productName = "auto" + ranstr;
      const productpayload = product.createProductPayload(productName);
      const productoptions = product.post_CreateProduct(producturl, productpayload);
      cy.request(productoptions).then((productres) => {
         const productid = productres.body.id
         this.POSTResponseProduct = productres
         //put request for establishing relation.
         const url = tenantproduct.createTenantProductUrl(productid, tenantid)
         cy.wrap(tenantid).as('TenantID')
         cy.wrap(productid).as('ProductID')
         const options = tenantproduct.put_TenanttoProduct(url)
         cy.request(options).then((res) => {
            cy.wrap(res).as('PUTResponse')
         });
      });
   });
});

Given("Execute DELETE API for deleting tenant and product relationship", () => {
   cy.get('@TenantID').then((id) => {
      const url = tenantproduct.createTenantProductUrl(3, id)
      const options = tenantproduct.delete_TenantbyProductId(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('DELETEResponse')
      });
   })
});

Given("Execute PUT API for non-existing tenant and existing product", () => {
   const producturl = product.createProductUrl();
   const productName = "auto" + ranstr;
   const productpayload = product.createProductPayload(productName);
   const productoptions = product.post_CreateProduct(producturl, productpayload);
   cy.request(productoptions).then((productres) => {
      const productid = productres.body.id
      const url = tenantproduct.createTenantProductUrl(productid, nonExistentID)
      const options = tenantproduct.put_TenanttoProduct(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('PUTResponse')
      });
   });
});

Given("Execute PUT API for existing tenant and non-existing product", () => {
   const ranstr = Date.now()
   const tenanturl = tenant.createTenantUrl()
   const companyName = "auto" + ranstr
   const tenantName = "auto" + ranstr
   const uniqueTenantId = "de85399f-7b5e-40a6-a12f-94e8429cfbac"
   const tenantpayload = tenant.createTenantPayload(companyName, tenantName, uniqueTenantId)
   const tenantoptions = tenant.post_CreateTenant(tenanturl, tenantpayload)
   cy.request(tenantoptions).then((tenantres) => {
      const tenantid = tenantres.body.id
      const url = tenantproduct.createTenantProductUrl(nonExistentID, tenantid)
      const options = tenantproduct.put_TenanttoProduct(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('PUTResponse')
      });
   })
});

Given("Execute GET API for fetching the list of products for a given tenant id", () => {
   cy.get('@TenantID').then((id) => {
      const url = tenantproduct.createProductTenantUrl(id)
      const options = tenantproduct.get_listTenantProductRel(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('GETResponse')
      });
   })
})

Given("Execute GET API for fetching the list of products for a given tenant id where relationship doesn't exist", () => {
   cy.get('@POSTResponse').then((option) => {
      const tenantid = option.body.id
      const url = tenantproduct.createProductTenantUrl(tenantid)
      const options = tenantproduct.get_listTenantProductRel(url)
      cy.request(options).then((res) => {
         cy.wrap(res).as('GETResponse')
      });
   })
})

Given("Execute GET API for fetching the list of products for a non existing tenant id", () => {
   const url = tenantproduct.createProductTenantUrl(nonExistentID)
   const options = tenantproduct.get_listTenantProductRel(url)
   cy.request(options).then((res) => {
      cy.wrap(res).as('GETResponse')
   });
})