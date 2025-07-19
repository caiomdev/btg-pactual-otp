import { OTP } from "#domain/entities/OTP"
import { OtpRepository } from "#domain/repositories/OtpRepository"
import { FindOtpDTO } from "#domain/use_cases/FindOtpByEmailDTO"

export class FindOtpByEmail {
  constructor(readonly otpRepository: OtpRepository) {}

  async execute(data: FindOtpDTO): Promise<OTP|null> {
    const otp = await this.otpRepository.findOtpByEmail(data.email)

    if (!otp || otp.isExpired()) {
      return null
    }

    return otp
  }
}