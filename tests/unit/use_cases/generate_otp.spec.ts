import { test } from '@japa/runner'

import { OTP } from "#domain/entities/OTP"
import { GenerateOTP } from "#domain/use_cases/GenerateOTP"
import { FindOtpByEmail } from "#domain/use_cases/FindOtpByEmail"

class MockOtpRepository {
  public data: OTP[] = []

  async save(otp: OTP): Promise<OTP> {
    const currentOtp = new OTP(1, otp.code, otp.email, otp.expiresAt)
    this.data.push(currentOtp)

    return currentOtp
  }

  async findOtpByEmail(email: string): Promise<OTP|null> {
    const otp = this.data.filter((item) => item.email === email)

    if (otp.length > 0 && otp[0].isExpired()) {
      return null
    }

    return otp[0]
  }
}

test.group('Use cases', () => {
  test('should generate an OTP and validate if it has not expired', async ({ assert }) => {
    const repo = new MockOtpRepository()
    const useCase = new GenerateOTP(repo)
    const result = await useCase.execute({ email: "caiomdev@gmail.com" })

    assert.isBelow(result.createdAt, result.expiresAt)
    assert.isFalse(result.isExpired())
    assert.isFalse(result.isUsed())
  })

  test('should find an OTP by email', async ({ assert }) => {
    const repo = new MockOtpRepository()

    const useCaseGenerateOtp = new GenerateOTP(repo)
    const otp = await useCaseGenerateOtp.execute({ email: "caiomdev@gmail.com" })

    const useCaseFindOtp = new FindOtpByEmail(repo)
    const nullableResult = await useCaseFindOtp.execute({ email: "caio@gmail.com" })
    const validResult = await useCaseFindOtp.execute({ email: "caiomdev@gmail.com" })

    assert.isNull(nullableResult)
    assert.isNotNull(validResult)
    assert.strictEqual(otp.code, validResult?.code)
  })
})