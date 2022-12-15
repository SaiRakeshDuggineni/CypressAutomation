import RestController from "./RestController";
import session from "../../fixtures/APITemplates/Session.json"

class Session extends RestController {

	constructor() {
		super();
		this.baseUrl = Cypress.env("apiSessionURL");
	}

	createSessionUrl(resPath) {
		const url = this.createAPIURL(this.baseUrl, "sessions", resPath);
		return url;
	}

	createSessionRSQLUrl(attributeName,operator,value,attributeName2 , operator2,value2) {
		let url ; 
		if (attributeName && attributeName2)
		{
            const respath = `?query=${attributeName}${operator}${value};${attributeName2}${operator2}${value2}`
			url = this.createAPIURL(this.baseUrl,`sessions${respath}`);  

		} else
		{
			const respath = `?query=${attributeName}${operator}${value}`
			url = this.createAPIURL(this.baseUrl,`sessions${respath}`);
		}
		return url;
	}

	post_CreateSession(url, payload) {
		const options = this.postOptions(url, payload);
		options.failOnStatusCode = false;
		return options;
	}

	get_ListSessions(url) {
		const options = this.getOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	del_Session(url) {
		const options = this.deleteOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	patch_Session(url, payload) {
		const options = this.patchOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	put_Session(url, payload) {
		const options = this.putOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	putSessionPayload(tenantId,tenantName,userId,productId,endpointUrl, status, bearerTokenHash,params) {
		session.putSession.tenantId = tenantId  ;
		session.putSession.tenantName = tenantName  ;
		session.putSession.userId = userId  ;
		session.putSession.productId = productId  ;
		session.putSession.endpointUrl = endpointUrl ;
		session.putSession.status = status ;
		session.putSession.bearerTokenHash = bearerTokenHash  ;
		return session.putSession;
	}

	patchSessionPayload(status,tenantName, params) {
		session.patchSession.status = status;
		session.patchSession.tenantName = tenantName;
		return session.patchSession;
	}

	patchNonColSessionPayload(tenantName,nonPayload, params) {
		session.patchNonPayloadSession.tenantName = tenantName;
		session.patchNonPayloadSession.nonPayload = nonPayload;
		return session.patchNonPayloadSession;
	}

	createSessionPayload(tenantId,tenantName,userId,productId,endpointUrl, status, bearerTokenHash,params) {
		session.createSession = {}
		session.createSession.tenantId = tenantId  ;
		session.createSession.tenantName = tenantName  ;
		session.createSession.userId = userId  ;
		session.createSession.productId = productId  ;
		session.createSession.endpointUrl = endpointUrl;
		session.createSession.status = status ;
		session.createSession.bearerTokenHash = bearerTokenHash  ;
		return session.createSession;
	}

}

export default Session;