import { TvmazeAPIService } from '@/services/TvmazeAPIService'
import { Episode } from '@/models/Episode'

export class TvmazeEpisodeAPIService extends TvmazeAPIService {
  find (id) {
    return this.httpClient.get(
      this.buildUrl(`/episodes/${id}`)
    ).then((data) =>
      Object.assign(
        new Episode(),
        data
      )
    )
  }

  async asyncfind (id) {
    return this.httpClient.get(
      this.buildUrl(`/episodes/${id}`)
    ).then((data) =>
      Object.assign(
        new Episode(),
        data
      )
    ).toPromise()
  }
}
