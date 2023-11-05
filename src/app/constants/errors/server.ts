import { CustomError } from "../../helpers"

const SERVER_ERROR_CODE = '000'

export const INVALID_USER_ID = new CustomError({
  _code: SERVER_ERROR_CODE + '001',
  message: 'internal server error',
  status: 500,
})
