export declare namespace ErrorPayload {
  enum ResponseCode {
      ERROR_INVALID_INPUT = 0,
      ERROR_FORBIDDEN = 1,
      ERROR_UNKNOWN_RESOURCE = 2,
      ERROR_UNKNOWN = 3,
      ERROR_SERVER = 4,
      ERROR_MFA_CHALLENGE = 5,
      ERROR_TIMEOUT = 6
  }
  interface RequestFailure {
      code: ResponseCode;
      error: true;
      referenceId: string;
      message?: string;
      payload?: {
          [key: string]: string | number | boolean;
      };
  }
}
export namespace Models {
  export type APIFetchStatus = {
    loading: boolean;
    error?: ErrorPayload.RequestFailure;
    lastFetchTime: number;
  };

  export type HomePage = {
    name: string;
    description: string;
    heroImages: Array<{
      id: string;
      name: string;
      imageUrl: string;
      copyTitle: string;
      copyText: string;
    }>
    featuredBusinesses: BusinessListItem[];
    industries: Array<{
      id: string;
      name: string;
      backgroundImageUrl: string;
    }>;
    
  }

  export type BusinessListItem = {
    id: string;
    name: string;
    address: string;
    imageUrls: string[];
    maxDiscount: number;
  }
}