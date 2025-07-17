import { OTP } from "#entities/OTP";

export interface OtpRepository {
  save(otp: OTP): Promise<OTP>
}