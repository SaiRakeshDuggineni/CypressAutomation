import RestController from "./RestController";
import tenantSec from "../../fixtures/APITemplates/TenantSec.json"

class TenantSec extends RestController {

	constructor() {
		super();
		this.baseUrl = Cypress.env("apiTenantSecurityURL");
	}

	createTenantSecSecUrl(resPath) {
		const url = this.createAPIURL(this.baseUrl, "tenant-sec", resPath);
		return url;
	}

	post_CreateTenantSec(url, payload) {
		const options = this.postOptions(url, payload);
		options.failOnStatusCode = false;
		return options;
	}

	del_TenantSec(url) {
		const options = this.deleteOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	createTenantSecPayload(idpName,idpUrl,tenantId, params) {
		tenantSec.createTenantSec = {}
		tenantSec.createTenantSec.idpName = idpName;
		tenantSec.createTenantSec.idpUrl = idpUrl;
		tenantSec.createTenantSec.tenantId = tenantId;
		return tenantSec.createTenantSec;
	}

}

export default TenantSec;