import { checkResponse, fetchOrder, fetchUpdateUser, fetchUser } from '../utils/burger-api'

describe('test checkResponse', () => {
  it('Should handle respone status: OK ', async () => {
    const mockRes = { ok: true, json: jest.fn(() => ({ key: 'value' })) }
    const promise = checkResponse(mockRes)

    expect(promise).resolves.toStrictEqual({ key: 'value' })
    expect(mockRes.json).toHaveBeenCalled()
  })

  it('Should handle respone status: NOT OK ', async () => {
    const mockRes = { ok: false, json: jest.fn(() => ({ message: 'error detailed message' })) }
    const promise = checkResponse(mockRes)

    await expect(promise).rejects.toEqual('error detailed message')
    expect(mockRes.json).toHaveBeenCalled()
  })

  it('Should handle respone status: NOT OK - BODY IS NOT JSON ', async () => {
    const mockRes = {
      ok: false,
      json: jest.fn(() => Promise.reject('Cannot parse body...')),
      text: jest.fn(() => 'bad bad thing happend'),
    }
    const promise = checkResponse(mockRes)

    await expect(promise).rejects.toEqual('bad bad thing happend')
    expect(mockRes.json).toHaveBeenCalled()
    expect(mockRes.text).toHaveBeenCalled()
  })
})

describe('Test API: token update ', () => {
  const SUCCESS_FETCH_DATA = jest.fn()

  beforeEach(() => {
    SUCCESS_FETCH_DATA.mockReturnValueOnce({ result: 'ok' }) // default return value

    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: () => ({ result: 'false', message: 'Token expired' }),
        ok: false,
      })
      .mockResolvedValueOnce({
        json: () => ({ accessToken: 'New accessToken', refreshToken: 'New refreshToken' }),
        ok: true,
      })
      .mockResolvedValueOnce({
        json: SUCCESS_FETCH_DATA,
        ok: true,
      })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('Should handle token update for fetchUser if token has been expired. ', async () => {
    const validTokens = { accessToken: 'accessToken', refreshToken: 'refreshToken' }

    const onTokenUpdates = jest.fn()
    expect(await fetchUser(validTokens, onTokenUpdates)).toEqual({ result: 'ok' })
    expect(onTokenUpdates).toHaveBeenCalledWith({ accessToken: 'New accessToken', refreshToken: 'New refreshToken' })
  })
  it('Should handle token update for fetchUpdateUser if token has been expired. ', async () => {
    const validTokens = { accessToken: 'accessToken', refreshToken: 'refreshToken' }

    const onTokenUpdates = jest.fn()
    expect(await fetchUpdateUser({}, validTokens, onTokenUpdates)).toEqual({ result: 'ok' })
    expect(onTokenUpdates).toHaveBeenCalledWith({ accessToken: 'New accessToken', refreshToken: 'New refreshToken' })
  })
  it('Should handle token update for fetchOrder if token has been expired. ', async () => {
    // fetchOrder has custom return value. Redefine mock:
    SUCCESS_FETCH_DATA.mockReset()
    SUCCESS_FETCH_DATA.mockReturnValueOnce({ result: 'ok', order: { number: 123 }, name: 'name' })
    const validTokens = { accessToken: 'accessToken', refreshToken: 'refreshToken' }

    const onTokenUpdates = jest.fn()
    expect(await fetchOrder({}, validTokens, onTokenUpdates)).toEqual({ number: 123, name: 'name' })
    expect(onTokenUpdates).toHaveBeenCalledWith({ accessToken: 'New accessToken', refreshToken: 'New refreshToken' })
  })
})
