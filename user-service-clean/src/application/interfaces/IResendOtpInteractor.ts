import {
  sendResetOtpRequestDTO,
  sendResetOtpResponseDTO,
} from "../dtos/resendOtpDTO";

export interface IResendOtpInteractor {
  execute(body: sendResetOtpRequestDTO): Promise<sendResetOtpResponseDTO>;
}
