import { Country } from '@/models/Country'

export class Network {
  get id () { return this._id }
  set id (id) { this._id = id }

  get name () { return this._name }
  set name (name) { this._name = name }

  set country (country) {
    this._country = Object.assign(
      new Country(), country
    )
  }

  get country () { return this._country }
}
