import type { HttpContext } from '@adonisjs/core/http'
import { OtpStoreController } from '#interface/controller/otp_store_controller'

export class AdonisStoreControllerAdapter {
  constructor (private controller: OtpStoreController) {}

  async store({ request, response }: HttpContext ) {
    return this.controller.store(request, response)
  }
}