// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("deleteTestUsers", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiBaseURL")}/users`,
    // headers: auth, not implemented yet
  })
    .its("body")
    .then((body) => {
      const idList = [];
      body.forEach((element) => {
        if (element.email.startsWith("autoTest")) {
          idList.push(element.userId);
        }
      });
      idList.forEach((id) => {
        cy.request({
          method: "DELETE",
          url: `${Cypress.env("apiBaseURL")}/users/${id}`,
          // headers: auth,  not implemented yet
        });
      });
    });
});

Cypress.Commands.add("deleteTestTenant", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiTenantURL")}/tenants`,
    // headers: auth, not implemented yet
  })
    .its("body.result")
    .then((result) => {
      const tenantNameList = [];
      result.forEach((element) => {
        if (element.tenantName.startsWith("auto")) {
          tenantNameList.push(element.tenantId);
        }
      });
      console.log(tenantNameList)
      tenantNameList.forEach((id) => {
        cy.request({
          method: "DELETE",
          url: `${Cypress.env("apiTenantURL")}/tenants/${id}`,
          // headers: auth,  not implemented yet
        });
      });
    });
});

Cypress.Commands.add("deleteTestServers", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiServerURL")}/server`,
    // headers: auth, not implemented yet
  })
    .its("body")
    .then((result) => {
      const serverNameList = [];
      result.forEach((element) => {
        if (element.name.startsWith("auto")) {
          serverNameList.push(element.serverId);
        }
      });
      console.log(serverNameList)
      serverNameList.forEach((id) => {
        cy.request({
          method: "DELETE",
          url: `${Cypress.env("apiServerURL")}/server/${id}`,
          // headers: auth,  not implemented yet
        });
      });
    });
});

Cypress.Commands.add("deleteTestProduct", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiProductURL")}/products`,
    // headers: auth, not implemented yet
  })
    .its("body")
    .then((result) => {
      const productNameList = [];
      result.forEach((element) => {
        if (element.productName.startsWith("auto")) {
          productNameList.push(element.productId);
        }
      });
      productNameList.forEach((id) => {
        cy.request({
          method: "DELETE",
          url: `${Cypress.env("apiProductURL")}/products/${id}`,
        });
      });
    });
});

Cypress.Commands.add("deleteTestResource", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiResourceURL")}/resources`,
    // headers: auth, not implemented yet
  })
    .its("body")
    .then((result) => {
      const resourceNameList = [];
      result.forEach((element) => {
        if (element.resource.startsWith("auto")) {
          resourceNameList.push(element.resourceId);
        }
      });
      console.log(resourceNameList)
      resourceNameList.forEach((id) => {
        cy.request({
          method: "DELETE",
          url: `${Cypress.env("apiResourceURL")}/resources/${id}`,
          // headers: auth,  not implemented yet
        });
      });
    });
});

Cypress.Commands.add("deleteTestFeature", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiBaseQAURL")}/features`,
    // headers: auth, not implemented yet
  })
        const featureNameList = [];
      result.forEach((element) => {
        if (element.feature.startsWith("AutomationFeature")) {
          featureNameList.push(element.featureId);
        }
      });
      console.log(featureNameList)
      featureNameList.forEach((id) => {
        cy.request({
          method: "DELETE",
          url: `${Cypress.env("apiBaseQAURL")}/features/${id}`,
          // headers: auth,  not implemented yet
        });
      });
});

  Cypress.Commands.add("deleteTestResourceUsage", () => {
    cy.request({
    method: "GET",
    url: `${Cypress.env("apiResourceUsageURL")}/resource-usages`,
    // headers: auth, not implemented yet
    })
    .its("body")
    .then((result) => {
      const resourceUsageList = [];
      result.forEach((element) => {
        if (element.resource.resource.startsWith("auto")) {
          resourceUsageList.push(element.resourceUsageId);
        }
      });
      console.log(resourceUsageList)
      resourceUsageList.forEach((id) => {
        cy.request({
          method: "DELETE",
          url: `${Cypress.env("apiResourceUsageURL")}/resource-usages/${id}`,
          // headers: auth,  not implemented yet
        });
      });
    });
});
  
Cypress.Commands.add("deleteTenantSecLinkedtoTenants", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiBaseURL")}/tenant-sec`,
    // headers: auth, not implemented yet
  })
    .its("body")
    .then((result) => {
      const tenantSecList = [];
      // const tenantList = [];
      result.forEach((element) => {
        const tenantSecId = element.tenantSecId
        cy.request({
          method: "GET",
          url: `${Cypress.env("apiBaseURL")}/tenants/${element.tenantId}`,
          // headers: auth,  not implemented yet
        })
        .then((result)=>{
            if (result.body.tenantName.startsWith("auto")) {
               tenantSecList.push(tenantSecId)
               console.log("Test")
            }
          // tenantList.push(element.tenantId);
        })   
      });

      // console.log(tenantSecList)
      tenantSecList.forEach((id) => {
        cy.request({
          method: "DELETE",
          url: `${Cypress.env("apiBaseURL")}/tenant-sec/${id}`,
          // headers: auth,  not implemented yet
        });
      });
    });
});


Cypress.Commands.add("deleteTestGroups", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiBaseURL")}/groups`,
    // headers: auth, not implemented yet
  })
    .its("body")
    .then((body) => {
      const idList = [];
      body.forEach((element) => {
        if (element.groupName.startsWith("autoTest")) {
          idList.push(element.groupId);
        }
      });
      idList.forEach((id) => {
        cy.request({
          method: "DELETE",
          url: `${Cypress.env("apiBaseURL")}/groups/${id}`,
          // headers: auth,  not implemented yet
        });
      });
    });
});