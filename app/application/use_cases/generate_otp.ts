import { createHmac } from "crypto"
import env from "#start/env"
import { OTP } from "#domain/entities/opt"
import { OtpRepositoryInterface } from "#application/use_cases/otp_repository_interface"
import { GenerateOtpDTO } from "#application/use_cases/generate_otp_dto"

export class GenerateOTP {
  constructor(readonly otpRepository: OtpRepositoryInterface) {}

  async execute(data: GenerateOtpDTO): Promise<OTP> {
    const expirationInSeconds = Number(env.get("OTP_EXPIRATION", 300))
    const expiresAt = new Date(Date.now() + expirationInSeconds * 1000)
    const code = this.generateToken(data.email, expiresAt)
    const otp = new OTP(1, code, data.email, expiresAt)

    await this.otpRepository.save(otp)

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