export namespace SunmiAPIModels {
  export namespace Request {
    export interface BaseAuth {
      app_id: string;
      random: string;
      timestamp: number;
      sign: string;
    }
    export interface KeyAuth {
      key: string;
    }
    export interface BaseRequest {
      shop_id: string;
    }

    export interface GetShopEsl extends BaseRequest {
      page_num?: number;
      page_size?: number
    };
    export interface GetEslDetails extends BaseRequest {
      esl_code?: string;
      esl_id: string;
    };
    export interface FlashEslLed extends BaseRequest {
      esl_id: string;
      channel?: number; //LED color： 1-white， 2-blue， 4-green， 8- red, 512-cyan， 1024-purple， 2048-yellow（default 4）
      cycle?: number; // Duration of a single flash 1 cycle = 10ms. (default 100)
      duration?: number; // Total flash times, default 8
    }
    export interface GetShopOverview  extends BaseRequest{
    };
    export interface GetShopTemplateList extends BaseRequest {
      page_num?: number;
      page_size?: number
    };
    export interface GetTemplateDetails extends BaseRequest {
      template_id: string;
    }

    export interface ProductBindEsl extends BaseRequest {
      product_id: string;
      template_id: string; 
      esl_code?: string;
      esl_id?: string;
    }
    export interface ProductUnbindEsl extends BaseRequest {
      esl_code?: string;
      esl_id?: string;
    }
    export interface ProductBindedEslList extends BaseRequest {
      product_id: string;
    }
    export interface ProductUpdateTemplate extends BaseRequest {
      product_id: string;
      template_id: string;
    }
    export interface GetProductInfo extends BaseRequest {
      product_id: string;
    }
    export interface GetProductList extends BaseRequest {
      keyword?: string;
      page_num?: number;
      page_size?: number;
    }
    export interface ProductBody {
      id: string;
      name: string;
      price: number;
      seq_num?: string;
      bar_code?: string;
      alias?: string;
      promote_price?: string;
      member_price?: string;
      category_id?: string;
      category_name?: string;
      spec?: string;
      unit?: string;
      level?: string;
      area?: string;
      brand?: string;
      qr_code?: string;
      expire_time?: string;
    }
    export interface CreateProduct extends BaseRequest {
      product_list: ProductBody[]
    }
    export interface UpdateProduct extends BaseRequest {
      product_list: ProductBody[];
    }
    export interface DeleteProduct {
      shop_id: string;
      product_key_list: string[];
    }
  }
  export namespace Response {
    export interface BaseErrors {
      DATABASE_ERROR: 5000,
      INVALID_PROVIDER: 5041,
    }
    export interface ESLStatus {
      NOT_ACTIVATED: 0,
      NOT_BINDED: 1,
      WAITING_FOR_DATA: 2,
      PUSH_SUCCESS: 3,
      PUSH_FAILED: 4
    }
    export interface ESLBaseRecord {
      esl_id: string;
      esl_code: string;
      esl_sn: string;
      model_name: string;
      status: ESLStatus
    }
    interface ESLShopListErrors extends BaseErrors{
      INVALID_PARAMETER: 5020;
    }
    export interface ESLShopList {
      data: {
        esl_list: ESLBaseRecord[]
      },
      msg: string;
      code: ESLShopListErrors | 0
    }
    export interface ESLFullRecord extends ESLBaseRecord {
      screen_size_name: string; // Has a chinese character at the end
      software_version: string;
      battery: number;
      rssi: number;
      connect_time: number;
      ap_id: string;
      ap_sn: string;
      ap_name: string;
    }
    interface ESLDetailsErrors extends BaseErrors {
      PARAMETER_MISSING: 5023;
      INVALID_ESL: 5502;
    }
    export interface ESLDetails {
      data: ESLFullRecord;
      code: ESLDetailsErrors | 0;
      msg: string;
    }
    interface TemplateColor {
      BLACK_WHITE: 1;
      BLACK_WHITE_RED: 2;
    };
    interface TemplateScreen {
      TWO_THIRTHEEN_INCH: 1;
      TWO_SIX_INCH: 2;
      FOUR_TWO_INCH: 3
    };
    export interface TemplateBase {
      template_id: string;
      template_name: string;
      template_screen: TemplateScreen
      template_color?: TemplateColor
    }
    interface TemplatelistErrors extends BaseErrors {
      INVALID_PARAMETERS: 5020;
    }
    export interface TemplatesList {
      data: {
        total_count: number;
        template_list: TemplateBase[]
      },
      code: 0 | TemplatelistErrors;
      msg: string;
    }
    export interface FlashLedResponse {
      code: TemplatelistErrors | 0;
      msg: string;
      data: any;
    };

    interface BindProductError extends BaseErrors {
      INVALID_PARAMETERS: 5020;
      INVALID_PRODUCTS: 5015;
      INVALID_TEMPLATE: 5343;
      INVALID_AP: 5300;
      INVALID_ESL: 5301;
      ESL_BOUNDED_TO_OTHER_SHOP: 5338;
      INVALID_ESL_IMAGE: 5342;
      OSS_ERROR: 5006;
      INVALID_PROVIDER: 5041;
    }

    export interface CreateProduct {
      code: 0 | BindProductError;
      msg: string;
      data: {
        exist_list: string[];
        invalid_list: string[]
      }
    };

    export interface BindProductToESL {
      data: any;
      code: 0 | BindProductError;
      msg: string;
    }
    interface ProductBoundESLError extends BaseErrors {
      INVALID_PARAMETERS: 5020;
      INVALID_ESL: 5301;
      INVALID_PRODUCTS: 5015;
      INVALID_PROVIDER: 5041;
    };

    export interface ProductBoundESLList {
      data: {
        esl_list: ESLBaseRecord[]
      },
      code: 0 | ProductBoundESLError;
      msg: string;
    }
    export interface ProductBase {
      id: string;
      name: string;
      seq_num: string;
      bar_code: string;
      category_id: number;
      price: number;
      modified_time: number; /* epoch */
    }

    export interface ProductList {
      data: {
        product_list: ProductBase[];
        total_count: number;
      },
      code: 0;
      msg: string;
    };
    export interface ProductDetails extends ProductBase{
      alias: string;
      qr_code: string;
      unit: string;
      spec: string;
      area: string;
      level: string;
      brand: string;
      expire_time: number;
      promote_price: number;
      member_price: number;
    }
    export interface ProducetDetailsResponse {
      data: ProductDetails,
      code: 0 | 1 /* Failure */
      msg: string;
    }
    export interface UpdateProductTemplate {
      data: any;
      code: 0 | BindProductError;
      msg: string;
    };
    export interface ShopOverviewResponse {
      data: {
        ap_total_count: number;
        esl_total_count: number;
        esl_pending_count: number;
        esl_failed_count: number;
      },
      code: 0 | 1 /* failure */
      msg: string;
    }
  }
}