import { Request } from './utils/request'
import { config } from './config'
import * as swal from './Components/common/alerts'


export class MuzSoyuzRequest extends Request {
  sendToken() {
    this.setHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    })

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

  static getJobOffers(params) {
    return this.post('/job/find', params)
  }

  static makeProfileUpdate(changes) {
    return this.patch('/user/profile', changes)
      .sendToken()
  }

  static getDaysOff(days) {
    return this.get('/user/workdays', days)
      .sendToken()
  }

  static setDaysOff(days) {
    return this.post('/user/workdays', days)
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
    this.url = config.getApiPath() + this.url

    return super.execute()
      .then(this.checkStatus.bind(this))
      .catch(e => {
        e.message = Array.isArray(e.message) ? e.message.join(', ') : e.message

        if (e.message === 'Bad Request Exception') {
          console.error(e.message)
          swal.error('Повідомте адміна, якщо можете', 'Щось пішло не так...')
        } else {
          throw e
        }
      })
  }
}