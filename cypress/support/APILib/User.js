import RestController from "./RestController";
import user from "../../fixtures/APITemplates/User.json"

class User extends RestController {

	constructor() {
		super();
		this.baseUrl = Cypress.env("apiBaseURL");
	}

	createUserUrl(resPath) {
		const url = this.createAPIURL(this.baseUrl, "users", resPath);
		return url;
	}

	post_CreateUser(url, payload) {
		const options = this.postOptions(url, payload);
		options.failOnStatusCode = false;
		return options;
	}

	get_ListUser(url) {
		const options = this.getOptions(url);
		options.failOnStatusCode = false;
		return options;
	}


	del_User(url) {
		const options = this.deleteOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	patch_User(url, payload) {
		const options = this.patchOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	put_User(url, payload) {
		const options = this.putOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	putUserPayload(externalUserId,email,tenantId, params) {
		user.putUser.externalUserId = externalUserId;
		user.putUser.email = email;
		user.putUser.tenantId = tenantId;  
		user.putUser.tenantSecId = tenantSecId;
		return user.putUser;
	}

	patchUserPayload(externalUserId,email,tenantId, params) {
		user.patchUser.externalUserId = externalUserId;
		user.patchUser.email = email;
		user.patchUser.tenantId = tenantId; 
		return user.patchUser;
	}

	patchNonColUserPayload(externalUserId,email,tenantId, params) {
		user.patchNonPayloadUser.externalUserId = externalUserId;
		user.patchNonPayloadUser.email = email;
		user.patchNonPayloadUser.tenantId = tenantId;  
		return user.patchNonPayloadUser ;
	}

	createUserPayload(externalUserId,email,tenantId,tenantSecId, params) {
		user.createUser = {}
		user.createUser.externalUserId = externalUserId;
		user.createUser.email = email;
		user.createUser.tenantId = tenantId;  
		user.createUser.tenantSecId = tenantSecId;
		return user.createUser;
	}

}

export default User;