class Config {
  #SERVER_HOST = 'http://localhost:9000'
  #API_PREFIX = '/api/v1'

  getApiPath() {
    return this.#SERVER_HOST + this.#API_PREFIX
  }
}

export const config = new Config()