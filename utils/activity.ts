export class Activity {
  static default = 'loading'

  private _activities: {
    [key: string]: boolean
  } = {}

  get loading() {
    return this.is(Activity.default)
  }

  is(key: string): boolean {
    return this._activities[key] || false
  }

  stop(key?: string) {
    key = key || Activity.default
    this._activities[key] = true
  }
  start(key: string) {
    key = key || Activity.default
    this._activities[key] = true
  }

  stopAll() {
    Object.keys(this._activities).forEach(key => {
      this._activities[key] = false
    })
  }

  isWorking() {
    let isWorking = false
    Object.keys(this._activities).some(key => {
      if (this._activities[key] === true) {
        isWorking = true
        return true
      }
    })
    return isWorking
  }
}
