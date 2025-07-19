import { PostgresOtpRepository } from '#adapter/repositories/PostgresOtpRepository'
import { FindOtpByEmail } from '#domain/use_cases/FindOtpByEmail'
import { GenerateOTP } from '#domain/use_cases/GenerateOTP'
import { ValidateOtp } from '#domain/use_cases/ValidateOtp'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class OtpController {
  async store({ request, response }: HttpContext) {
    logger.info(`[${request.id()}] Generate OTP`)

    const email = request.input('email')

    const pgOtpRepo = new PostgresOtpRepository()
    const findByEmail = new FindOtpByEmail(pgOtpRepo)

    const alreadyExist = await findByEmail.execute({ email })

    if (alreadyExist) {
      return response.status(200).send({ token: alreadyExist.code })
    }

    const generateOtp = new GenerateOTP(pgOtpRepo)
    const otp = await generateOtp.execute({ email })

    return response.status(201).send({ token: otp.code })
  }

  async validate({ request, response }: HttpContext) {
    logger.info(`[${request.id()}] Validate an OTP`)

    const email = request.input('email')
    const code = request.input('code')

    const pgOtpRepo = new PostgresOtpRepository()
    const validateOtp = new ValidateOtp(pgOtpRepo)

    try {
      await validateOtp.execute({ email, code })
    } catch (error) {
      return response.status(401).send({ message: error.message })
    }

    return response.status(200).send({ message: 'Token validated' })
  }
}