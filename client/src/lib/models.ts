//  INTERFACES FOR FRONT-END 
import { PercentageDiscount, VoucherOptionsValues, CountryOptions } from './constants';

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
    header: {
      amountRedeemed: number;
      totalClients: number;
      salesObjective: number;
      totalSales: number;
      depositedAmount:  number;
    },
    lastSales: {
      salesPerDay: Array<{
        date: Date;
        sales: number;
      }>,
      depositedMoney: Array<{
        amount: number;
        date: Date;
      }>,
      proportionOfCards: Array<{
        value: number;
        discount: number;
        percentage: number;
      }>,
      lastOrders: Array<{
        clientName: string;
        clientCity: string;
        voucherDiscount: PercentageDiscount;
        voucherAmount: VoucherOptionsValues;
        date: Date;
      }>
    }
  }
}

export interface BusinessVoucherOptionsResponse {
  data: {
    tarjetas_publicadas: Array<{
      valor: number,
      descuento: string,
      numero_de_ventas: number,
      fecha_creacion: Date
    }>,
    tarjetas_disponibles: Array<{
      valor: number
    }>
  }
}