import {
  sendResetOtpRequestDTO,
  sendResetOtpResponseDTO,
} from "../dtos/resendOtpDTO";

export interface ISendResendOtpInteractor {
  execute(body: sendResetOtpRequestDTO): Promise<sendResetOtpResponseDTO>;
}
