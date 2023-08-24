import {
  SESClient,
  SendEmailCommand,
  SendRawEmailCommand,
} from '@aws-sdk/client-ses';

const ses = new SESClient({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const sendEmail = async (
  to,
  {
    subject = '',
    content = '',
    htmlContent = '',
    attachments = [],
    from = 'contact@bksgold.com',
  }
) => {
  const MailComposer = (await import('nodemailer/lib/mail-composer/index.js'))
    .default;

  var mail = new MailComposer({
    from: from,
    subject: subject,
    to: to,
    html: htmlContent,
    text: content,
    attachments: attachments,
  })
    .compile()
    .build();

  const command = new SendRawEmailCommand({ RawMessage: { Data: await mail } });

  await ses.send(command, (err, data) => {
    if (err) {
      console.log('Error sending email:', err);
    } else {
      console.log('Email sent successfully!');
    }
  });
};
