export type AppConfig = {
 db_uri: string;
}

export const getConfig = (): AppConfig => {
  return {
    db_uri: process.env.DB_URI,
  }
}