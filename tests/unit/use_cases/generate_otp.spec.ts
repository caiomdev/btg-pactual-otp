import { test } from '@japa/runner'

import { OTP } from "#domain/entities/OTP"
import { GenerateOTP } from "#domain/use_cases/GenerateOTP"

class MockOtpRepository {
  public data: OTP[] = []

  async save(otp: OTP): Promise<OTP> {
    const currentOtp = new OTP(1, otp.code, otp.email, otp.expiresAt)
    this.data.push(currentOtp)

    return currentOtp
  }
}

test.group('Use cases - Generate OTP', () => {
  test('Generate an OTP and validate if it has not expired', async ({ assert }) => {
    const repo = new MockOtpRepository()
    const useCase = new GenerateOTP(repo)
    const result = await useCase.execute({ email: "caiomdev@gmail.com" })

    assert.isBelow(result.createdAt, result.expiresAt)
    assert.isFalse(result.isExpired())
  })
})