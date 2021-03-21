import { Request } from '../utils/request'
import { config } from '../config'

export class MuzSoyuz extends Request {
  setToken(token) {
    this.setHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    })

    return this
  }

  static getUserProfile() {
    return this.get('/user')
  }

  static makeAuthentication(route, body) {
    return this.post(`/auth/${route}`, body)
  }

  static getTokenAfterSocialOauth(provider, query) {
    return this.get(`/oauth/${provider}/callback${query}`)
  }

  static getRoles() {
    return this.get('/meta/roles')
  }

  static makeJobOffer(body) {
    return this.post('/user/offers', body)
  }

  static getJobOffers(params) {
    return this.post('/user/offers/find', params)
  }

  static makeProfileUpdate(changes) {
    return this.put('/user', changes)
  }

  static getDaysOff(days) {
    return this.get('/user/daysOff', days)
  }

  static setDayOff(day) {
    return this.post('/user/daysOff', day)
  }

  static deleteDayOff(id) {
    return this.delete(`/user/daysOff/${id}`)
  }

  static updateImage(body, fileType) {
    return this.post(`/user/uploadImage?type=${fileType}`, body)
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

    console.log({
      method: this.method,
      url   : this.url,
      body  : this.body
    })

    return super.execute()
  }
}