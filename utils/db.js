import mongoose from 'mongoose';
import logger from './logger.js';

mongoose.set('strictQuery', true);
mongoose.set('id', false);
mongoose.set('toJSON', { getters: true, versionKey: false });

mongoose.set('debug', process.env.NODE_ENV !== 'production');

mongoose.connection.on('error', (err) => {
  console.error(err);
});

export async function connectMongoDB() {
  await mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.MONGO_DB_NAME,
    ssl: process.env.MONGO_DB_SSL || false,
  });

  logger.info('MongoDB is connected');
}

export { mongoose };
