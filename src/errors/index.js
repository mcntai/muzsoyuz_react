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

const mapOfferJobValidation = {
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
  },
}

const mapAuthValidation = {
  emailErr: value => {
    argumentAssert(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value), 'некоректний імейл')
  },
  passwordErr: value => {
    argumentAssert(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/.test(value), 'мінімум 8 символів включаючи цифру')
  },
  confirmErr: (prevValue, curValue) => {
    argumentAssert(prevValue === curValue, 'повторно введений пароль не співпадає')
  }
}

module.exports = {
  argumentAssert,
  mapOfferJobValidation: mapOfferJobValidation,
  mapAuthValidation    : mapAuthValidation
}
