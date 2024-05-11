import nodemailer from "nodemailer";
export interface Attachment {
  filename: string;
  path: string;
}

const sendEmailConfig = (
  sendTo: string,
  subject: string,
  html: string,
  file?: Attachment[]
) => {
  const transporter = nodemailer.createTransport({
    host: "endevour.org",
    port: 468,
    secure: true,
    auth: {
      user: "info@endevour.org",
      pass: "NRyo187uvFMp",
    },
  });

  return transporter.sendMail({
    from: "info@endevour.org",
    to: sendTo,
    subject: subject,
    html: html,
    attachments: file,
  });
};

export default sendEmailConfig;
