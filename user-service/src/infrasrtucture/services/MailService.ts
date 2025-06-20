import { IMailService } from "../../domain/services/IMailService";
import nodemailer from 'nodemailer';
import environment from "../config/environment";

export class MailService implements IMailService {
  async sendOtpEmail(email: string, otp: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: environment.EMAIL,
          pass: environment.APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: environment.EMAIL,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
      };
      console.log(mailOptions);

      await transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${email}`);
    } catch (error: any) {
      console.error("Error sending OTP:", error.message || error);
      throw new Error("Failed to send OTP. Please try again later.");
    }
  }
}
