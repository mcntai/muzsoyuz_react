
class ArgumentsError extends Error {
  constructor(message) {
    super(message)

    this.name = ArgumentsError.name
  }
}

const argumentAssert = (condition, message) => {
  if (!condition) {
    throw new ArgumentsError(message)
  }
}

const MapOfferJobValidation = {
  titleErr  : value => {
    argumentAssert(value.length > 10, 'Мінімум 10 символів')
    argumentAssert(value.length <= 250, 'Максимум 250 символів')
  },
  dateErr   : value => {
    argumentAssert(/(\d{2})\.(\d{2})\.(\d{4})/.test(value), 'Введіть дату в форматі ДД-ММ-РРРР')
  },
  addressErr: value => {
    argumentAssert(value.length < 250, 'Максимум 250 символів')
  },
  setsErr   : value => {
    argumentAssert(!isNaN(value), 'Введіть число')
    argumentAssert(value > 0 && value < 6, 'Оберіть між 1 і 5 сетами')
  },
  salaryErr : value => {
    argumentAssert(!isNaN(value), 'Введіть число')
    argumentAssert(value > 0, 'Поставте трохи більшу зпшку')
  }
}

module.exports = {
  argumentAssert,
  MapOfferJobValidation,
}
