import { LoggerInterface } from "#application/contracts/logger_interface"
import { OtpRepositoryInterface } from "#application/contracts/otp_repository_interface"
import { ValidateOtpDTO } from "#application/use_cases/validate_otp_dto"

export class ValidateOtp {
  constructor(
    private readonly otpRepository: OtpRepositoryInterface,
    private readonly logger: LoggerInterface
  ) {}

  async execute(data: ValidateOtpDTO): Promise<void> {
    this.logger.info(`[validate otp] validating token for ${data.email}`)
    const otp = await this.otpRepository.findOtpByEmailAndCode(data.email, data.code)

    if (!otp) {
      this.logger.error(`[validate otp] invalid email or token (email: ${data.email}, token: ${data.code})`)
      throw new Error('Invalid email or token')
    }

    if (otp.isExpired() || otp.isUsed()) {
      this.logger.error(`[validate otp] token has expired for ${data.email}`)
      throw new Error('Token has expired')
    }

    this.logger.info(`[validate otp] Token validated and marked as used for ${data.email}`)
    await this.otpRepository.markAsUsed(otp.code)
  }
}