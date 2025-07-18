import { OTP } from "#domain/entities/OTP";

export interface OtpRepository {
  save(otp: OTP): Promise<OTP>
}