import { makeAutoObservable } from 'mobx'

class Auth {
  profile = {}

  constructor() {
    makeAutoObservable(this)
  }

  setProfile(payload) {
    this.profile = payload
  }

  get getProfile() {
    return this.profile
  }
}

const authentication = new Auth()

export { authentication }
