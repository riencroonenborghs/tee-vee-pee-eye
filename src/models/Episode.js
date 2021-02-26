import { Image } from '@/models/Image'
import * as dayjs from 'dayjs'

export class Episode {
  get id () { return this._id }
  set id (id) { this._id = id }

  get url () { return this._url }
  set url (url) { this._url = url }

  get name () { return this._name }
  set name (name) { this._name = name }

  get season () { return this._season }
  set season (season) { this._season = season }

  get number () { return this._number }
  set number (number) { this._number = number }

  get airtime () { return this._airtime }
  set airtime (airtime) { this._airtime = airtime }

  get runtime () { return this._runtime }
  set runtime (runtime) { this._runtime = runtime }

  get summary () { return this._summary }
  set summary (summary) { this._summary = summary }

  get daysToGo () { return this._daysToGo }
  set daysToGo (daysToGo) { this._daysToGo = daysToGo }

  set image (image) {
    this._image = Object.assign(
      new Image(), image
    )
  }

  get image () { return this._image }

  set airdate (date) {
    this._airdate = date
    let diff = dayjs(date).valueOf() - dayjs(new Date()).startOf('day').valueOf()
    diff = diff / (24 * 60 * 60 * 1000)
    this.daysToGo = Math.round(diff)
  }

  get airdate () { return this._airdate }

  get complete () { return this.id !== undefined && this.airdate !== undefined }
}
