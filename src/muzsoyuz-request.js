import { Request } from './utils/request'
import { ResponseError } from './errors'

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

  static async getJobOffers(jobType) {
    const response = await this.get('/job')
      .query({ jobType })

    this.checkStatus(response)
    return response
  }

  props(array) {
    return this.query({ props: array })
  }

  static getError(response) {
    if (response.status === 502) {
      return 'No connection with server'
    }

    return response || `Code: ${response.status}, Message: (${response.statusText})`
  }

  static checkStatus(response) {
    if (!response.status || response.status >= 200 && response.status < 300) {
      return response
    }

    const error = this.getError(response)

    throw new ResponseError(error, response)
  }
}