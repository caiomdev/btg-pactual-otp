import { OTP } from "#domain/entities/opt"
import { OtpRepositoryInterface } from "#application/contracts/otp_repository_interface"
import { FindOtpDTO } from "#application/use_cases/find_otp_by_email_dto"
import { LoggerInterface } from "#application/contracts/logger_interface"

export class FindOtpByEmail {
  constructor(
    private readonly otpRepository: OtpRepositoryInterface,
    private readonly logger: LoggerInterface
  ) {}

  async execute(data: FindOtpDTO): Promise<OTP|null> {
    this.logger.info(`[find otp by email] check if a valid token already exists for ${data.email}`)
    const otp = await this.otpRepository.findOtpByEmail(data.email)

    if (!otp || otp.isExpired() || otp.isUsed()) {
      this.logger.info(`[find otp by email] [find otp by email] there is no valid token for ${data.email}`)
      return null
    }

    this.logger.info(`[find otp by email] there is already a valid token for ${data.email}`)
    return otp
  }
}