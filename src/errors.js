
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