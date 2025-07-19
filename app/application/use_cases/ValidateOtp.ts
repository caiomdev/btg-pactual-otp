import { OtpRepository } from "#domain/repositories/OtpRepository"
import { ValidateOtpDTO } from "#domain/use_cases/ValidateOtpDTO"

export class ValidateOtp {
  constructor(readonly otpRepository: OtpRepository) {}

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