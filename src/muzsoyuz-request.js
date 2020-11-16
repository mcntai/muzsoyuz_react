import { Request } from './utils/request'

export class MuzSoyuzRequest extends Request {
  sendToken() {
    this.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`

    return this
  }

  static getUserProfile() {
    return this.get('/user/profile')
      .sendToken()
  }

  static makeAuthentication(route, body) {
    return this.post(`/auth/${route}`, body)
  }

  static getTokenAfterSocialOauth(provider, query) {
    return this.get(`/auth/oauth/${provider}/callback/${query}`)
  }

  static makeJobOffer(body) {
    return this.post('/job', body)
      .sendToken()
  }

  static getJobOffers(jobType) {
    return this.get('/job')
      .query({ jobType })
  }

  props(array) {
    return this.query({ props: array })
  }

  isSucceededStatus(response) {
    return !response.status || super.isSucceededStatus(response)
  }

  async execute() {
    return super.execute()
      .then(this.checkStatus.bind(this))
  }
}