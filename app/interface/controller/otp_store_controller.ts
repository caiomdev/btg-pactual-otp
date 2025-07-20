import IHttpRequest from '#interface/IHttpRequest'
import IHttpResponse from '#interface/IHttpResponse'

export interface OtpStoreController {
  store(request: IHttpRequest, response: IHttpResponse): Promise<void>
}