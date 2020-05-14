// INTERFACES FROM BACKEND
import { PercentageDiscount, VoucherOptionsValues, CountryOptions } from '../util/constants';

export namespace APIResponse {
  export interface BusinessInformationResponse {
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

  export interface BusinessHome {
    data: {
      header: {
        amountRedeemed: number;
        totalClients: number;
        salesObjective: number;
        totalSales: number;
        depositedAmount: number;
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


