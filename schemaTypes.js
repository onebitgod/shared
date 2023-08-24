import mongoose from 'mongoose';
import { getS3Url } from './s3.js';

const schemaTypes = {
    S3: {
        type: String,
        get: getS3Url,
    },
    ObjectId: mongoose.Types.ObjectId,
};

export default schemaTypes;
