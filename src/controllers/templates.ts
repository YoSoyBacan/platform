import { Request, Response, Router } from 'express';

import SunmiClient from '../lib/clients/sunmi';
import { ITemplate, Template, TemplateColor } from '../models/Template';
import { getConfig } from './../config';
import { apiWrapper } from './common';

// import logger from '../util/logger';
const router = Router({ mergeParams: true });
const config = getConfig();

const doCreateTemplate = apiWrapper.bind(
  apiWrapper,
  'POST:/api/templates',
  async (req: Request, res: Response) => {
    const templateList = await SunmiClient.getTemplateList({
      shop_id: config.shop_id
    });

    // Add each template to the database
    const templateModels: ITemplate[] = []
    for (const template of templateList.data.template_list) {
      const newTemplate = new Template({
        providerName: template.template_name,
        name: template.template_name.includes('Base') ? 'Básico' : 'Promoción',
        providerId: template.template_id,
        templateScreen: template.template_screen,
        templateColor: TemplateColor.BLACK_WHITE_RED
      });
      templateModels.push(newTemplate);
    }
    await Template.collection.insertMany(templateModels);

    return res.json({
      data: templateModels
    });
  }
);

const doListTemplates = apiWrapper.bind(
  apiWrapper,
  'GET:/api/templates',
  async (req: Request, res: Response) => {
    const templates = await Template.find({});

    return res.json({
      data: {
        templates,
        count: templates.length
      }
    });
  }
);
router.post('/', doCreateTemplate);
// router.get('/:templateId', doGetTemplate);
router.get('/', doListTemplates);
export default router;