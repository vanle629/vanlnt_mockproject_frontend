const TOKEN_KEY = 'solemate_token_v1'

export function getToken(){
  try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
}

export function setToken(token){
  try { localStorage.setItem(TOKEN_KEY, token) } catch {}
}

export function clearToken(){
  try { localStorage.removeItem(TOKEN_KEY) } catch {}
}

export function getAuthHeader(){
  const t = getToken()
  return t ? { Authorization: `Bearer ${t}` } : {}
}

export default { getToken, setToken, clearToken, getAuthHeader }
