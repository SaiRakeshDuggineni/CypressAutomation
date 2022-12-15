import RestController from "./RestController";
import product from "../../fixtures/APITemplates/Product.json"

class Product extends RestController {

	constructor() {
		super();
		this.baseUrl = Cypress.env("apiProductURL");
	}

	createProductUrl(resPath) {
		const url = this.createAPIURL(this.baseUrl, "products", resPath);
		return url;
	}

	post_CreateProduct(url, payload) {
		const options = this.postOptions(url, payload);
		options.failOnStatusCode = false;
		return options;
	}

	put_ModifyProduct(url,payload) {
		const options = this.putOptions(url, payload);
		options.failOnStatusCode = false;
		return options;

	}

	get_ListProducts(url) {
		const options = this.getOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	patch_UpdateProduct(url,payload) {
		const options = this.patchOptions(url, payload);
		options.failOnStatusCode = false;
		return options;

	}

	patchProductPayload(productName, baseUrl) {
		product.patch.productName = productName;
		product.patch.baseUrl = baseUrl;
		return product.patch;
	}

    createProductPayload(productName,baseUrl) {
		product.createProduct = {}
		product.createProduct.productName = productName;
		product.createProduct.baseUrl = baseUrl;
		return product.createProduct;
	}

	del_Product(url) {
		const options = this.deleteOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

}
export default Product;