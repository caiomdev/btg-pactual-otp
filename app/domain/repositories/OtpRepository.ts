import { OTP } from "#domain/entities/OTP";

export interface OtpRepository {
  save(otp: OTP): Promise<OTP>
  findOtpByEmail(email: string): Promise<OTP|null>
  findOtpByEmailAndCode(email: string, code: string): Promise<OTP|null>
  markAsUsed(code: string): Promise<void>
}