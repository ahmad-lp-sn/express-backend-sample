import { CustomError } from '../../helpers'

const USER_ERROR_CODE = '001'

export const USED_EMAIL = new CustomError({
  _code: USER_ERROR_CODE + '001',
  message: 'Email already in use',
  status: 400,
})
