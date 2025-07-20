import type { HttpContext } from '@adonisjs/core/http'
import OtpValidateController from '#interface/controller/otp_validate_controller'

export class AdonisValidateControllerAdapter {
  constructor (private controller: OtpValidateController) {}

  async validate({ request, response }: HttpContext ) {
    return this.controller.validate(request, response)
  }
}