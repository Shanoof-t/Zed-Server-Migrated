import { inject } from "inversify";
import {
  sendResetOtpRequestDTO,
  sendResetOtpResponseDTO,
} from "../dtos/resendOtpDTO";
import { ISendResendOtpInteractor } from "../interfaces/IResendOtpInteractor";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import CustomError from "../../shared/utils/CustomError";
import { IOtpService } from "../../domain/services/IOtpService";
import { IMailService } from "../../domain/services/IMailService";

export class ResendOtpInteractor implements ISendResendOtpInteractor {
  private repository: IUserRepository;
  private otpService: IOtpService;
  private mailService: IMailService;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository,
    @inject(INTERFACE_TYPE.OtpService) otpService: IOtpService,
    @inject(INTERFACE_TYPE.MailService) mailService: IMailService
  ) {
    this.otpService = otpService;
    this.repository = repository;
    this.mailService = mailService;
  }

  async execute(
    body: sendResetOtpRequestDTO
  ): Promise<sendResetOtpResponseDTO> {
    const { email } = body;
    const existEmail = await this.repository.findByEmail(email);
    if (!existEmail) throw new CustomError("User not found !", 404);
    const otp = this.otpService.generateOtp();
    await this.mailService.sendOtpEmail(email, otp)
    return { email, otp };
  }
}
