import { OTP } from "#domain/entities/opt"
import { OtpRepositoryInterface } from "#interface/repositories/otp_repository_interface"
import OtpModel from "#models/otp"
import { DateTime } from "luxon"

export class PostgresOtpRepository implements OtpRepositoryInterface {
  async save(otp: OTP): Promise<OTP> {
    const insert = await OtpModel.create(this.toModel(otp))
    return this.toEntity(insert)
  }

  async findOtpByEmail(email: string): Promise<OTP|null> {
    const opt = await OtpModel
      .query()
      .where({ email })
      .orderBy('createdAt', 'desc')
      .first()

    if (!opt) {
      return null
    }

    return this.toEntity(opt)
  }

  async findOtpByEmailAndCode(email: string, code: string): Promise<OTP|null> {
    const opt = await OtpModel
      .query()
      .where({ email, code })
      .orderBy('createdAt', 'desc')
      .first()

    if (!opt) {
      return null
    }

    return this.toEntity(opt)
  }

  async markAsUsed(code: string): Promise<void> {
    const opt = await OtpModel
      .query()
      .where({ code })
      .first()

    opt?.merge({ usedAt: DateTime.fromJSDate(new Date()) })
    opt?.save()
  }

  private toEntity(model: OtpModel): OTP {
    return new OTP(
      model.id,
      model.code,
      model.email,
      model.expiresAt.toJSDate(),
      model.createdAt.toJSDate(),
      model.usedAt?.toJSDate()
    )
  }

  private toModel(otp: OTP): Partial<OtpModel> {
    return {
      code: otp.code,
      email: otp.email,
      createdAt: DateTime.fromJSDate(otp.createdAt),
      expiresAt: DateTime.fromJSDate(otp.expiresAt),
      usedAt: otp.usedAt !== undefined ? DateTime.fromJSDate(otp.usedAt) : undefined
    }
  }
}