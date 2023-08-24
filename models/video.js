import mongoose from 'mongoose';
import { getEnums } from '../helpers.js';
import { getS3Url } from '../s3.js';

export const VideoType = {
  GUIDE: 'guide',
  LEARN_MORE: 'learn_more',
  TESTIMONIAL: 'testimonial',
};

const schema = new mongoose.Schema(
  {
    name: { type: String },
    type: { type: String, enum: getEnums(VideoType) },
    application: { type: String },
    url: { type: String, get: getS3Url },
  },
  { timestamps: true }
);

const Video = mongoose.model('video', schema);

export default Video;
