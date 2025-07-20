import IHttpRequest from '#interface/IHttpRequest'
import IHttpResponse from '#interface/IHttpResponse'

export interface OtpValidateController {
  validate(request: IHttpRequest, response: IHttpResponse): Promise<void>
}