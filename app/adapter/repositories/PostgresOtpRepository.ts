import { OTP } from "#domain/entities/OTP"
import { OtpRepository } from "#domain/repositories/OtpRepository"
import OtpModel from "#models/otp"
import { DateTime } from "luxon"

export class PostgresOtpRepository implements OtpRepository {
  async save(otp: OTP): Promise<OTP> {
    const insert = await OtpModel.create(this.toModel(otp))
    return this.toEntity(insert)
  }

  private toEntity(model: OtpModel): OTP {
    return new OTP(
      model.id,
      model.code,
      model.email,
      model.expiresAt.toJSDate(),
      model.createdAt.toJSDate(),
    )
  }

  private toModel(otp: OTP): Partial<OtpModel> {
    return {
      code: otp.code,
      email: otp.email,
      createdAt: DateTime.fromJSDate(otp.createdAt),
      expiresAt: DateTime.fromJSDate(otp.expiresAt)
    }
  }
}