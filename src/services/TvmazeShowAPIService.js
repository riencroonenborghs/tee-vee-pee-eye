import { TvmazeAPIService } from '@/services/TvmazeAPIService'
import { APISearchResult } from '@/models/APISearchResult'
import { Show } from '@/models/Show'

export class TvmazeShowAPIService extends TvmazeAPIService {
  search (query) {
    return this.httpClient.get(
      this.buildUrl(`/search/shows?q=${query}`)
    ).then((data) =>
      data.body.map(
        (item) =>
          Object.assign(
            new APISearchResult(),
            item
          )
      )
    )
  }

  find (id) {
    return this.httpClient.get(
      this.buildUrl(`/shows/${id}`)
    ).then((data) =>
      Object.assign(
        new Show(),
        data.body
      )
    )
  }

  async asyncFind (id) {
    return await this.httpClient.get(
      this.buildUrl(`/shows/${id}`)
    ).then((data) =>
      Object.assign(
        new Show(),
        data.body
      )
    ).toPromise()
  }
}
