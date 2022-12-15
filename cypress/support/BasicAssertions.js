class BasicAssertions{
    

	assertResponseCode(response, expectedStatus) {
		expect(response.status).to.equal(expectedStatus, `expecting ${expectedStatus} and recieved ${response.status}`);
	}

	
	assertResponseMessage(response, expected_message) {
		expect(response.body.message).to.equal(expected_message, `expecting ${expected_message} and recieved ${response.body.message}`);
	}

	assertResponseErrorCode(response, expected_errorcode) {
		expect(response.body.errorCode).to.equal(expected_errorcode, `expecting ${expected_errorcode} and recieved ${response.body.errorCode}`);
	}

	// assertResponseMessageDetails(response, expected_message){
	// 	expect(response.body.details[0]).to.equal(expected_message, `expecting ${expected_message} and recieved ${response.body.details[0]}`);
	// }

    assertValueExistInArray(array, value) {
		expect(array).to.include(value, `$expecting ${value} in array ${array}`);
	}

	assertValueNotExistInArray(array, value) {
		expect(array).to.not.include(value, `$not expecting ${value} in array ${array}`);
	}

	assertFieldValueInResponse(fieldName , expectedValue , response) {
	expect(response.body[fieldName]).to.equal(expectedValue, `expecting ${expectedValue} and recieved ${response.body[fieldName]}`);	} 

	assertFieldValueInResponseNotEqual(fieldName , expectedValue , response) {
		expect(response.body[fieldName]).to.not.equal(expectedValue, `expecting ${expectedValue} and recieved ${response.body[fieldName]}`);	} 
	

// Regular expression to check if string is a valid UUID
	 assertIfValidUUID(str) {      
		const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;   
		expect(regexExp.test(str)).to.be.true ; 
	}
	
}

export default BasicAssertions;