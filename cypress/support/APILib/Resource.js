import RestController from "./RestController";
import resourceJson from "../../fixtures/APITemplates/Resource.json"

class Resource extends RestController {

	constructor() {
		super();
		this.baseUrl = Cypress.env("apiResourceURL");
	}

	createResourceUrl(resPath) {
		const url = this.createAPIURL(this.baseUrl, "resources", resPath);
		return url;
	}

	get_ListResources(url) {
		const options = this.getOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	createResourcePayload(resourceN, params) {
		resourceJson.createResource = {}
		resourceJson.createResource.resource = resourceN;
		return resourceJson.createResource
	}

	post_CreateResource(url, payload){
		const options = this.postOptions(url, payload);
		options.failOnStatusCode = false;
		return options;
	}

	del_Resource(url) {
		const options = this.deleteOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	patch_resource(url, payload) {
		const options = this.patchOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	put_resource(url, payload) {
		const options = this.putOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	putResourcePayload(resourceName, params) {
		resourceJson.putResource.resource = resourceName;
		return resourceJson.putResource;
	}

	patchResourcePayload(resourceName, params) {
		resourceJson.patchResource.resource = resourceName;
		return resourceJson.patchResource;
	}

	patchNonColResourcePayload(resourceName, NonPayloadfield, params) {
		resourceJson.patchNonPayloadResource.resource = resourceName;
		resourceJson.patchNonPayloadResource.NonPayloadfield = NonPayloadfield;
		return resourceJson.patchNonPayloadResource;
	}

}

export default Resource;