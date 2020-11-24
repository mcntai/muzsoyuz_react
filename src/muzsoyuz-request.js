import { Request } from './utils/request'


export class MuzSoyuzRequest extends Request {
  sendToken() {
    this.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`

    return this
  }

  static validateToken() {
    return this.get('/user/validateToken')
      .sendToken()
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

  static getJobOffers(params) {
    return this.post('/job/find', params)
  }

  static makeProfileUpdate(changes) {
    return this.patch('/user/profile/', changes)
      .sendToken()
  }

  props(array) {
    this.body.props = array

    return this
  }

  isSucceededStatus(response) {
    return !response.status || super.isSucceededStatus(response)
  }

  async execute() {
    return super.execute()
      .then(this.checkStatus.bind(this))
  }
}