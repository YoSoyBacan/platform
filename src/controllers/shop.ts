import { Request, Response, Router } from 'express';

import SunmiClient from '../lib/clients/sunmi';
import { getConfig } from './../config';
import { apiWrapper } from './common';

const router = Router({ mergeParams: true });
const config = getConfig();

const doGetShopDetails = apiWrapper.bind(
  apiWrapper,
  'GET:/api/shop',
  async (req: Request, res: Response) => {
    const shopDetails = await SunmiClient.getShopDetails({
      shop_id: config.shop_id
    });
    return res.json(shopDetails);
  }
)

router.get('/', doGetShopDetails);
export default router;