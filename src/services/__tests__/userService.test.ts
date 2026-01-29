import { userService } from '@/services/userService'

jest.mock('@/services/axios', () => ({
  axiosInstance: {
    get: jest.fn()
  }
}))

const { axiosInstance } = require('@/services/axios')

describe('userService.getAllUsers', () => {
  afterEach(() => jest.clearAllMocks())

  it('fetches and returns 500 users and caches result', async () => {
    const users = Array.from({ length: 500 }, (_, i) => ({ id: String(i + 1), profile: { fullName: `User ${i+1}` }, email: `u${i+1}@example.com` }))
    axiosInstance.get.mockResolvedValue({ data: users })

    const result = await userService.getAllUsers()
    expect(result.length).toBe(500)
    // second call should use cached data and not call axios.get again
    axiosInstance.get.mockClear()
    const result2 = await userService.getAllUsers()
    expect(result2.length).toBe(500)
    expect(axiosInstance.get).not.toHaveBeenCalled()
  })
})
