import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { ReactNode } from "react";
import { render } from "@react-email/render";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "maxkrasnov6298@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD, // The 16-character App Password
  },
});

interface SendMailProps {
  to: string;
  subject: string;
  template: ReactNode;
}

export const sendEmail = async ({
  subject,
  template,
  to,
}: SendMailProps) => {
  const html = await render(template);
  try {
    const mailOptions: Mail.Options = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Письмо отправлено:", result.messageId);
  } catch (error) {
    console.error("Ошибка отправки:", error);
    throw error
  }
};
