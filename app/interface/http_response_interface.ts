export default interface IHttpResponse {
  status(code: number): IHttpResponse
  send(data: Object): void
}