import auth from '../auth'

describe('auth helper', ()=>{
  beforeEach(()=> localStorage.clear())

  test('get/set/clear token', ()=>{
    expect(auth.getToken()).toBeNull()
    auth.setToken('abc123')
    expect(auth.getToken()).toBe('abc123')
    auth.clearToken()
    expect(auth.getToken()).toBeNull()
  })

  test('getAuthHeader returns bearer when token present', ()=>{
    auth.setToken('tok')
    expect(auth.getAuthHeader()).toEqual({ Authorization: 'Bearer tok' })
  })

  test('getAuthHeader returns empty object when no token', ()=>{
    auth.clearToken()
    expect(auth.getAuthHeader()).toEqual({})
  })
})
