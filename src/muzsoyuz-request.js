import { Request } from './utils/request'

export class MuzSoyuzRequest extends Request {
  sendToken() {
    this.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`

    return this
  }

  static getJobOffers(jobType) {
    return this.get('/job')
      .query({ jobType })
  }

  props(array) {
    return this.query({ props: array })
  }
}