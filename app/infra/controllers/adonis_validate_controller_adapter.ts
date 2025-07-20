import type { HttpContext } from '@adonisjs/core/http'
import OtpValidateController from '#interface/controller/otp_validate_controller'

import { validateOtpValidator } from '#validators/otp'

export class AdonisValidateControllerAdapter {
  constructor (private controller: OtpValidateController) {}

  async validate({ request, response }: HttpContext ) {
    await validateOtpValidator.validate(request.body())
    return this.controller.validate(request, response)
  }
}