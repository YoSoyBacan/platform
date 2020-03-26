import { Request, Response, Router } from 'express';

import SunmiClient from '../lib/clients/sunmi';
import { getConfig } from './../config';
import { apiWrapper } from './common';

const router = Router({ mergeParams: true });
const config = getConfig();


const doGetAllTags = apiWrapper.bind(
    apiWrapper,
    'GET:/api/tags',
    async (req: Request, res: Response) => {
      const shopId = config.shop_id
      const tags = await SunmiClient.getShopEslList({ shop_id: shopId });

      // Get the information from our Database.
      
      return res.json(tags);
    }
);

const doGetTagDetails = apiWrapper.bind(
  apiWrapper,
  'GET:/api/tags/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const tagDetails = await SunmiClient.getEslDetails({ esl_id: id, shop_id: config.shop_id });
    return res.json(tagDetails);
  }
);
const doGetShopTemplates = apiWrapper.bind(
  apiWrapper,
  'GET:/api/tags/templates',
  async (req: Request, res: Response) => {
    const tagDetails = await SunmiClient.getTemplateList({ shop_id: config.shop_id });
    return res.json(tagDetails);
  }
);

const doBindProduct = apiWrapper.bind(
  apiWrapper,
  'POST:/api/tags/bind',
  async (req: Request, res: Response) => {
    // TODO: Authentication and Authorization
    // TODO: Body Validation

    // TODO: Look in our database for a specific template of the product
    const { esl_id, product_id, template_id } = req.body;
    
    const bindResponse = await SunmiClient.bindProductToEsl({
      shop_id: config.shop_id,
      template_id,
      esl_id,
      product_id
    });
    return res.json(bindResponse);
  }
)

const doFlashLed = apiWrapper.bind(
  apiWrapper,
  'POST:/api/tags/:id/flash',
  async (req: Request, res: Response) => {
    
    const { color: channel, cycle, id: esl_id, duration } = req.body;
    await SunmiClient.postFlashLed({
      channel,
      cycle,
      esl_id,
      duration,
      shop_id: config.shop_id
    });
  }
)

router.post('/:id/flash', doFlashLed);
router.post('/bindProduct', doBindProduct);
router.get('/templates', doGetShopTemplates);
router.get('/:id', doGetTagDetails);
router.get('/', doGetAllTags);
export default router;