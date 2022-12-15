import RestController from "./RestController";

class ProductServer extends RestController {

	constructor() {
		super();
	}

	createProductServerUrl(resPath1, resPath2) {
		let url = null;
		if (resPath1 && resPath2) {
			url = this.createAPIURL("servers", resPath1 + "/products" + "/" + resPath2);
		} else if (resPath1) {
			url = this.createAPIURL("servers", resPath1 + "/products");
		}
		return url;
	}

	createServerProductUrl(resPath) {
		const url = this.createAPIURL("products", resPath + "/servers");
		return url;
	}

	get_listProductServerRel(url) {
		const options = this.getOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	put_ProducttoServer(url) {
		const options = this.putOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	delete_ProductbyServerId(url) {
		const options = this.deleteOptions(url);
		options.failOnStatusCode = false;
		return options;
	}
}

export default ProductServer;