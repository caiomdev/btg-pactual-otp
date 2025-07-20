import { OTP } from "#domain/entities/opt";

export interface OtpRepositoryInterface {
  save(otp: OTP): Promise<OTP>
  findOtpByEmail(email: string): Promise<OTP|null>
  findOtpByEmailAndCode(email: string, code: string): Promise<OTP|null>
  markAsUsed(code: string): Promise<void>
}