import RestController from "./RestController";

class TenantProduct extends RestController {

	constructor() {
		super();
	}

	createTenantProductUrl(resPath1, resPath2) {
		let url = null;
		if (resPath1 && resPath2) {
			url = this.createAPIURL("products", resPath1 + "/tenants" + "/" + resPath2);
		} else if (resPath1) {
			url = this.createAPIURL("products", resPath1 + "/tenants");
		}
		return url;
	}

	createProductTenantUrl(resPath) {
		const url = this.createAPIURL("tenants", resPath + "/products");
		return url;
	}

	get_listTenantProductRel(url) {
		const options = this.getOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	put_TenanttoProduct(url) {
		const options = this.putOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	delete_TenantbyProductId(url) {
		const options = this.deleteOptions(url);
		options.failOnStatusCode = false;
		return options;
	}
}

export default TenantProduct;