import RestController from "./RestController";
import feature from "../../fixtures/APITemplates/Feature.json"

class Feature extends RestController {

	constructor() {
		super();
		this.baseUrl = Cypress.env("apiBaseQAURL");
	}

	createFeatureUrl(resPath) {
		const url = this.createAPIURL(this.baseUrl, "features", resPath);
		return url;
	}

	post_CreateFeature(url, payload) {
		const options = this.postOptions(url, payload);
		options.failOnStatusCode = false;
		return options;
	}

	get_ListFeature(url) {
		const options = this.getOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	del_Feature(url) {
		const options = this.deleteOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	patch_Feature(url, payload) {
		const options = this.patchOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	put_Feature(url, payload) {
		const options = this.putOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}
    
	putFeaturePayload(productId,featureName, params) {
		feature.putFeature.productId =  productId ;
		feature.putFeature.feature = featureName    ;
		return feature.putFeature;
	}

	patchFeaturePayload(productId,featureName, params) {
		feature.patchFeature.productId =  productId;
		feature.patchFeature.feature = featureName ;
		return feature.patchFeature;
	}

	patchNonColFeaturePayload(productId,nonPayload, params) {
		feature.patchNonPayloadFeature.productId =  productId;
		feature.patchNonPayloadFeature.nonPayload = nonPayload ;
		return feature.patchNonPayloadFeature ;
	}

	createFeaturePayload(productId,featureName,params) {
		feature.createFeature = {}
		feature.createFeature.productId =  productId ;
		feature.createFeature.feature = featureName  ;
		return feature.createFeature;
	}

}

export default Feature;