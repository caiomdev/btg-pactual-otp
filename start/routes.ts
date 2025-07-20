/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { PostgresOtpRepository } from '#interface/repositories/PostgresOtpRepository'
import { FindOtpByEmail } from '#application/use_cases/FindOtpByEmail'
import { GenerateOTP } from '#application/use_cases/GenerateOTP'
import router from '@adonisjs/core/services/router'
import OtpController from '#controllers/otps_store_controller'
import OtpStoreControllerImpl from '#controllers/otps_store_controller'
import OtpValidateControllerImpl from '#controllers/otps_validate_controller'
import { AdonisStoreControllerAdapter } from '../app/infra/controllers/adonis_store_controller_adapter.js'
import { ValidateOtp } from '#application/use_cases/ValidateOtp'
import { AdonisValidateControllerAdapter } from '../app/infra/controllers/adonis_validate_controller_adapter.js'

// const OtpController = () => import("#controllers/otps_controller")

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  // router.post('otp', [OtpController, 'store'])
  router.post('otp', async (context) => {
    const repo = new PostgresOtpRepository()
    const generateOtp = new GenerateOTP(repo)
    const findOtpByEmail = new FindOtpByEmail(repo)
    const controller = new OtpStoreControllerImpl(generateOtp, findOtpByEmail)
    const adapter = new AdonisStoreControllerAdapter(controller)

    // const controller = new OtpController(generateOtp, findOtp)
    return adapter.store(context)
  })

  router.post('otp/validate', async (context) => {
    const repo = new PostgresOtpRepository()
    const validateOtp = new ValidateOtp(repo)
    const controller = new OtpValidateControllerImpl(validateOtp)
    const adapter = new AdonisValidateControllerAdapter(controller)

    // const controller = new OtpController(generateOtp, findOtp)
    return adapter.validate(context)
  })
})
.prefix('/api')
