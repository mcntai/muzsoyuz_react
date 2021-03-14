//TODO: change to function

class Config {
  #SERVER_HOST = process.env.REACT_APP_ENV === 'DEV'
    ? process.env.REACT_APP_LOCAL_HOST
    : process.env.REACT_APP_PRODUCTION_HOST

  #API_PREFIX = process.env.REACT_APP_API_PREFIX

  getApiPath() {
    return this.#SERVER_HOST + this.#API_PREFIX
  }
}

export const config = new Config()