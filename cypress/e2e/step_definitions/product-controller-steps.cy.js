import { Given, Then, After } from "@badeball/cypress-cucumber-preprocessor";
import Product from "../../support/APILib/Product";
import BasicAssertions from "../../support/BasicAssertions";
import responseCodes from "../../fixtures/TestData/ResCode.json";
import { APImessages } from "../../support/APILib/APIMessages";


const product = new Product();
const basicAssertions = new BasicAssertions();

After({ tags: "@product-delete" }, function () {
  cy.deleteTestProduct();
});

Given("Execute GET API to list all products", () => {
  const url = product.createProductUrl();
  const options = product.get_ListProducts(url);
  cy.request(options).then((res) => {
    cy.wrap(res).as("GETResponse");
  });
});

Given("Execute GET API to fetch specific product with ProductID", () => {
  cy.get("@POSTResponse").then((option) => {
    const url = product.createProductUrl(option.body.id);
    const options = product.get_ListProducts(url);
    cy.request(options).then((res) => {
      cy.wrap(res).as("GETResponse");
    });
  });
});

Given(
  "Execute GET API to fetch specific product with incorrect ProductID",
  () => {
    const rannum = Math.floor(100000000 + Math.random() * 900000000);
    // const id = rannum;
    const url = product.createProductUrl(rannum);
    const options = product.get_ListProducts(url);
    cy.wrap(options).as("GETOption");
    cy.request(options).then((res) => {
      cy.wrap(res).as("GETResponse");
    });
  }
);

Given(
  "Execute POST API to create a product with random product name without optional fields",
  () => {
    const ranstr = Date.now();
    const url = product.createProductUrl();
    const productName = "auto" + ranstr;
    const baseUrl = "threadintel"+ranstr+".io"
    const payload = product.createProductPayload(productName,baseUrl);
    const options = product.post_CreateProduct(url, payload);
    cy.wrap(options).as("POSTOption");
    cy.request(options).then((res) => {
      cy.wrap(res).as("POSTResponse");
    });
  }
);

Given(
  "Execute POST API to create a product with duplicate product name without optional fields",
  () => {
    cy.get("@POSTResponse").then((option) => {
      const url = product.createProductUrl();
      console.log(option.body.productName);
      const productName = option.body.productName;
      const baseUrl = option.body.baseUrl;
      const payload = product.createProductPayload(productName,baseUrl);
      let duplicate = product.post_CreateProduct(url, payload);
      cy.request(duplicate).then((res) => {
        cy.wrap(res).as("POSTResponse");
      });
    });
  }
);

Then(
  "Execute POST API to create a product without providing {string}",
  (attribute) => {
    const ranstr = Date.now();
    const url = product.createProductUrl();
    const productName = "auto" + ranstr;
    const baseUrl ="auto" + ranstr;
    const payload = product.createProductPayload(productName,baseUrl);
    delete payload[attribute];
    const options = product.post_CreateProduct(url, payload);
    cy.request(options).then((res) => {
      cy.wrap(res).as("POSTResponse");
    });
  }
);

Given(
  "Execute POST API to create a product with {string} more than {int} characters",
  (attribute, len) => {
    const url = product.createProductUrl();
    const ranstr = Date.now();
    let productName = "auto" + ranstr;
    let baseUrl = "auto" + ranstr;
    const payload = product.createProductPayload(productName,baseUrl);
    delete payload[attribute];
    productName = product.creatingStringWithSpecificLength(len + 1);
    payload[attribute] = productName;
    const options = product.post_CreateProduct(url, payload);
    cy.request(options).then((res) => {
      cy.wrap(res).as("POSTResponse");
    });
  }
);

Given(
  "Execute POST API to create a product with optional field {string} more than {int} characters",
  (attribute, len) => {
    const url = product.createProductUrl();
    const ranstr = Date.now();
    let productName = "auto" + ranstr;
    let baseUrl = "auto" + ranstr;
    const payload = product.createProductPayload(productName,baseUrl);
    delete payload[attribute];
    const baseURL = product.creatingStringWithSpecificLength(len + 5);
    payload[attribute] = baseURL;
    const options = product.post_CreateProduct(url, payload);
    cy.request(options).then((res) => {
      cy.wrap(res).as("POSTResponse");
    });
  }
);

Given(
  "Execute PUT API to modify specific product with correct ProductID",
  () => {
    cy.get("@POSTResponse").then((option) => {
      const ranstr = Date.now();
      const url = product.createProductUrl(option.body.productId);
      let productName = "auto"+"modified"+ ranstr;
      let baseUrl = "threadintel"+ranstr+".io"
      const payload = product.createProductPayload(productName,baseUrl);
      const options = product.put_ModifyProduct(url, payload);
      cy.request(options).then((res) => {
        cy.wrap(res).as("PUTResponse");
      });
    });
  }
);

