import { SendOtpRequestDTO, SendOtpResponseDTO } from "../dtos/sendOtpDTO";

export interface ISendOtpInteractor {
  execute(body: SendOtpRequestDTO): Promise<SendOtpResponseDTO>;
}
