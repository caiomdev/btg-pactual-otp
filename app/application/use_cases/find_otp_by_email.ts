import { OTP } from "#domain/entities/opt"
import { OtpRepositoryInterface } from "#application/use_cases/otp_repository_interface"
import { FindOtpDTO } from "#application/use_cases/FindOtpByEmailDTO"

export class FindOtpByEmail {
  constructor(readonly otpRepository: OtpRepositoryInterface) {}

  async execute(data: FindOtpDTO): Promise<OTP|null> {
    const otp = await this.otpRepository.findOtpByEmail(data.email)

    if (!otp || otp.isExpired() || otp.isUsed()) {
      return null
    }

    return otp
  }
}