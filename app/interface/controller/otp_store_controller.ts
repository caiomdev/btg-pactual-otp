import { FindOtpByEmail } from '#application/use_cases/FindOtpByEmail'
import { GenerateOTP } from '#application/use_cases/GenerateOTP'
import { GenerateOtpDTO } from '#application/use_cases/GenerateOtpDTO'
import IHttpRequest from '#interface/IHttpRequest'
import IHttpResponse from '#interface/IHttpResponse'

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
      return response.status(200).send({ token: alreadyExist.code })
    }

    const otp = await this.generateOtp.execute(dto)

    return response.status(201).send({ token: otp.code })
  }
}