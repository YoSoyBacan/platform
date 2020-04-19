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
      name: string;
      adress: string;
      registered_date: Date;
      phone_number: string;
      city: string; 
      country: string;
      email: string; 
      industry: string;
      link: string;
      avatar: string;
      images: string[];
      legalId: string;
      bank: string;
      account_number: string;
      business_description: string;
    },
    user_information: {
      name: string;
      email: string;
      phone_number: string;
      country_code: string;
    }
  }
}