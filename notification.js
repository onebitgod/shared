import admin from 'firebase-admin';
import Notification from './models/notification.js';
import { logger } from 'shared/index.js';
import { axiosClient } from './helpers.js';
import serviceAccount from './google-service.js';

const httpRequest = async (url, body) => {
  const config = {
    headers: {
      apiSecret: process.env.GALLABOX_API_SECERET,
      apiKey: process.env.GALLABOX_API_KEY,
      'content-type': 'application/json',
    },
  };
  return await axiosClient().post(url, body, config);
};

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
});

const fcm = admin.messaging();

export const sendPushNotification = async ({
  title = '',
  body = '',
  fcmToken,
  image = null,
  accountId = null,
  data = {},
}) => {
  try {
    const message = {
      token: fcmToken,
      notification: {
        title: title,
        body: body,
      },
      android: {
        // notification: {
        //   imageUrl: image ?? '',
        // },
      },
      data: data ?? {},
    };
    console.log(message);

    const result = await fcm.send(message);
    if (accountId != null) {
      const notification = new Notification({
        title: title,
        body: body,
        data: data,
        image: image ?? '',
        accountId: accountId,
      });
      await notification.save();
    }

    return result;
  } catch (error) {
    logger.error(error);
  }
};

export const sendWhatsAppMessage = async (
  templateId,
  mobile,
  body,
  media,
  mediaName
) => {
  console.log(body, mobile, templateId, media);
  try {
    const data = await httpRequest(process.env.GALLABOX_BASE_URL, {
      channelId: process.env.GALLABOX_CHANNEL_ID,
      channelType: 'whatsapp',
      recipient: {
        name: body.name ?? 'User',
        phone: `91${mobile}`,
      },
      whatsapp: {
        type: 'template',
        template: {
          templateName: templateId,
          bodyValues: body,
          headerValues: {
            mediaUrl: media,
            mediaName: mediaName,
          },
        },
      },
    });

    return {
      ...data.data,
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};
