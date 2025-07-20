import { ValidateOtp } from '#application/use_cases/ValidateOtp'
import { ValidateOtpDTO } from '#application/use_cases/ValidateOtpDTO'
import IHttpRequest from '#interface/IHttpRequest'
import IHttpResponse from '#interface/IHttpResponse'

export default class OtpValidateController {
  constructor(
    private validateOtp: ValidateOtp
  ) {}


  async validate(request: IHttpRequest, response: IHttpResponse): Promise<void> {
    const { email, code } = request.body()
    const dto: ValidateOtpDTO = { email, code }

    try {
      await this.validateOtp.execute(dto)
    } catch (error) {
      return response.status(401).send({ message: error.message })
    }

    return response.status(200).send({ message: 'Token validated' })
  }
}