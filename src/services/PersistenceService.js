import store from '@/store'

export class PersistenceService {
  constructor (localstorage) {
    this._localstorage = localstorage
    this._key = 'tee-vee-pee-eye'
    this._defaultFollowing = { showIds: [] }
  }

  save () {
    const data = JSON.stringify(store.state.following)
    this._localstorage.set(this._key, data)
  }

  load () {
    const data = JSON.parse(this._localstorage.get(this._key)) || this._defaultFollowing
    store.commit('following', data)
  }
}
