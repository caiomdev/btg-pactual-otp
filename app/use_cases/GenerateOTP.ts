import { createHmac } from "crypto"
import env from "#start/env"
import { OTP } from "#entities/OTP"
import { OtpRepository } from "#repositories/OtpRepository"
import { GenerateOtpDTO } from "#use_cases/GenerateOtpDTO"

export class GenerateOTP {
  constructor(readonly otpRepository: OtpRepository) {}

  async execute(data: GenerateOtpDTO): Promise<OTP> {
    const expirationInSeconds = Number(env.get("OTP_EXPIRATION", 300))
    const expiresAt = new Date(Date.now() + expirationInSeconds * 1000)
    const code = this.generateToken(data.email, expiresAt)
    const otp = new OTP('', code, data.email, expiresAt)

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