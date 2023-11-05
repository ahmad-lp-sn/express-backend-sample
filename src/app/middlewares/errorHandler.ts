import { SERVER_ERR } from '../constants/errors'
import { CustomError, logger } from '../helpers'

export const errorHandler = async (err, _, res, __) => {
  logger.error(err)
  if (err instanceof CustomError) {
    return res.status(err.status).send(err)
  }
  res
    .status(SERVER_ERR.INVALID_USER_ID.status)
    .send(SERVER_ERR.INVALID_USER_ID.message)
}
