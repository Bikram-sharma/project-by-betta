import nodemailer from "nodemailer";

type Props = {
  email: string;
  subject: string;
  message: string;
};

export const sendEmail = async ({ email, subject, message }: Props) => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error("Missing MAIL_USER or MAIL_PASS environment variables");
  }

  try {
    const transporter = nodemailer.createTransport({
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Betta Support" <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      html: `<p>${message}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to send email: ${error.message}`);
    } else {
      throw new Error(`Failed to send email: ${String(error)}`);
    }
  }
};
