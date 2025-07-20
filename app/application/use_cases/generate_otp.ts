import { createHmac } from "crypto"
import env from "#start/env"
import { OTP } from "#domain/entities/opt"
import { OtpRepositoryInterface } from "#application/contracts/otp_repository_interface"
import { GenerateOtpDTO } from "#application/use_cases/generate_otp_dto"
import { LoggerInterface } from "#application/contracts/logger_interface"

export class GenerateOTP {
  constructor(
    private readonly otpRepository: OtpRepositoryInterface,
    private readonly logger: LoggerInterface
  ) {}

  async execute(data: GenerateOtpDTO): Promise<OTP> {
    this.logger.info(`[generate otp] generating new token for ${data.email}`)

    const expirationInSeconds = Number(env.get("OTP_EXPIRATION", 300))
    const expiresAt = new Date(Date.now() + expirationInSeconds * 1000)
    const code = this.generateToken(data.email, expiresAt)
    const otp = new OTP(1, code, data.email, expiresAt)

    await this.otpRepository.save(otp)

    this.logger.info(`[generate otp] new token generated for ${data.email}`)

    return otp
  }

  private generateToken(email: string, expiresAt: Date): string {
    const data = `${email}-${expiresAt.getTime()}`
    const hmac = createHmac('sha256', env.get('APP_KEY'))

    hmac.update(data)

    const hash = hmac.digest('hex')
    const token = hash.slice(0,6).toUpperCase()

    return token
  }
}