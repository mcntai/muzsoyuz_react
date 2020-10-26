import { Request } from './utils/request'

export class MuzSoyuzRequest extends Request {
  sendToken() {
    this.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`

    return this
  }

  static makeAuthentication(route, body) {
    return this.post(`/auth/${route}`, this.body = body)
  }

  static getTokenAfterSocialOauth(provider, query) {
    return this.get(`/auth/oauth/${provider}/callback/${query}`)
  }

  static makeJobOffer(body) {
    return this.post('/job', this.body = body)
  }

  static getJobOffers(jobType) {
    return this.get('/job')
      .query({ jobType })
  }

  props(array) {
    return this.query({ props: array })
  }
}