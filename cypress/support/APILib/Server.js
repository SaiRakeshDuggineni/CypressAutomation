import RestController from "./RestController";
import server from "../../fixtures/APITemplates/Server.json"

class Server extends RestController {

	constructor() {
		super();
		this.baseUrl = Cypress.env("apiServerURL");
	}

	createServerUrl(resPath) {
		const url = this.createAPIURL(this.baseUrl, "server", resPath);
		return url;
	}

	post_CreateServer(url, payload) {
		const options = this.postOptions(url, payload);
		options.failOnStatusCode = false;
		return options;
	}

	get_ListServer(url) {
		const options = this.getOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	del_Server(url) {
		const options = this.deleteOptions(url);
		options.failOnStatusCode = false;
		return options;
	}

	patch_Server(url, payload) {
		const options = this.patchOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	put_Server(url, payload) {
		const options = this.putOptions(url,payload);
		options.failOnStatusCode = false;
		return options;
	}

	putServerPayload(name,type,serverUrl) {
		server.putServer.name = name;
		server.putServer.type = type;
		server.putServer.url = serverUrl;
		
		return server.putServer;
	}

	patchServerPayload(name,type, params) {
		server.patchServer.name = name;
		server.patchServer.type = type;
		return server.patchServer;
	}

	patchNonColServerPayload(companyName,nonPayload, params) {
		server.patchNonPayloadServer.companyName = companyName;
		server.patchNonPayloadServer.nonPayload = nonPayload;
		return server.patchNonPayloadServer;
	}

	createServerPayload(name,type,serverUrl) {
		server.createServer = {}
		server.createServer.name = name;
		server.createServer.type = type;
		server.createServer.url = serverUrl;
		return server.createServer;
	}

}

export default Server;