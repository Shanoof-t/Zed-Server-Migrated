import otpGenerator from "otp-generator";
import { IOtpService } from "../../domain/services/IOtpService";

export class OtpService implements IOtpService {
  generateOtp(): string {
    return otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });
  }
}
