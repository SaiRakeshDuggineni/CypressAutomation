import RestController from "./RestController";
import resourceUsage from "../../fixtures/APITemplates/ResourceUsage.json"

class ResourceUsage extends RestController {

	constructor() {
		super();
		this.baseUrl = Cypress.env("apiResourceUsageURL");
	}

	createResourceUsageUrl(resPath) {
		const url = this.createAPIURL(this.baseUrl, "resource-usages", resPath);
		return url;
	}

	get_ListResourceUsages(url) {
		const options = this.getOptions(url);
		options.failOnStatusCode = false;
		return options;
	}
     
	createResourceUsagePayload(resourceId, tenantId) {
		resourceUsage.createResourceUsage = {}
		resourceUsage.createResourceUsage.resourceId = resourceId;
		resourceUsage.createResourceUsage.tenantId = tenantId;
		return resourceUsage.createResourceUsage
	}

	post_CreateResourceUsage(url, payload){
		const options = this.postOptions(url, payload);
		options.failOnStatusCode = false;
		return options;
	}

	put_resourceusage(url, payload) {
		const options = this.putOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	putResourceUsagePayload(resourceId, newTenantId) {
		resourceUsage.createResourceUsage.resourceId = resourceId;
		resourceUsage.createResourceUsage.tenantId = newTenantId;
		return resourceUsage.createResourceUsage
	}

	patch_resourceusage(url, payload) {
		const options = this.patchOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	patchResourceUsagePayload(resourceId, newTenantId) {
		resourceUsage.createResourceUsage.resourceId = resourceId;
		resourceUsage.createResourceUsage.tenantId = newTenantId;
		return resourceUsage.createResourceUsage
	}
}

export default ResourceUsage;