import { FindOtpByEmail } from '#application/use_cases/find_otp_by_email'
import { GenerateOTP } from '#application/use_cases/generate_otp'
import { GenerateOtpDTO } from '#application/use_cases/generate_otp_dto'
import IHttpRequest from '#interface/http_request_interface'
import IHttpResponse from '#interface/http_response_interface'

export default class OtpStoreController {
  constructor(
    private generateOtp: GenerateOTP,
    private findOtpByEmail: FindOtpByEmail
  ) {}

  async store(request: IHttpRequest, response: IHttpResponse): Promise<void> {
    const { email } = request.body()
    const dto: GenerateOtpDTO = { email }

    const alreadyExist = await this.findOtpByEmail.execute(dto)

    if (alreadyExist) {
      return response.status(200).send({ code: alreadyExist.code })
    }

    const otp = await this.generateOtp.execute(dto)

    return response.status(201).send({ code: otp.code })
  }
}