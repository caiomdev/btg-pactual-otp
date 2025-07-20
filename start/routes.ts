/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { PostgresOtpRepository } from '#interface/repositories/postgres_otp_repository'
import { FindOtpByEmail } from '#application/use_cases/find_otp_by_email'
import { GenerateOTP } from '#application/use_cases/generate_otp'
import router from '@adonisjs/core/services/router'
import OtpStoreController from '#interface/controller/otp_store_controller' 
import OtpValidateController from '#interface/controller/otp_validate_controller'
import { AdonisStoreControllerAdapter } from '../app/infra/controllers/adonis_store_controller_adapter.js'
import { ValidateOtp } from '#application/use_cases/validate_otp'
import { AdonisValidateControllerAdapter } from '../app/infra/controllers/adonis_validate_controller_adapter.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('otp', async (context) => {
    const repo = new PostgresOtpRepository()
    const generateOtp = new GenerateOTP(repo)
    const findOtpByEmail = new FindOtpByEmail(repo)
    const controller = new OtpStoreController(generateOtp, findOtpByEmail)
    const adapter = new AdonisStoreControllerAdapter(controller)

    return adapter.store(context)
  })

  router.post('otp/validate', async (context) => {
    const repo = new PostgresOtpRepository()
    const validateOtp = new ValidateOtp(repo)
    const controller = new OtpValidateController(validateOtp)
    const adapter = new AdonisValidateControllerAdapter(controller)

    return adapter.validate(context)
  })
})
.prefix('/api')
