import { test } from '@japa/runner'

import { OTP } from "#domain/entities/opt"
import { GenerateOTP } from "#application/use_cases/generate_otp"
import { FindOtpByEmail } from "#application/use_cases/find_otp_by_email"
import { ValidateOtp } from '#application/use_cases/validate_otp'

class Logger {
  info(message: string) {
    console.log(`[INFO] ${message}`)
  }

  error(message: string){
    console.log(`[ERROR] ${message}`)
  }
}

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

  async findOtpByEmailAndCode(email: string, code: string): Promise<OTP|null> {
    const otp = this.data.filter((item) => item.email === email && item.code === code)

    if (otp.length > 0 && otp[0].isExpired()) {
      return null
    }

    return otp[0]
  }

  async markAsUsed(code: string): Promise<void> {
    const otp = this.data.filter((item) => item.code === code)

    if (otp.length > 0) {
      otp[0].setUsedAt(new Date())
    }
  }
}

test.group('Use cases', () => {
  test('should generate an OTP and validate if it has not expired', async ({ assert }) => {
    const repo = new MockOtpRepository()
    const logger = new Logger()
    const useCase = new GenerateOTP(repo, logger)
    const result = await useCase.execute({ email: "caiomdev@gmail.com" })

    assert.isBelow(result.createdAt, result.expiresAt)
    assert.isFalse(result.isExpired())
    assert.isFalse(result.isUsed())
  })

  test('should find an OTP by email', async ({ assert }) => {
    const repo = new MockOtpRepository()
    const logger = new Logger()
    const useCaseGenerateOtp = new GenerateOTP(repo, logger)
    const otp = await useCaseGenerateOtp.execute({ email: "caiomdev@gmail.com" })

    const useCaseFindOtp = new FindOtpByEmail(repo, logger)
    const nullableResult = await useCaseFindOtp.execute({ email: "caio@gmail.com" })
    const validResult = await useCaseFindOtp.execute({ email: "caiomdev@gmail.com" })

    assert.isNull(nullableResult)
    assert.isNotNull(validResult)
    assert.strictEqual(otp.code, validResult?.code)
  })

  test('should validate a valid OTP and invalidate it', async ({ assert }) => {
    const repo = new MockOtpRepository()
    const logger = new Logger()
    const createdAt = new Date()
    const expiresAt = new Date(createdAt.getTime() + 60 * 1000)
    const otp = new OTP(1, 'A1B2C3', 'caiomdev@gmail.com', expiresAt, createdAt)
    await repo.save(otp)

    const useCaseValidateOtp = new ValidateOtp(repo, logger)
    const firstTimeOtpValidation = await useCaseValidateOtp.execute({ email: "caiomdev@gmail.com", code: 'A1B2C3'})

    assert.isUndefined(firstTimeOtpValidation)

    try {
      await useCaseValidateOtp.execute({ email: "caiomdev@gmail.com", code: 'A1B2C3'})
      assert.fail('Expected exception')
    } catch(error) {
      assert.equal(error.message, 'Token has expired')
    }
  })
})