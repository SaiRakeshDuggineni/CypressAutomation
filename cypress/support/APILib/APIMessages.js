export const APImessages = {

  "common": {
      "MissingMandatoryField" : "Validation Failed",
      "MissingMandatoryFieldDetails" : (attribute) => `${attribute} cannot be null`,
  } , 
  
  "users": {
      "InValidIDErrorMessage" :(id) => `User Id ${id} does not exist in table user`,
  },

  "products": {
    "InValidIDErrorMessage" :(id) => `No data found for requested Id.`,
}

  }