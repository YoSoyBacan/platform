import { getConfig } from '../../../config';
import { SunmiAPI } from './sunmi';

const config = getConfig();
const baseAuth = {
  app_id: config.app_id,
  random: '',
  timestamp: 0,
  sign: ''
};

const keyAuth = {
  key: config.secret_key
};
const client = new SunmiAPI(config.sunmi_base_url, baseAuth, keyAuth);

export default client;