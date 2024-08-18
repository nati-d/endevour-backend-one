import nodemailer from "nodemailer";
export interface Attachment {
  filename: string;
  path: string;
}

const sendEmailConfig = (
  sendTo: string | string[],
  subject: string,
  html: string,
  file?: Attachment[]
) => {
  const transporter = nodemailer.createTransport({
    host: "api.endevour.org",
    port: 465,
    secure: true,
    auth: {
      user: "test@api.endevour.org",
      pass: "Z2Q;@}HCl(Rx",
    },
  });

  return transporter.sendMail({
    from: "test@api.endevour.org",
    to: sendTo,
    subject: subject,
    html: html,
    attachments: file,
  });
};

export default sendEmailConfig;
