import mongoose from 'mongoose';
import logger from './logger.js';

mongoose.set('strictQuery', true);
mongoose.set('id', false);
mongoose.set('toJSON', { getters: true, versionKey: false });

mongoose.set('debug', (collectionName, methodName, methodArgs) => {
  if (process.env.NODE_ENV === 'production') return;
  if (methodName === 'createIndex') return;

  console.info(
    `\x1b[32mMongoose: ${collectionName}.${methodName}(${JSON.stringify(
      methodArgs
    )}) \x1b[0m`
  );
});

mongoose.connection.on('error', (err) => {
  console.log('mongo');
  console.error(err.message);
});

export async function connectMongoDB() {
  await mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.MONGO_DB_NAME,
  });

  logger.info('MongoDB is connected');
}
