import { argumentAssert } from '../errors'


const JobOfferMap = {
  titleErr  : value => {
    argumentAssert(value.length > 10, 'мінімум 10 символів')
    argumentAssert(value.length <= 250, 'максимум 250 символів')
  },
  dateErr   : value => {
    argumentAssert(/(\d{2})\.(\d{2})\.(\d{4})/.test(value), 'введіть дату в форматі ДД-ММ-РРРР')
  },
  addressErr: value => {
    argumentAssert(value.length < 250, 'максимум 250 символів')
  },
  setsErr   : value => {
    argumentAssert(!isNaN(value), 'введіть число')
    argumentAssert(value > 0 && value < 6, 'оберіть між 1 і 5 сетами')
  },
  salaryErr : value => {
    argumentAssert(!isNaN(value), 'введіть число')
    argumentAssert(value > 0, 'поставте трохи більшу зпшку')
  },
}

const AuthMap = {
  emailErr   : value => {
    argumentAssert(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value), 'некоректний імейл')
  },
  passwordErr: value => {
    argumentAssert(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/.test(value), 'мінімум 8 символів включаючи цифру')
  },
  confirmErr : (prevValue, curValue) => {
    argumentAssert(prevValue === curValue, 'пароль не співпадає')
  },
}

const getValidator = rulesMap => (fieldName, ...rest) => rulesMap[fieldName](...rest)

export const authValidator = getValidator(AuthMap)
export const jobOfferValidator = getValidator(JobOfferMap)