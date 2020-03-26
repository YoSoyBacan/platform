import axios from 'axios';
import qs from 'querystring';

import { SunmiAPIModels } from './models';
import { generateSignString } from './utils';

export class SunmiAPI {
  private baseUrl: string;
  private baseAuth: SunmiAPIModels.Request.BaseAuth;
  private keyAuth: SunmiAPIModels.Request.KeyAuth;

  constructor(baseUrl: string, baseAuth: SunmiAPIModels.Request.BaseAuth, keyAuth: SunmiAPIModels.Request.KeyAuth) {
    this.baseUrl = baseUrl;
    this.baseAuth = baseAuth;
    this.keyAuth = keyAuth;
  }
  private async execute<T>(body: SunmiAPIModels.Request.BaseRequest, path: string) {

    this.baseAuth.random = Math.random().toString(36).substr(2, 8);
    this.baseAuth.timestamp = Date.now();
    const combinedBody = {
      ...this.baseAuth,
      ...body
    };
    this.baseAuth.sign = generateSignString(combinedBody, this.keyAuth);
    combinedBody.sign = this.baseAuth.sign;
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const response = await axios.post<T>(`${this.baseUrl}${path}`, qs.stringify(combinedBody), config);
    return response.data;
  }

  /**
   * Public API
   */

   /**
    * ESL
    * 
    */
  async getShopEslList(body: SunmiAPIModels.Request.GetShopEsl) {
    const response = await this.execute<SunmiAPIModels.Response.ESLShopList>(body, '/device/esl/getList');
    return response;
  }
  async getEslDetails(body: SunmiAPIModels.Request.GetEslDetails) {
    const response = await this.execute<SunmiAPIModels.Response.ESLDetails>(body, '/device/esl/getInfo');
    return response;
  }
  async getTemplateList(body: SunmiAPIModels.Request.GetShopTemplateList) {
    const response = await this.execute<SunmiAPIModels.Response.TemplatesList>(body, '/template/getList');
    return response;
  }
  async postFlashLed(body: SunmiAPIModels.Request.FlashEslLed) {
    const response = await this.execute<SunmiAPIModels.Response.FlashLedResponse>(body, '/device/esl/flashLed');
    return response;
  }

  /* Product */

  async bindProductToEsl(body: SunmiAPIModels.Request.ProductBindEsl) {
    const response = await this.execute<SunmiAPIModels.Response.BindProductToESL>(body, '/product/bindEsl	');
    return response;
  }
  async getProductBoundEsl(body: SunmiAPIModels.Request.ProductBindedEslList) {
    const response = await this.execute<SunmiAPIModels.Response.ProductBoundESLList>(body, '/product/getBindEslList');
    return response;
  }
  async getProductList(body: SunmiAPIModels.Request.GetProductList) {
    const response = await this.execute<SunmiAPIModels.Response.ProductList>(body, '/product/getList');
    return response;
  }
  async getProductInfo(body: SunmiAPIModels.Request.GetProductInfo) {
    const response = await this.execute<SunmiAPIModels.Response.ProducetDetailsResponse>(body, '/product/getInfo');
    return response;
  }
  async patchProductTemplate(body: SunmiAPIModels.Request.ProductUpdateTemplate) {
    const response = await this.execute<SunmiAPIModels.Response.UpdateProductTemplate>(body, '/product/updateTemplate');
    return response;
  }

  async createProduct(body: SunmiAPIModels.Request.CreateProduct) {
    const response = await this.execute<SunmiAPIModels.Response.CreateProduct>(body, '/product/create');
    return response;
  }

  /* Shop */
  async getShopDetails(body: SunmiAPIModels.Request.GetShopOverview) {
    const response = await this.execute<SunmiAPIModels.Response.ShopOverviewResponse>(body, '/device/getOverview');
    return response;
  }

}