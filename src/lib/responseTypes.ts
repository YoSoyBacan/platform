import { PercentageDiscount, VoucherOptionsValues, CountryOptions } from '../util/constants';

export namespace APIResponse {
  export interface BusinessResponse {
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

  export interface VentasResponse {
    data: {
    //   deposited_amount: number;
      total_number_of_vouchers_sold: number;
      total_amount_sold: number;
      total_redeemed_vouchers: number;
      voucher_list: Array<{
        voucher_discount: PercentageDiscount;
        voucher_amount: VoucherOptionsValues;
        totally_redeemed: boolean;
        voucher_order_id: string;
      }>
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

  export interface ClientesResponse {
    data: {
      total_users: number, 
      user_list: Array<{
        user_firstName: string, 
        user_lastName: string,
        user_email: string,
        user_city: string,
        user_country: CountryOptions,
      }>
    }
  }
}


