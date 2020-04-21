//  INTERFACES FOR FRONT-END 

export interface GetTemplatesResponse {
  TWO_ONE_INCHES: {
      templates: Array<{
        templateId: string,
        templateName:string
      }>
    },
    TWO_SIX_INCHES: {
      templates: Array<{
        templateId: string,
        templateName: string
      }>
    },
    FOUR_TWO_INCHES: {
      templates: Array<{
        templateId: string,
        templateName: string
      }>
    } 
}

export interface BusinessHomeResponse {
  data: {
    business_information: {
      legalName: string;
      businessAddress: string;
      businessRegisteredAt: Date;
      businessPhone: string;
      businessCity: string; 
      businessCountry: string;
      businessEmail: string; 
      industry: string;
      businessLink: string;
      avatarImageUrl: string;
      images: string[];
      businessLegalId: string;
      bankName: string;
      bankAccountNumber: string;
      businessDescription: string;
    },
    user_information: {
      name: string;
      email: string;
      phone_number: string;
      country_code: string;
    }
  }
}