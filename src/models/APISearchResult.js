import { Show } from '@/models/Show'

export class APISearchResult {
  get score () { return this._score }
  set score (score) { this._score = score }

  get show () { return this._show }
  set show (show) {
    this._show = Object.assign(
      new Show(), show
    )
  }
}
