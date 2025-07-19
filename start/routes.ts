/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const OtpController = () => import("#controllers/otps_controller")

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('otp', [OtpController, 'store'])
  router.post('otp/validate', [OtpController, 'validate'])
})
.prefix('/api')
