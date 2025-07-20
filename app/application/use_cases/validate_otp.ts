import { OtpRepositoryInterface } from "#application/use_cases/otp_repository_interface"
import { ValidateOtpDTO } from "#application/use_cases/validate_otp_dto"

export class ValidateOtp {
  constructor(readonly otpRepository: OtpRepositoryInterface) {}

  async execute(data: ValidateOtpDTO): Promise<void> {
    const otp = await this.otpRepository.findOtpByEmailAndCode(data.email, data.code)

    if (!otp) {
      throw new Error('Invalid email or token')
    }

    if (otp.isExpired() || otp.isUsed()) {
      throw new Error('Token has expired')
    }

    await this.otpRepository.markAsUsed(otp.code)
  }
}