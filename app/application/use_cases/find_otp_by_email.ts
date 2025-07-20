import { OTP } from "#domain/entities/opt"
import { OtpRepositoryInterface } from "#application/contracts/otp_repository_interface"
import { FindOtpDTO } from "#application/use_cases/find_otp_by_email_dto"

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