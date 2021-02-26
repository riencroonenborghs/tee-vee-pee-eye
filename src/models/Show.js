// import { Schedule } from '@/models/Schedule'
import { Rating } from '@/models/Rating'
import { Network } from '@/models/Network'
import { Externals } from '@/models/Externals'
import { Image } from '@/models/Image'
import { Episode } from '@/models/Episode'

export class Show {
  get id () { return this._id }
  set id (id) { this._id = id }

  get url () { return this._url }
  set url (url) { this._url = url }

  get name () { return this._name }
  set name (name) { this._name = name }

  get type () { return this._type }
  set type (type) { this._type = type }

  get language () { return this._language }
  set language (language) { this._language = language }

  get genres () { return this._genres }
  set genres (genres) { this._genres = genres }

  get status () { return this._status }
  set status (status) { this._status = status }

  get runtime () { return this._runtime }
  set runtime (runtime) { this._runtime = runtime }

  get premiered () { return this._premiered }
  set premiered (premiered) { this._premiered = premiered }

  get officialSite () { return this._officialSite }
  set officialSite (officialSite) { this._officialSite = officialSite }

  get schedule () { return this._schedule }
  set schedule (schedule) { this._schedule = schedule }

  get rating () { return this._rating }
  set rating (rating) {
    this._rating = Object.assign(
      new Rating(), rating
    )
  }

  get weight () { return this._weight }
  set weight (weight) { this._weight = weight }

  get network () { return this._network }
  set network (network) {
    this._network = Object.assign(
      new Network(), network
    )
  }

  get webChannel () { return this._webChannel }
  set webChannel (webChannel) { this._webChannel = webChannel }

  get externals () { return this._externals }
  set externals (externals) {
    this._externals = Object.assign(
      new Externals(), externals
    )
  }

  get image () { return this._image }
  set image (image) {
    this._image = Object.assign(
      new Image(), image
    )
  }

  get summary () { return this._summary }
  set summary (summary) { this._summary = summary }

  get updated () { return this._updated }
  set updated (updated) { this._updated = updated }

  get previousEpisode () { return this._previousEpisode }
  set previousEpisode (previousEpisode) { this._previousEpisode = previousEpisode }

  get nextEpisode () { return this._nextEpisode }
  set nextEpisode (nextEpisode) { this._nextEpisode = nextEpisode }

  get following () { return this._following || false }
  set following (following) { this._following = following }

  set _links (links) {
    if (links.previousepisode) {
      this.previousEpisode = Object.assign(
        new Episode(),
        { id: this._episodeId(links.previousepisode.href) }
      )
    }
    if (links.nextepisode) {
      this.nextEpisode = Object.assign(
        new Episode(),
        { id: this._episodeId(links.nextepisode.href) }
      )
    }
  }

  get avatar () {
    return {
      'background-image': `url('${this.image.medium}')`,
      'background-size': 'cover'
    }
  }

  _episodeId (episode) {
    const matches = episode.match(/episodes\/(\d+)/)
    return parseInt(matches[1])
  }

  get active () { return this._active }
  set active (active) { this._active = active }
}
