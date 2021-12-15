import { makeAutoObservable } from 'mobx'

class Fav {
  notes = []

  constructor() {
    makeAutoObservable(this)
  }

  setNote(payload) {
    const isInArray = this.notes.some(({ nid }) => nid === payload.nid)

    if (!isInArray) {
      this.notes.unshift(payload)
    } else {
      this.notes = this.notes.filter(({ nid }) => nid !== payload.nid)
    }
  }

  get getNote() {
    return this.notes
  }
}

const favNote = new Fav()

export { favNote }