Given(
  "Execute PUT API to modify specific product with incorrect ProductID",
  () => {
    const ranstr = Date.now();
    const rannum = Math.floor(100000000 + Math.random() * 900000000);
    const id = rannum;
    const url = product.createProductUrl(id);
    let productName = "auto" + ranstr;
    let baseUrl ="threadintel"+ranstr+".io"
    const payload = product.createProductPayload(productName,baseUrl);
    const options = product.put_ModifyProduct(url, payload);
    cy.request(options).then((res) => {
      cy.wrap(res).as("PUTResponse");
    });
  }
);

Given(
  "Execute PATCH API to update specific Product with mandatory field",
  () => {
    cy.get("@POSTResponse").then((option) => {
      const ranstr = Date.now();
      const url = product.createProductUrl(option.body.productId);
      const productName = "auto" + ranstr;
      const baseUrl = option.body.BaseUrl;
      const payload = product.patchProductPayload(productName,baseUrl);
      const options = product.patch_UpdateProduct(url, payload);
      cy.wrap(options).as("PATCHOption");
      cy.request(options).then((res) => {
        cy.wrap(res).as("PATCHResponse");
      });
    });
  }
);

Given("Execute PATCH API for incorrect ProductID", () => {
  const ranstr = Math.floor(100000000 + Math.random() * 900000000);
  const url = product.createProductUrl(ranstr);
  const productName = "auto" + "update" + ranstr;
  const payload = product.patchProductPayload(productName);
  const options = product.patch_UpdateProduct(url, payload);
  cy.wrap(options).as("PATCHOption");
  cy.request(options).then((res) => {
    cy.wrap(res).as("PATCHResponse");
  });
});

/*Then("Validate all the optional field values in Product post response", () => {
  cy.get("@POSTResponse").then((res) => {
    console.log(res)
    basicAssertions.assertFieldValueInResponse("baseUrl", null, res);
  });
});*/

Then("Validate created product exist in the list", () => {
  const url = product.createProductUrl();
  const options = product.get_ListProducts(url);
  let IDArray = [];
  cy.request(options).then(function (res) {
    for (let i = 0; i < res.body.length; i++) {
      IDArray.push(res.body[i].id);
    }
    cy.get("@POSTResponse").then((res) => {
      basicAssertions.assertValueExistInArray(IDArray, res.body.id);
    });
  });
});

Then("Validate deleted product does not exist in the list", () => {
  const url = product.createProductUrl();
  const options = product.get_ListProducts(url);
  let productNameArray = [];
  cy.request(options).then(function (res) {
    for (let i = 0; i < res.body.length; i++) {
      productNameArray.push(res.body[i].productName);
    }
    cy.get("@POSTResponse").then((res) => {
      basicAssertions.assertValueNotExistInArray(productNameArray, res.body.productName);
    });
  });
});

Then(
  "Validate GET status_code for {string} for incorrect ProductID",
  (status) => {
    cy.get("@GETResponse").then((res) => {
      basicAssertions.assertResponseCode(res, responseCodes.GET.codes[status]);
      cy.get("@GETOption").then((option) => {
        const index = option.url.lastIndexOf("products/");
        const id = option.url.slice(index + 6, option.url.length);
        basicAssertions.assertResponseMessage(
          res,
          APImessages.products.InValidIDErrorMessage(id)
        );
      });
    });
  }
);

Then("Execute DELETE API to delete specific product", () => {
  cy.get("@POSTResponse").then((option) => {
    const url = product.createProductUrl(option.body.productId);
    const options = product.del_Product(url);
    cy.wrap(options).as("DELETEOption");
    cy.request(options).then((res) => {
      cy.wrap(res).as("DELETEResponse");
    });
  });
});

Given(
  "Execute DELETE API to delete specific product with incorrect ProductID of length {int}",
  (len) => {
    const url = product.createProductUrl(product.creatingIDWithSpecificLength(len));
    const options = product.del_Product(url);
    cy.wrap(options).as("DELETEOption");
    cy.request(options).then((res) => {
      cy.wrap(res).as("DELETEResponse");
    });
  }
);

Then(
  "Validate DELETE status_code for {string} for incorrect ProductID",
  (status) =>
    cy.get("@DELETEResponse").then((res) => {
      basicAssertions.assertResponseCode(res, responseCodes.GET.codes[status]);
      cy.get("@DELETEOption").then((option) => {
        const index = option.url.lastIndexOf("products/");
        const id = option.url.slice(index + 6, option.url.length);
        basicAssertions.assertResponseMessage(
          res,
          APImessages.products.InValidIDErrorMessage(id)
        );
      });
    })
);
