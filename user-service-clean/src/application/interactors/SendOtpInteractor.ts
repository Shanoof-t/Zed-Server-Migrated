import { inject } from "inversify";
import { SendOtpRequestDTO, SendOtpResponseDTO } from "../dtos/sendOtpDTO";
import { ISendOtpInteractor } from "../interfaces/ISendOtpInteractor";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import CustomError from "../../shared/utils/CustomError";
import { IOtpService } from "../../domain/services/IOtpService";
import { IMailService } from "../../domain/services/IMailService";

export class SendOtpInteractor implements ISendOtpInteractor {
  private repository: IUserRepository;
  private otpService: IOtpService;
  private mailService: IMailService;
  constructor(
    @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository,
    @inject(INTERFACE_TYPE.OtpService) otpService: IOtpService,
    @inject(INTERFACE_TYPE.MailService) mailService: IMailService
  ) {
    this.repository = repository;
    this.otpService = otpService;
    this.mailService = mailService;
  }

  async execute(body: SendOtpRequestDTO): Promise<SendOtpResponseDTO> {
    const { email } = body;
    const user = await this.repository.findByEmail(email);
    if (user) throw new CustomError("User already exist !", 400);
    const otp = this.otpService.generateOtp();
    await this.mailService.sendOtpEmail(email, otp);
    return {
        email,
        otp
    }
  }
}
