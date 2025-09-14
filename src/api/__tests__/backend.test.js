import * as backend from '../backend'
import auth from '../../lib/auth'

describe('backend API wrapper', ()=>{
  beforeEach(()=>{
    global.fetch = jest.fn()
    jest.spyOn(auth, 'getAuthHeader').mockReturnValue({ Authorization: 'Bearer t' })
  })
  afterEach(()=>{ jest.restoreAllMocks(); delete global.fetch })

  test('authGet attaches auth header and parses json', async ()=>{
    global.fetch.mockResolvedValue({ ok: true, json: async ()=>({ok: true}), status:200 })
    const res = await backend.authGet('/api/v1/orders')
    expect(global.fetch).toHaveBeenCalled()
    expect(res).toEqual({ ok: true })
  })

  test('authPost sends JSON body and returns parsed response', async ()=>{
    global.fetch.mockResolvedValue({ ok: true, json: async ()=>({ created: true }), status:201 })
    const res = await backend.authPost('/api/v1/orders', { x:1 })
    expect(global.fetch).toHaveBeenCalled()
    expect(res).toEqual({ created: true })
  })

  test('getJSON throws on non-ok', async ()=>{
    global.fetch.mockResolvedValue({ ok: false, status: 500 })
    await expect(backend.getOrders()).rejects.toThrow()
  })
})
