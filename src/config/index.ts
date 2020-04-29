export type AppConfig = {
 db_uri: string;
 buenPlanUrl: string;
 buenPlanApiKey: string;
}

export const getConfig = (): AppConfig => {
  return {
    db_uri: process.env.DB_URI,
    buenPlanUrl:  process.env.BUEN_PLAN_URL,
    buenPlanApiKey: process.env.BUEN_PLAN_API_KEY
  }
}