import { appEmitter } from "../app-emitters";
import prisma from "config/prisma-client";
import { sendMail } from "../../utils/sendMail";
import { Email } from "events/types/email";

export const appListeners = () => {
  Mail();
};
const Mail = () => {
  appEmitter.onEvent("email", async (data: Email) => {
    console.log(data);
    try {
      await sendMail({
        subject: data.subject,
        recipientEmail: data.recipientEmail,
        data: data.body,
        templateName: data.templateName,
      });
    } catch (error) {
      console.log(error);
    }
  });
};
