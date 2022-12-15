class UIController {
	constructor() {
		if (this.constructor === UIController) {
			throw "You Can Not Create Object Of PageBase, Please Extend !";
		}
	}

	enter_text(locator, text) {
		try {
			cy.get(locator).clear().type(text);
		} catch (err) {
			throw "Unable To Get Element";
		}
	}

	click_element(locator) {
		try {
			cy.get(locator).click();
		} catch (err) {
			err.message;
		}
	}

	force_click_element(locator) {
		try {
			cy.forceClick(locator);
		} catch (err) {
			err.message;
		}
	}

	mousehover(locator) {
		try {
			cy.get(locator).first().trigger("mouseover");
		} catch (err) {
			err.message;
		}
	}

	getcustomLocator(locator, placeholder, customText) {
		try {
			const customstr = locator;
			customstr.replace(placeholder, customText);
			return customstr;
		} catch (err) {
			err.message;
		}
	}

	captureScreenshotByElement(locator) {
		cy.get(locator).screenshot();
	}

	clickElementUsingText(locator) {
		cy.contains(locator).click();
	}

	selectValueFromDropdown(locator, value) {
		cy.get(locator).select(value).contains(value);
	}
	
	
}

export default UIController;
