import { Request } from './utils/request'
import { config } from './config'

export class MuzSoyuzRequest extends Request {
  setToken(token) {
    this.setHeaders({
      Authorization: `Bearer ${token}`,
    })

    return this
  }

  static getUserProfile() {
    return this.get('/user/profile')
  }

  static makeAuthentication(route, body) {
    return this.post(`/auth/${route}`, body)
  }

  static getTokenAfterSocialOauth(provider, query) {
    return this.get(`/auth/oauth/${provider}/callback/${query}`)
  }

  static makeJobOffer(body) {
    return this.post('/job', body)
  }

  static getJobOffers(params) {
    return this.post('/job/find', params)
  }

  static makeProfileUpdate(changes) {
    return this.patch('/user/profile', changes)
  }

  static getDaysOff(days) {
    return this.get('/user/workdays', days)
  }

  static setDaysOff(days) {
    return this.post('/user/workdays', days)
  }

  props(array) {
    this.body.props = array

    return this
  }

  isSucceededStatus(response) {
    return !response.status || super.isSucceededStatus(response)
  }

  async execute() {
    this.url = config.getApiPath() + this.url

    return super.execute().then(this.checkStatus.bind(this))
  }
}