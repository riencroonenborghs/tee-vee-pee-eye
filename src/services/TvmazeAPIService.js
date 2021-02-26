export class TvmazeAPIService {
  constructor (httpClient) {
    this.httpClient = httpClient
    this.baseUrl = 'http://api.tvmaze.com'
  }

  buildUrl (path) {
    return `${this.baseUrl}${path}`
  }
}
