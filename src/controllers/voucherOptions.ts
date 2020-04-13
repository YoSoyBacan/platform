import e, { Response, Router, Request } from 'express';
import { apiWrapper } from './common';
import { Business } from '../models';
import * as Constants from '../util/constants';
import { APIResponse } from '../lib/responseTypes';
import { ValidatedRequestSchema , ValidatedRequest, createValidator, ContainerTypes } from 'express-joi-validation';

const router = Router({ mergeParams: true});
const validator = createValidator();

interface UpdateVoucherOptions extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Array<{
    op: string,
    field: string, 
    value: any
  }>
}

const doGetVoucherOptions = apiWrapper.bind(
  apiWrapper,
  'GET:/api/:businessId/voucherOptions',
  async (req: Request, res: Response) => {
    const business = await Business.findById(req.params.businessId);
    const businessVoucherOptions = business.voucherOptions; //Array values discount createdAt
    
    const tarjetas_disponibles = Object.keys(Constants.VoucherOptionValuesC).filter((voucherOpt) => {
      const voucherValue = (Constants.VoucherOptionValuesC as any)[voucherOpt];
      if (businessVoucherOptions.find((businessVoucherOption)=> (businessVoucherOption.value === voucherValue))) {
        return false
      } else {
        return true
      }
    });

    const response: APIResponse.BusinessVoucherOptionsResponse = {
      data: {
        tarjetas_publicadas: business.voucherOptions.map((voucherOption) => {
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

const doChangeVoucherOption = apiWrapper.bind(
  apiWrapper,
  'PUT:/api/:businessId/voucherOptions',
  async (req: ValidatedRequest<UpdateVoucherOptions>, res: Response) => {
    const business = await Business.findById(req.params.businessId).populate("voucherOptions");

    for (const op of req.body) {
      if (op.op === 'add' || op.op === 'replace') {
        (business.voucherOptions as any)[op.field] = op.value
      } else if (op.op === 'remove') {
        delete (business.voucherOptions as any)[op.field]
      }
    }

    await business.save();
    return res.json(business);
  }
)

router.get('/:businessId/voucherOptions', doGetVoucherOptions);
router.put('/:businessId/voucherOptions', doChangeVoucherOption);

export default router;