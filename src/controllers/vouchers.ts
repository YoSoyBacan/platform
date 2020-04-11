import e, { Response, Router, Request } from 'express';
import { apiWrapper } from './common';
import { Business } from '../models';
import * as Constants from '../util/constants';
const router = Router({ mergeParams: true});

interface BusinessVoucherResponse {
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

const doGetVouchers = apiWrapper.bind(
  apiWrapper,
  'GET:/api/vouchers/:businessId',
  async (req: Request, res: Response) => {
    const business = await Business.findById(req.params.businessId);
    const businessVouchers = business.voucherOptions;
    
    const tarjetas_disponibles = Object.keys(Constants.VoucherOptionValuesC).filter((voucherOpt) => {
      const voucherValue = (Constants.VoucherOptionValuesC as any)[voucherOpt];
      if (businessVouchers.find((businessVouchers)=> (businessVouchers.value === voucherValue))) {
        return false
      } else {
        return true
      }
    });

    const response: BusinessVoucherResponse = {
      data: {
        tarjetas_publicadas: businessVouchers.map((voucherOption) => {
          const discountStr = `${voucherOption.discount * 100}%`;
          return {
            valor: voucherOption.value,
            descuento: discountStr,
            fecha_creacion: voucherOption.createdAt,
            numero_de_ventas: 0 //TODO find out this number Model count 
          }
        }),
        tarjetas_disponibles: tarjetas_disponibles.map((valor) => {
          return {
            valor: (Constants.VoucherOptionValuesC as any)[valor]
          }
        })
      }
    }
    
    return res.json(response);
  }
)

router.get('/:businessId', doGetVouchers);
export default router;