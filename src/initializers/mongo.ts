import mongoose from 'mongoose';

import { getConfig } from './../config';


const initDatabase = async () => {
  const config = getConfig();
  const connectionOptions: mongoose.ConnectionOptions = {
    poolSize: 10,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  try {
    console.log('Connecting to Database');
    const connection = await mongoose.connect(config.db_uri, connectionOptions);
    console.log(`Connected to ${connection.connection.name} ${connection.connection.host}`);
  } catch(error) {
    console.error(error);
    throw error;
  }
}

export {
  initDatabase
};