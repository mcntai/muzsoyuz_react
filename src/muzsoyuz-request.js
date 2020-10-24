import { Request } from './utils/request'

export class MuzSoyuzRequest extends Request {
  sendToken() {
    this.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`

    return this
  }

  static getFeed(type) {
    return this.get('/feed')
      .query({ feedType: type })
  }

  props(array) {
    return this.query({ props: array })
  }


}