import { PostgresOtpRepository } from '#adapter/repositories/PostgresOtpRepository'
import { FindOtp } from '#domain/use_cases/FindOtp'
import { GenerateOTP } from '#domain/use_cases/GenerateOTP'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class OtpController {
  async store({ request, response }: HttpContext) {
    logger.info(`[${request.id()}] Generate OTP`)

    const email = request.input('email')

    const pgOtpRepo = new PostgresOtpRepository()
    const findByEmail = new FindOtp(pgOtpRepo)

    const alreadyExist = await findByEmail.execute({ email })

    if (alreadyExist) {
      return response.status(200).send({ token: alreadyExist.code })
    }

    const generateOtp = new GenerateOTP(pgOtpRepo)
    const otp = await generateOtp.execute({ email })

    return response.status(201).send({ token: otp.code })
  }
}