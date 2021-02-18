import { SERVER_ERRORS as e } from '../../constants/errors'


export const errorsMap = {
  [e.PASSWORD_IS_NOT_VALID]: 'Невірний пароль',
  [e.UNAUTHORIZED]         : 'Потрібно авторизуватись',
  [e.USER_NOT_FOUNT]       : 'Логін або пароль невірний',
}