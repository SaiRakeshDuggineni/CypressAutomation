import RestController from "./RestController";
import group from "../../fixtures/APITemplates/Group.json"

class Group extends RestController {

	constructor() {
		super();
		this.baseUrl = Cypress.env("apiBaseURL");
	}

	createGroupUrl(resPath) {
		const url = this.createAPIURL(this.baseUrl, "groups", resPath);
		return url;
	}

	post_CreateGroup(url, payload) {
		const options = this.postOptions(url, payload);
		options.failOnStatusCode = false;
		return options;
	}

	get_ListGroup(url) {
		const options = this.getOptions(url);
		options.failOnStatusCode = false;
		return options;
	}


	del_Group(url) {
		const options = this.deleteOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	patch_Group(url, payload) {
		const options = this.patchOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	put_Group(url, payload) {
		const options = this.putOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	putGroupPayload(tenantId,groupName, params) {
		group.putGroup.tenantId = tenantId;  
		group.putGroup.groupName = groupName;
	    return group.putGroup;
	}

	patchGroupPayload(externalUserId,email,tenantId, params) {
		// user.patchUser.externalUserId = externalUserId;
		// user.patchUser.email = email;
		// user.patchUser.tenantId = tenantId; 
		// return user.patchUser;
	}

	patchNonColGroupPayload(externalUserId,email,tenantId, params) {
		// user.patchNonPayloadUser.externalUserId = externalUserId;
		// user.patchNonPayloadUser.email = email;
		// user.patchNonPayloadUser.tenantId = tenantId;  
		// return user.patchNonPayloadUser ;
	}

	createGroupPayload(tenantId,groupName, params) {
		group.createGroup = {}
        group.createGroup.tenantId = tenantId;  
		group.createGroup.groupName = groupName;
		return group.createGroup;
	}

}

export default Group;