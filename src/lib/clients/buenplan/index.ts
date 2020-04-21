import { getConfig } from '../../../config';
import { BuenPlanAPI } from './buenplan';

const config = getConfig();

const client = new BuenPlanAPI(config.buenPlanUrl, config.buenPlanApiKey);
export default client;