export class Country {
  get name () { return this._name }
  set name (name) { this._name = name }

  get code () { return this._code }
  set code (code) { this._code = code }

  get timezone () { return this._timezone }
  set timezone (timezone) { this._timezone = timezone }
}
