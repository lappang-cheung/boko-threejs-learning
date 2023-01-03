import { EventEmitter } from 'events'

export default class Time extends EventEmitter {
  constructor() {
    super()
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16

    this.update()
  }

  update() {
    const currentTIme = Date.now()
    this.delta = currentTIme - this.current
    this.current = currentTIme
    this.elapsed = this.current - this.start

    this.emit('update')
    window.requestAnimationFrame(() => this.update())
  }
}