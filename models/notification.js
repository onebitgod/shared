import mongoose from 'mongoose';
import { ObjectId } from '../constants.js';
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    image: {
        type: String,
        required:false
    },
    accountId: {
        type: ObjectId,
        required: true,
        ref:'account'
    }
},{ timestamps: true, id: false });

const Notification = mongoose.model('notification', schema);
export default Notification;