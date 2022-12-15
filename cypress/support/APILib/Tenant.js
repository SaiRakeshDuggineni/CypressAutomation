import RestController from "./RestController";
import tenant from "../../fixtures/APITemplates/Tenant.json"

class Tenant extends RestController {

	constructor() {
		super();
		this.baseUrl = Cypress.env("apiTenantURL");
	}

	createTenantUrl(resPath) {
		const url = this.createAPIURL(this.baseUrl, "tenants", resPath);
		return url;
	}

	createTenantRSQLUrl(attributeName,operator,value,attributeName2 , operator2,value2) {
		let url ; 
		if (attributeName && attributeName2)
		{
            const respath = `?query=${attributeName}${operator}${value};${attributeName2}${operator2}${value2}`
			url = this.createAPIURL(this.baseUrl,`tenants${respath}`);  

		} else
		{
			const respath = `?query=${attributeName}${operator}${value}`
			url = this.createAPIURL(this.baseUrl,`tenants${respath}`);
		}
		return url;
	}

	post_CreateTenant(url, payload) {
		const options = this.postOptions(url, payload);
		options.failOnStatusCode = false;
		return options;
	}

	get_ListTenants(url) {
		const options = this.getOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	del_Tenant(url) {
		const options = this.deleteOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	patch_tenant(url, payload) {
		const options = this.patchOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	put_tenant(url, payload) {
		const options = this.putOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	putTenantPayload(companyName,tenantName, params) {
		tenant.patchTenant.companyName = companyName;
		tenant.patchTenant.tenantName = tenantName;
		return tenant.putTenant;
	}

	patchTenantPayload(companyName,tenantName, params) {
		tenant.patchTenant.companyName = companyName;
		tenant.patchTenant.tenantName = tenantName;
		return tenant.patchTenant;
	}

	patchNonColTenantPayload(companyName,nonPayload, params) {
		tenant.patchNonPayloadTenant.companyName = companyName;
		tenant.patchNonPayloadTenant.nonPayload = nonPayload;
		return tenant.patchNonPayloadTenant;
	}

	createTenantPayload(companyName,tenantName, params) {
		tenant.createTenant = {}
		tenant.createTenant.companyName = companyName;
		tenant.createTenant.tenantName = tenantName;
		// tenant.createTenant.params =params  ;
		return tenant.createTenant;
	}

}

export default Tenant;