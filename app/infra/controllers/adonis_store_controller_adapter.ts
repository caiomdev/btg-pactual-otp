import type { HttpContext } from '@adonisjs/core/http'
import OtpStoreController from '#interface/controller/otp_store_controller'

import { generateOtpValidator } from '#validators/otp'

export class AdonisStoreControllerAdapter {
  constructor (private controller: OtpStoreController) {}

  async store({ request, response }: HttpContext ) {
    await generateOtpValidator.validate(request.body())
    return this.controller.store(request, response)
  }
}