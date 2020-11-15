class ResponseError extends Error {
  constructor(error, response) {
    super(error.message || error);

    this.error = error
    this.status = error.status
    this.headers = response.headers
    this.response = response
    this.message = error.message || error
  }
}

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

module.exports = {
  assert,
  ResponseError
}

