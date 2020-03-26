export type AppConfig = {
 app_id: string;
 secret_key: string;
 shop_id: string;
 db_uri: string;
 sunmi_base_url: string;
}

export const getConfig = (): AppConfig => {
  return {
    app_id: process.env.APP_ID,
    secret_key: process.env.SECRET_KEY,
    shop_id: process.env.SHOP_ID,
    db_uri: process.env.DB_URI,
    sunmi_base_url: process.env.SUNMI_BASE_URL
  }
}