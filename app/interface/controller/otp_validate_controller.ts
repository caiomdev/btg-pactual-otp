import { ValidateOtp } from '#application/use_cases/validate_otp'
import { ValidateOtpDTO } from '#application/use_cases/validate_otp_dto'
import IHttpRequest from '#interface/http_request_interface'
import IHttpResponse from '#interface/http_response_interface'

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