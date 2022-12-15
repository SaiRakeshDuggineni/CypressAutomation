

class RestController {
	constructor() {
		if (this.constructor === RestController) {
			throw "You Can Not Create Object Of Base class, Please Extend !";
		}
		// this.data = testdata.getTestData()
		//this.baseUrl = Cypress.env("apiBaseURL");
	}

	postOptions(url, payload) {
		const option = {
			//headers: "not implemented yet",
			method: "POST",
			url,
			body: payload,
		};
		return option;
	}

	getOptions(url) {
		const option = {
			//headers: "not implemented yet",
			method: "GET",
			url,
		};
		return option;
	}

	deleteOptions(url) {
		const option = {
            //headers: "not implemented yet",
			method: "DELETE",
			url,
        }     
        return option;
	}

	putOptions(url, payload) {
		const option = {
			//headers: "not implemented yet",
			method: "PUT",
			url,
			body: payload,
		};
		return option;
	}

	patchOptions(url, payload) {
		const option = {
			//headers: "not implemented yet",
			method: "PATCH",
			url,
			body: payload,
		};
		return option;
	}

	// createAPIURL = (path, resource) => {
	// 	let api_url = null;
	// 	if (path && resource) {
	// 		api_url = `${this.baseUrl + "/" + path}/${resource}`;
	// 	} else if (path) {
	// 		api_url = this.baseUrl + "/" + path;
	// 	}
	// 	return api_url;
	// };

	createAPIURL = (baseUrl, path, resource) => {
		let api_url = null;
		if (path && resource) {
			api_url = baseUrl+ "/" + path + "/"+ resource
		} else if (path) {
			api_url = baseUrl + "/" + path;
		}
		return api_url;
	};
	
	creatingStringWithSpecificLength = (len) => {
		const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    	let randomString = '';
    	for (let i = 0; i < len; i++) {
        	let randomPoz = Math.floor(Math.random() * charSet.length);
       	randomString += charSet.substring(randomPoz,randomPoz+1);
     	};
     	return randomString;
	};


	creatingIDWithSpecificLength = (len) => {
		const charSet = `${Date.now()}`;
    	let randomID = '';
    	for (let i = 0; i < len; i++) {
        	let randomPoz = Math.floor(Math.random() * charSet.length);
			randomID += charSet.substring(randomPoz,randomPoz+1);
     	};
     	return randomID;
	};
}

export default RestController;
