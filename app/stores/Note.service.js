import { makeAutoObservable } from 'mobx'

class Note {
  notes = []

  constructor() {
    makeAutoObservable(this)
  }

  setNote(payload) {
    this.notes = payload
  }

  get getNote() {
    return this.notes
  }
}

const note = new Note()

export { note }
