import { createTransport } from "nodemailer";

import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { configs } from "./../config/app.config";
import { BaseError } from "errors";
interface CustomError extends Error {
  message: string;
  code: number;
}

interface Mail {
  subject: string;

  templateName: string;
  data: any;
  recipientEmail: string;
}
export const sendMail = async (mail: Mail) => {
  const { recipientEmail, subject } = mail;
  try {
    const emailTemplate = fs.readFileSync(
      path.join(__dirname, `../views/${mail.templateName}`),
      "utf-8"
    );
    console.log(mail, "mail");
    const compiledTemplate = handlebars.compile(emailTemplate);

    const emailBody = compiledTemplate({
      ...mail.data,
      baseurl: configs.API_DOMAIN,
    });

    let transporter = createTransport({
      host: "smtp-relay.brevo.com",
      port: 2525,
      auth: {
        user: "7af89c003@smtp-brevo.com",
        pass: "xsmtpsib-7721c67706025deddf0a963452d421a9df9a3315df40cce835643a086f683745-IzVDcUCjkaJHTS3b",
      },
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    });
    let info = await transporter.sendMail({
      from: `"Imprxx" <info@imprxx.com>`,

      to: recipientEmail,
      subject,
      html: emailBody,
    });
    transporter.verify((error, success) => {
      if (error) {
        console.error("Error verifying SMTP connection:", error);
      } else {
        console.log("SMTP connection is successful:", success);
      }
    });
  } catch (error) {
    const err = error as CustomError;
   



    throw new BaseError(
      `Something went wrong in the sendmail method.Error:${err.message}`
    );
  }
};

//f2861026380e09f6fa53213eccbabdd8
//api
//live.smtp.mailtrap.io
