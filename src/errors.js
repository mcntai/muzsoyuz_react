
export class ArgumentsError extends Error {
  constructor(message) {
    super(message)

    this.name = ArgumentsError.name
  }
}

export const argumentAssert = (condition, message) => {
  if (!condition) {
    throw new ArgumentsError(message)
  }
}

export class MuzSoyuzResponseError extends Error {
  constructor(error) {
    super()

    this.error = error
    this.status = this.error?.status
    this.message = this.error?.message
  }
}