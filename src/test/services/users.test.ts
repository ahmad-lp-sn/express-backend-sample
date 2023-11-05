import { errors } from '../../app/constants'
import { usersRepository } from '../../app/models'
import { usersService } from '../../app/services'
import { User } from '../../app/types'

jest.mock('../../app/models', () => ({
  usersRepository: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}))

describe('create function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a new user when the email is not already used', async () => {
    const userData: User = {
      email: 'newuser@example.com',
      // Other user data fields...
    } as User

    usersRepository.create['mockResolvedValue'](userData)
    const execMock = jest.fn().mockResolvedValue(null)
    usersRepository.findOne['mockImplementation']((query) => {
      if (query.email === userData.email) {
        return {
          exec: execMock,
        }
      }
      return null
    })

    try {
      const result = await usersService.create(userData)
      expect(result).toEqual(userData)
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        email: userData.email,
      })
      expect(usersRepository.create).toHaveBeenCalledWith(userData)
    } catch (error) {
      // Fail the test if an error is thrown
      fail('Should not throw an error when creating a new user.')
    }
  })

  it('should throw an error when the email is already used', async () => {
    const userData: User = {
      email: 'existing@example.com',
      // Other user data fields...
    } as User

    const execMock = jest.fn().mockResolvedValue(userData)
    usersRepository.findOne['mockImplementation']((query) => {
      if (query.email === userData.email) {
        return {
          exec: execMock,
        }
      }
      return null
    })

    try {
      await usersService.create(userData)
      fail('Should throw an error for an existing email.')
    } catch (error) {
      expect(error).toEqual(errors.USER_ERR.USED_EMAIL)
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        email: userData.email,
      })
      expect(usersRepository.create).not.toHaveBeenCalled()
    }
  })
})
