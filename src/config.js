class Config {
  #SERVER_HOST = 'https://muzsoyuz.herokuapp.com'
  #API_PREFIX = '/api/v1'

  getApiPath() {
    return this.#SERVER_HOST + this.#API_PREFIX
  }
}

export const config = new Config()