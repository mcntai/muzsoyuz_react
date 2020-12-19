class ResponseError extends Error {
  constructor(error) {
    super()

    this.error = error
    this.status = this.error?.status
    this.message = this.error?.message
  }
}

const METHODS = {
  GET   : 'GET',
  POST  : 'POST',
  PUT   : 'PUT',
  DELETE: 'DELETE',
  PATCH : 'PATCH',
}

export class Request {
  constructor({ url, method, headers, body }) {
    this.method = method
    this.url = url
    this.headers = headers || {}
    this.body = body || {}
  }

  setHeaders(headers) {
    this.headers = {
      ...this.headers,
      ...headers,
    }

    return this
  }

  query(query) {
    this.url += Object.keys(query).reduce(
      (acc, param, i, arr) => {
        const value = Array.isArray(query[param]) ? query[param].join(',') : query[param]

        acc += `${param}=${value}`

        i !== arr.length - 1 && (acc += '&')

        return acc
      }, this.url.includes('?') ? '&' : '?'
    )

    return this
  }

  static get(url) {
    return new this({
      url,
      method: METHODS.GET
    })
  }

  static post(url, body) {
    return new this({
      url,
      body,
      method: METHODS.POST
    })
  }

  static put(url, body) {
    return new this({
      url,
      body,
      method: METHODS.PUT
    })
  }

  static delete(url) {
    return new this({
      url,
      method: METHODS.DELETE
    })
  }

  static patch(url, body) {
    return new this({
      url,
      body,
      method: METHODS.PATCH
    })
  }

  then(successHandler, errorHandler) {
    this.promise = this.promise || this.execute()

    return this.promise.then(successHandler, errorHandler)
  }

  catch(errorHandler) {
    this.promise = this.promise || this.execute()

    return this.promise.catch(errorHandler)
  }

  async getError(response) {
    if (response.status === 502) {
      return 'No connection with server'
    }

    return response instanceof Response
      ? response.json()
      : response
  }

  isSucceededStatus(response) {
    return response.status >= 200 && response.status < 300
  }

  async checkStatus(response) {
    if (this.isSucceededStatus(response)) {
      return response
    }

    const error = await this.getError(response)

    return Promise.reject(new ResponseError(error))
  }

  async execute() {
    console.log(this.url)

    const requestOptions = {
      method : this.method,
      headers: this.headers,
    }

    if (Object.keys(this.body).length) {
      requestOptions.body = JSON.stringify(this.body)
      requestOptions.headers['Content-Type'] = 'application/json'
    }

    return fetch(this.url, requestOptions)
      .then(this.checkStatus.bind(this))
      .then(response => response.json())
  }
}